import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup', (c) => {
  return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
  return c.text('signin route')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Samirr!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Samirr!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Samirr!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Samirr!')
})

export default app
