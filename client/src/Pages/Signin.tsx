import Auth from "../Components/Auth"
import Quote from "../Components/Quote"


function Signin() {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className=" ">
            <Auth type="signin"/>
        </div>
          
          <div className=" lg:block hidden">
            <Quote/>
          </div>
        </div>
      )
}

export default Signin
