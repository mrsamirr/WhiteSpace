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
          const post = await prisma.post.create({
          data: {
              title: body.title,
              content: body.content,
              authorId: Number(authorId)
          }
        });
    
          return c.json({
           id: post.id
          })
        } catch(e) {
          c.status(403);
          console.log(e);
          return c.text("Server cant Reach")
        }
    })
  
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
          const post = await prisma.post.update({
              where: {
                id: body.id
              },
              data: {
                  title: body.title,
                  content: body.content,
              }
          })
      
          return c.json({
            id: post.id
          })
  })

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
      
      const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
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

  blogRouter.get('/:id', async (c) => {
    const id =  c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
      const post = await prisma.post.findFirst({
          where: {
            id: Number(id)
          },
          select: {
            id: true,
            title: true,
            content: true,
            author: {
              select: {
                name: true
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
  
 
