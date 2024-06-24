import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {BACKEND_URL} from '../config.ts'

function Auth({type}:{type:"signin" | "signup"}) {
    const navigate = useNavigate();

    const [signInInput, setSignInInput] = useState({
        name:"",
        email:"",
        password:""
    })

    const [errorMessage, setErrorMessage] = useState("");
    async function handleSubmit(){

            await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, signInInput)
            .then((response)=>{
                if(response.data.success){
                    localStorage.setItem('token', response.data.token);
                    navigate('/blog/bulk');
        
                }
            })
            .catch((err)=>{
                if(err.response.request.status ==401){
                    setErrorMessage(err.response.data.message)
                }
                
            })


    }




  return (

    <div className='h-screen w-full flex justify-center items-center flex-col'>

        <div className="card w-[60%] flex flex-col bg-slate-100 rounded-2xl shadow-lg justify-center items-center p-2">
            <h1 className="font-bold text-4xl w-full text-center mb-6 mt-2">{type==="signup"? "Create an account": "Welcome back!"}</h1>
            <p>{type==='signup'? "Already have an account?": "Don't have an account?"} <Link className="underline text-slate-900" to={type==='signup'?'/signin':'/signup'}>{type==='signup'?"Login":"Sign up"}</Link></p>

            {type==='signup'?<LebelledInputBox label="Username" placeholder="JackSparrow420" onChange={(e)=>{setSignInInput(c=>({...c, name:e.target.value}))}} />:null}
           
           
            <LebelledInputBox label="Email" placeholder="jack.sparrow@gmail.com" onChange={(e)=>{setSignInInput(c=>({...c, email:e.target.value}))}} />
            
            
            <LebelledInputBox label="Password" type="password" placeholder="" onChange={(e)=>{setSignInInput(c=>({...c, password:e.target.value}))}} />

            <SubmiteButton label={type==='signup'? "Sign up":"Sign in"} onClickHandler={()=>{handleSubmit()}}/>

            <h1 className="text-sm text-red-500 text-center">{errorMessage.length!=0 && errorMessage}</h1>

        </div>



    </div>
  )
}

export default Auth



interface LabelledInput{
    label: string, 
    placeholder: string, 
    onChange: (e:ChangeEvent<HTMLInputElement>)=>void,
    type?: string
}

function LebelledInputBox ({label, placeholder, onChange, type}:LabelledInput){
    
    return (<div className="w-[90%]">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} onChange={onChange} required />
    </div>)
}


function SubmiteButton({label, onClickHandler}:{label:string, onClickHandler:()=>void}){

    return(
        
            <button className="text-xl w-[90%] bg-gray-900 text-white my-3 py-2 rounded-lg" onClick={onClickHandler}>
                {label}
            </button>
        
    )
}