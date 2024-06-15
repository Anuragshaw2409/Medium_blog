import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.post('/api/v1/signup', (c) => {
  return c.text('signup!')
})


app.post('/api/v1/signin', (c) => {
  return c.text('signin!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('blog post!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('blogedit!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('get blogs!')
})

export default app
