import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@devsamer/whitespace-common'
import bcrypt from 'bcryptjs'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({ error: "Invalid Input" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    try{
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (existingUser) {
            c.status(409);
            return c.json({ error: "User with this email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);
        
        const user = await prisma.user.create({
            data: {
              email: body.email,
              password: hashedPassword,
              name: body.name,
              username: body.username || body.name?.toLowerCase().replace(/\s+/g, ''),
              bio: body.bio,
              avatar: body.avatar,
              oauthProvider: 'email'
            }
        });

        const token = await sign(
      {
        id: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
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
    c.status(403);
    return c.json({ err: 'Error Signing up.', error });
  }

  });
  
  
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({ error: "Invalid Input" });
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
       const user = await prisma.user.findUnique({
         where: {
              email: body.email
         }
      });
     
      if(!user) {
         c.status(403);
         return c.json({ error: "User Not Found" });
      }

      // Check if user has password (email auth user)
      if (!user.password) {
        c.status(403);
        return c.json({ error: "This account was created with Google. Please sign in with Google." });
      }

      // Verify password
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (!validPassword) {
        c.status(403);
        return c.json({ error: "Invalid credentials" });
      }

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

    } catch(e) {
      console.log(e);
      c.status(403);
      return c.json({
         error: "Incorrect Credentials"
         });
     }
  });

// Get user profile
userRouter.get('/profile', async (c) => {
  const authHeader = c.req.header('authorization') || '';
  const secret = c.env.JWT_SECRET;
  
  try {
    const user = await verify(authHeader, secret);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        bio: true,
        avatar: true,
        website: true,
        location: true,
        createdAt: true,
        oauthProvider: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true
          }
        }
      }
    });

    return c.json({ user: userProfile });
  } catch(e) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

// Update user profile
userRouter.put('/profile', async (c) => {
  const authHeader = c.req.header('authorization') || '';
  const secret = c.env.JWT_SECRET;
  
  try {
    const user = await verify(authHeader, secret);
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: body.name,
        username: body.username,
        bio: body.bio,
        avatar: body.avatar,
        website: body.website,
        location: body.location
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        bio: true,
        avatar: true,
        website: true,
        location: true,
        createdAt: true,
        oauthProvider: true
      }
    });

    return c.json({ user: updatedUser });
  } catch(e) {
    c.status(403);
    return c.json({ error: "Error updating profile" });
  }
});

// Follow/Unfollow user
userRouter.post('/follow/:userId', async (c) => {
  const authHeader = c.req.header('authorization') || '';
  const secret = c.env.JWT_SECRET;
  const targetUserId = c.req.param("userId");
  
  try {
    const user = await verify(authHeader, secret);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: Number(targetUserId)
        }
      }
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: user.id,
            followingId: Number(targetUserId)
          }
        }
      });
      return c.json({ following: false });
    } else {
      // Follow
      await prisma.follows.create({
        data: {
          followerId: user.id,
          followingId: Number(targetUserId)
        }
      });
      return c.json({ following: true });
    }
  } catch(e) {
    c.status(403);
    return c.json({ error: "Error following user" });
  }
});

// Get user's posts
userRouter.get('/posts', async (c) => {
  const authHeader = c.req.header('authorization') || '';
  const secret = c.env.JWT_SECRET;
  
  try {
    const user = await verify(authHeader, secret);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
      where: { authorId: user.id },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        coverImage: true,
        readTime: true,
        viewCount: true,
        published: true,
        publishedAt: true,
        createdAt: true,
        category: {
          select: {
            name: true,
            color: true
          }
        },
        tags: {
          select: {
            name: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return c.json({ posts });
  } catch(e) {
    c.status(403);
    return c.json({ error: "Error fetching posts" });
  }
});

