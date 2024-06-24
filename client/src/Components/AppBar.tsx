import { AuthorAvatar } from './BlogCard'
import MediumImage from "../assets/Icon/medium-icon.svg"

function AppBar() {
  return (
    <div className='border-b-2 shadow-sm flex justify-between h-12 items-center px-2'>
        <div className="h-10 flex items-center gap-2">
            <img className='h-full' src={MediumImage} alt="Medium Logo" /> 
            <h2 className='font-semibold text-xl'>Medium</h2>
        </div>

        <div className="">
            <AuthorAvatar authorName='Anurag Shaw' authorImage='https://lh3.googleusercontent.com/ogw/AF2bZyg0g-AxSTlBam6KaBd_VUx1oNOT3TBYBIeFBcznT8PR3ZTE=s32-c-mo'/>
        </div>
      
    </div>
  )
}

export default AppBar
