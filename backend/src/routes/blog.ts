import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
     Variables: {
       userId: string
    }
}>();


  bookRouter.use( async (c, next) => {
    const jwt = c.req.header('Authorization');
    if(!jwt) {
      c.status(401);
      c.json({ error: "Unauthorized" });
    }
    const token = jwt.split(' ')[1]; // Bearer cjbepihvcperihv
    const payload = await verify(token, c.env.JWT_SECRET);
    if(!payload) {
      c.status(401);
      c.json({ error: "Unauthorized" });
    }
    c.set('userId', payload.id as string);
    await next();

  })
  bookRouter.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
        const post = await prisma.post.create({
          data: {
              title: body.title,
              content: body.content,
              authorId: userId
          }
        });
    
          return c.json({
           id: post.id
          })
    })
  
  bookRouter.put('/', (c) => {
    return c.text('signin route!')
  })
  
  bookRouter.get('/:id', (c) => {
    const id = c.req.param('id');
    console.log(id);
    return c.text('Get blog route')
  })
  
  bookRouter.get('/bulk', (c) => {
    return c.text('Hello Samirr!')
  })


