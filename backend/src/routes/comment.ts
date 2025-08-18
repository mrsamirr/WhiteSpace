import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

export const commentRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

// Middleware for protected routes
commentRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('authorization') || '';
    const secret = c.env.JWT_SECRET;
    
    try {
        const user = await verify(authHeader, secret);
        if (user) {
            c.set('userId', user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                error: "Unauthorized"
            });
        }
    } catch (e) {
        console.log(e);
        c.status(403);
        return c.json({
            message: "You are not logged in", e
        });
    }
});

// Create a comment
commentRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const comment = await prisma.comment.create({
            data: {
                content: body.content,
                authorId: Number(authorId),
                postId: Number(body.postId),
                parentId: body.parentId ? Number(body.parentId) : null
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        });

        return c.json({
            comment
        });
    } catch(e) {
        c.status(403);
        console.log(e);
        return c.text("Server cant Reach")
    }
});

// Get comments for a post
commentRouter.get('/post/:postId', async (c) => {
    const postId = c.req.param("postId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: Number(postId),
                parentId: null // Only top-level comments
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true
                    }
                },
                replies: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                avatar: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return c.json({
            comments
        });
    } catch(e) {
        c.status(411);
        console.log(e);
        return c.json({
            error: "Error While fetching comments"
        });
    }
});

// Update a comment
commentRouter.put('/:id', async (c) => {
    const commentId = c.req.param("id");
    const authorId = c.get("userId");
    const body = await c.req.json();
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const comment = await prisma.comment.update({
            where: {
                id: Number(commentId),
                authorId: Number(authorId) // Ensure user owns the comment
            },
            data: {
                content: body.content
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        });

        return c.json({
            comment
        });
    } catch(e) {
        c.status(403);
        console.log(e);
        return c.text("Server cant Reach")
    }
});

// Delete a comment
commentRouter.delete('/:id', async (c) => {
    const commentId = c.req.param("id");
    const authorId = c.get("userId");
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        await prisma.comment.delete({
            where: {
                id: Number(commentId),
                authorId: Number(authorId) // Ensure user owns the comment
            }
        });

        return c.json({
            message: "Comment deleted successfully"
        });
    } catch(e) {
        c.status(403);
        console.log(e);
        return c.text("Server cant Reach")
    }
});