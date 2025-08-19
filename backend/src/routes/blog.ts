import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@devsamer/whitespace-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
     Variables: {
       userId: string;
    }
}>();

// Middleware for protected routes
blogRouter.use('/*', async (c, next) => {
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

// Create a new blog post
blogRouter.post('/', async (c) => {
    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ error: "Invalid Blog Inputs" });
    }
    
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        // Calculate read time (rough estimate: 200 words per minute)
        const wordCount = body.content.split(' ').length;
        const readTime = Math.ceil(wordCount / 200);

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                excerpt: body.excerpt || body.content.substring(0, 150) + '...',
                coverImage: body.coverImage,
                published: body.published || false,
                publishedAt: body.published ? new Date() : null,
                readTime: readTime,
                authorId: Number(authorId),
                categoryId: body.categoryId ? Number(body.categoryId) : null,
                tags: body.tags ? {
                    connectOrCreate: body.tags.map((tag: string) => ({
                        where: { name: tag },
                        create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }
                    }))
                } : undefined
            },
            include: {
                author: {
                    select: {
                        name: true,
                        username: true,
                        avatar: true
                    }
                },
                category: true,
                tags: true
            }
        });
        // console.log(post);
    
        return c.json({
            id: post.id,
            post
        })
    } catch(e) {
        c.status(403);
        console.log(e);
        return c.text("Server cant Reach")
    }
})

// Update a blog post
blogRouter.put('/', async (c) => {
    const authorId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ error: "Invalid Blog Input" });
    }

    try {
        // Calculate read time
        const wordCount = body.content.split(' ').length;
        const readTime = Math.ceil(wordCount / 200);

        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
                excerpt: body.excerpt || body.content.substring(0, 150) + '...',
                coverImage: body.coverImage,
                readTime: readTime,
                categoryId: body.categoryId ? Number(body.categoryId) : null,
                tags: body.tags ? {
                    set: [],
                    connectOrCreate: body.tags.map((tag: string) => ({
                        where: { name: tag },
                        create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }
                    }))
                } : undefined
            },
            include: {
                author: {
                    select: {
                        name: true,
                        username: true,
                        avatar: true
                    }
                },
                category: true,
                tags: true
            }
        })
    
        return c.json({
            id: post.id,
            post
        })
    } catch(e) {
        c.status(403);
        console.log(e);
        return c.text("Server cant Reach")
    }
})

// Get all published blog posts
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            select: {
                id: true,
                title: true,
                content: true,
                excerpt: true,
                coverImage: true,
                readTime: true,
                viewCount: true,
                publishedAt: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        username: true,
                        avatar: true
                    }
                },
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
                publishedAt: 'desc'
            }
        });
        
        return c.json({
            posts
        })
    } catch(e) {
        c.status(411);
        console.log(e);
        return c.json({
            error: "Error While fetching the Request"
        });
    }
})

// Get a single blog post
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        // Increment view count
        await prisma.post.update({
            where: { id: Number(id) },
            data: { viewCount: { increment: 1 } }
        });

        const post = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                excerpt: true,
                coverImage: true,
                readTime: true,
                viewCount: true,
                publishedAt: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true,
                        bio: true,
                        website: true
                    }
                },
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
            }
        });

        return c.json({
            post
        })
    } catch(e) {
        c.status(411);
        return c.json({
            error: "Error While fetching the Request"
        });
    }
})

// Like/Unlike a post
blogRouter.post('/:id/like', async (c) => {
    const postId = c.req.param("id");
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId: Number(userId),
                    postId: Number(postId)
                }
            }
        });

        if (existingLike) {
            // Unlike
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId: Number(userId),
                        postId: Number(postId)
                    }
                }
            });
            return c.json({ liked: false });
        } else {
            // Like
            await prisma.like.create({
                data: {
                    userId: Number(userId),
                    postId: Number(postId)
                }
            });
            return c.json({ liked: true });
        }
    } catch(e) {
        c.status(403);
        console.log(e);
        return c.text("Server cant Reach")
    }
})

// Get categories
blogRouter.get('/categories/all', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        posts: true
                    }
                }
            }
        });
        
        return c.json({
            categories
        })
    } catch(e) {
        c.status(411);
        console.log(e);
        return c.json({
            error: "Error While fetching categories"
        });
    }
})

// Get posts by category
blogRouter.get('/category/:slug', async (c) => {
    const slug = c.req.param("slug");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
                category: {
                    slug: slug
                }
            },
            select: {
                id: true,
                title: true,
                content: true,
                excerpt: true,
                coverImage: true,
                readTime: true,
                viewCount: true,
                publishedAt: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        username: true,
                        avatar: true
                    }
                },
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
                publishedAt: 'desc'
            }
        });
        
        return c.json({
            posts
        })
    } catch(e) {
        c.status(411);
        console.log(e);
        return c.json({
            error: "Error While fetching posts"
        });
    }
})
  
 