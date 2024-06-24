import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { postBlogSchema, updateBlogSchema } from "@anuragshaw2409/medium-blog";


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        jwt_secret: string
        
    },
    Variables:{
        userId: string
    }
}>();

  



blogRouter.use('/*', async(c, next)=>{
  
    const header =  c.req.header("authorization")  || "";
   
      
    if(header == "")
      return c.json({success: false, message: "No token found"});
  
    const user = await verify(header, c.env.jwt_secret) ;
    if(user)
      { 
        c.set("jwtPayload", user.id)        
        await next();}
    else 
      c.status(403)
      return c.json({message: "Unauthorized"});
  })


blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const userId =  c.get('jwtPayload');
        const body = await c.req.json();
        const {success} = postBlogSchema.safeParse(body);
        if(!success)
            return c.json({success:false, message:"Invalid input"});
        const blog = await prisma.post.create({
             data:{
                 title: body.title,
                 content: body.content,
                 authorid: userId,
                 publishedDate: new Date().getTime().toString()
             }
         });
     
         return c.json({message: "Blog created", id: blog.id});
        
    } catch (error) {
        c.status(500);
        return c.json({success: false, message: "Blog cannot be created", error});
    }
  })



  
blogRouter.put('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const {success} = updateBlogSchema.safeParse(body);
    if(!success)
        return c.json({success, message: "Enter valid inputs"});
    const id = c.req.param('id');
    if(id=="")
        return c.json({message:"Enter valid blog id"});
    try {
        const updatedPost = await prisma.post.update({
            where:{
                id: id,
                authorid: c.get('jwtPayload')
            },
            data:{
                title: body.title,
                content: body.content
            }
        });
        return c.json({success: true, id: updatedPost.id})
        
    } catch (error) {
        return c.json({success:false, error});
    }


    
  })


  
  blogRouter.get('/bulk', async(c) => {
      const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL
      }).$extends(withAccelerate());
  
      try {
          const blogs = await prisma.post.findMany({
            where:{
                published: false
            },
            select:{
              title:true,
              content: true,
              publishedDate: true,
              author:{
                select:{
                    name:true,
                    authorImage: true
                }
              }

            }
          });
          return c.json(blogs);
          
      } catch (error) {
          return c.json({message: "Error fetching blogs", error})
          
      }
  
    })



blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const postId = c.req.param('id');
    if(!postId){
        return c.json({message: "Enter a post Id"});
    }
    try {
        const post = await prisma.post.findUnique({
            where:{
                id:postId
            }
        });
        if(!post)
            return c.json({message: "No blog found with the id"});
        return c.json(post)
    } catch (error) {
        return c.json({message:"Error", error});
    }



    
  })
  