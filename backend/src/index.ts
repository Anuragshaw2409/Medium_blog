import { Hono } from 'hono'
import {userRouter} from './Routes/userRouter'
import {blogRouter} from './Routes/blogRouter'
import { cors } from 'hono/cors'

// specify all the types of env variables

const app = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      jwt_secret: string
    }
}>()

app.use('/*',cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})



export default app
