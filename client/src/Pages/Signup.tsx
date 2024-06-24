import Quote from "../Components/Quote"
import Auth from "../Components/Auth"

function Signup() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
    <div className=" ">
        <Auth type="signup"/>
    </div>
      
      <div className=" lg:block hidden">
        <Quote/>
      </div>
    </div>
  )
}

export default Signup
