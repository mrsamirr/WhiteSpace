import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/extension'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>()

  bookRouter.post('/', (c) => {
    return c.text('signin route')
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


