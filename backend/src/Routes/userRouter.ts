import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from '@prisma/client/edge'
import {sign} from 'hono/jwt'
import {signInSchema, signUpSchema} from '@anuragshaw2409/medium-blog'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        jwt_secret: string
    }
}>();



userRouter.post('/signup', async(c) => {
    // make prisma client in every function 
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL}).$extends(withAccelerate());
  
      const body = await c.req.json();
      // creating the user
      const {success} = signUpSchema.safeParse(body);
      if(!success)
        return c.json({succes: false, message: "Wrong Input"});

      try {
        const user = await prisma.user.findUnique({
          where:{
            email: body.email
          }
        });
        if(user){
          c.status(401);
          return c.json({success: false, message: "User already exists"});
        }
    
        const newUser = await prisma.user.create({
          data:{
            email: body.email,
            password: body.password
          }
        });
    
        const token = await sign({id: newUser.id}, c.env.jwt_secret);
        
        
        return c.json({success: true, token: token});
        
      } catch (error) {
        c.status(500);
        console.log(error);
        
        return c.json({success: false, message: "Cannot create user/internal server error"});
      }
  })
  // ........................................................................................
  
  userRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL}).$extends(withAccelerate());
    
    const {email,password} = await c.req.json();

    const {success} = signInSchema.safeParse({email, password});
      if(!success)
        return c.json({succes: false, message: "Wrong Input"});
    try {
      
      
      const user = await prisma.user.findUnique({
        where:{
          email: email
        }
      });
      
      if(!user)
        {      
          c.status(404);
          return c.json({success:false, message:"User does not exist"});}
    
      if(user.password == password){
        const token = await sign({id:user.id}, c.env.jwt_secret);
        return c.json({success: true, token});
      }
      else{
        c.status(401);
        return c.json({success: false, message:"Invalid Credentials"});
      }
      
    } catch (error) {
        console.log(error);
        return c.json({success: false, message: "Server error"})
    }
    
  });

 