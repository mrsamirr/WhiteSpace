import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog'
import { commentRouter } from './routes/comment'
import { cors } from 'hono/cors'
import { oauthRouter } from './routes/oauth';

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    GOOGLE_CLIENT_ID: string,
  }
}>()

app.use('/*', cors())

// Public routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
app.route('/api/v1/comment', commentRouter);
app.route('/api/v1/oauth', oauthRouter);

export default app