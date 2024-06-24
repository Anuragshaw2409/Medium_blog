interface BlogCardProps{
    authorName?: string, 
    title: string,
    content: string,
    publishedDate: string,
    authorImage?: string,
    
}

function BlogCard({authorName, title, content, publishedDate, authorImage}:BlogCardProps) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const DateObject = new Date(Number(publishedDate));
    const completeDate = `${DateObject.getDate()} ${months[DateObject.getMonth()] } ${DateObject.getFullYear()}`


    
  return (
    <div className="flex flex-col border-b-2 p-2 rounded-lg shadow-md m-2 mt-4">
        <div className="Name flex flex-row gap-x-2 items-center mb-2">
            <AuthorAvatar authorName={authorName? authorName:'User' } authorImage={authorImage}/>
            <h3 className="font-semibold text-slate-700">{authorName}</h3> 
            <Circle/>
            <p className="text-sm font-thin">{completeDate}</p>
        </div>

        <div className=" font-bold text-xl">
            {title}
        </div>
        <div className="text-base mb-4">
            {content.length>200? content.slice(0, 200)+"...": content}
        </div>
        <div className="text-sm">
            <h1>{Math.ceil(content.length/1500)} min read</h1>
        </div>
      
    </div>
  )
}

export default BlogCard

interface AuthorAvatarProps{

    authorName: string,
    authorImage?: string
}


export function AuthorAvatar({authorName, authorImage}:AuthorAvatarProps){

    return(
        <>
           { !authorImage? <div className="h-6 w-6 bg-slate-300 flex justify-center items-center rounded-full ">
                <h1 className="font-bold">{authorName.charAt(0)}</h1>
            </div>:
            <img className="rounded-full h-6 w-6" src={authorImage} alt="Author Image" />
            }
        </>
    )
}

function Circle(){
    return(
    <div className="h-1 w-1 bg-slate-600 rounded-full">
    
    </div>)
}