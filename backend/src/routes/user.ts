import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from '@devsamer/whitespace-common'


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
        const user = await prisma.user.create({
            data: {
              email: body.email,
              password: body.password,
              name: body.name
            }
        });

        const token = await sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      c.env.JWT_SECRET
    );
    return c.json(token);
  } catch (error) {
    c.status(403);
    return c.json({ err: 'Error Signing in.', error });
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
              email: body.email,
              password: body.password
         }
      });
     
      if(!user) {
         c.status(403);
         return c.json({ error: "User Not Found" });
      }

    const token = await sign(
      { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
      c.env.JWT_SECRET
    );
    return c.json(token);

    } catch(e) {
      console.log(e);
      c.status(403);
      return c.json({
         error: "Incorrect Credentials"
         });
     }
  });

