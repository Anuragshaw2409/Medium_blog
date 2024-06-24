
import BlogCard from "../Components/BlogCard"
import AppBar from "../Components/AppBar"
import { useNavigate} from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";

interface Blog{
  title: string,
  content: string,
  publishedDate: string
  author: {
      name: string,
      authorImage: string
  }
}


function Blog() {
  const navigate = useNavigate();
  const [Blogs, setBlogs] = useState<Blog[]>();

  function fetchBlogs(){
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/signin');
    }
    else{
      axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers:{
          Authorization: token
        }
      })
      .then((res)=>{
        // console.log(res.data);
        setBlogs(res.data);
        
        
        
      })
      .catch((err)=>{
        return(
          <div>
            Something went wrong ${err}
          </div>
        )
      })
    }
  }

  useEffect(()=>{fetchBlogs()},[]);


  return (
    <div>
      <AppBar/>
      <div className="w-[80%] mx-auto">


      {
        Blogs && Blogs.map((Blog, index)=>
          <BlogCard
        key={index}
        authorName= {Blog.author.name? Blog.author.name: "Anonymous"}
        title= {Blog.title}
        content={Blog.content}
        authorImage={Blog.author.authorImage}
        publishedDate = {Blog.publishedDate}
        />
        )
        }
      </div>
    </div>
  )
}

export default Blog
