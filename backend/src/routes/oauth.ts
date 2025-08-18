import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { jwtVerify } from 'jose'

export const oauthRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        GOOGLE_CLIENT_ID: string;
    }
}>()

// Google OAuth callback
oauthRouter.post('/google', async (c) => {
    const body = await c.req.json();
    const { idToken } = body;

    if (!idToken) {
        c.status(400);
        return c.json({ error: "ID token is required" });
    }

    try {
        // Verify Google ID token
        const googleUserInfo = await verifyGoogleToken(idToken, c.env.GOOGLE_CLIENT_ID);
        
        if (!googleUserInfo) {
            c.status(401);
            return c.json({ error: "Invalid Google token" });
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        // Check if user exists
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: googleUserInfo.email },
                    { googleId: googleUserInfo.sub }
                ]
            }
        });

        if (!user) {
            // Create new user
            user = await prisma.user.create({
                data: {
                    email: googleUserInfo.email,
                    name: googleUserInfo.name,
                    avatar: googleUserInfo.picture,
                    googleId: googleUserInfo.sub,
                    oauthProvider: 'google',
                    username: generateUsername(googleUserInfo.name || googleUserInfo.email)
                }
            });
        } else {
            // Update existing user with Google info if needed
            if (!user.googleId) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        googleId: googleUserInfo.sub,
                        oauthProvider: 'google',
                        avatar: user.avatar || googleUserInfo.picture,
                        name: user.name || googleUserInfo.name
                    }
                });
            }
        }

        // Generate JWT token
        const token = await sign(
            { 
                id: user.id,
                email: user.email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days
            },
            c.env.JWT_SECRET
        );

        return c.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Google OAuth error:', error);
        c.status(500);
        return c.json({ error: "Authentication failed" });
    }
});

// Verify Google ID token
async function verifyGoogleToken(idToken: string, clientId: string) {
    try {
        // Fetch Google's public keys
        const response = await fetch('https://www.googleapis.com/oauth2/v3/certs');
        const { keys } = await response.json();

        // Verify the token
        const { payload } = await jwtVerify(idToken, async (header) => {
            const key = keys.find((k: any) => k.kid === header.kid);
            if (!key) {
                throw new Error('No matching key found');
            }
            return key;
        }, {
            issuer: 'https://accounts.google.com',
            audience: clientId
        });

        return {
            sub: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

// Generate unique username
function generateUsername(name: string): string {
    const baseUsername = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);
    
    const timestamp = Date.now().toString().slice(-4);
    return `${baseUsername}${timestamp}`;
}

// Get OAuth configuration
oauthRouter.get('/config', async (c) => {
    return c.json({
        googleClientId: c.env.GOOGLE_CLIENT_ID,
        googleAuthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        googleTokenUrl: 'https://oauth2.googleapis.com/token'
    });
});