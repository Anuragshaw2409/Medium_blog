import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup.tsx'
import Signin from './Pages/Signin.tsx'
import Blog from './Pages/Blog.tsx'


function App() {
  

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>





        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
