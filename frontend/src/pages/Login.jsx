import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
const Login = () => {
  const {page} = useSelector((state)=>state.auth)
  
  const initialData = {
    fullName:"",
    username:"",
    email:"",
    password:""
  }
  const dispatch = useDispatch()
  const [showPassword,setShowPassword] = useState(false)
  const [userData,setUserData] = useState(initialData)
  const [loading,setLoading] = useState(false)
  const handleChange = (e) =>{
    const {name,value} = e.target;
    e.preventDefault()
      setUserData({
        ...userData,
        [name]:value
      })
    }
    const handleSubmit = async(e) =>{
      e.preventDefault()
     
      let url  = `${import.meta.env.VITE_SERVER_URL}/api/auth/${page==="Login" ? 'login':'register'}`
      
      try{
        setLoading(true)
        const res = await fetch(url,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:'include',
          body:JSON.stringify(userData)
        })
        const data = await res.json()
        if(data.success){
            setUserData(initialData)
            toast.success(data.message)
            dispatch(setUser(data.user))
        }else{
         
          toast.error(data.message)
        }
      

      }catch(error){
        toast.error("Network error.")
        
      }finally{
        setLoading(false)
      }
      
    }
    const handleClick = () =>{
      if(loading){
        return toast.error("Please wait.")
      }
      setUserData(initialData)
      setLoading(false)
      if(page==="Login"){
        dispatch(setPage("Register"))
      }else{
        dispatch(setPage("Login"))
      }
    }
    
  return (
    <div className='h-screen w-full flex items-center justify-center  p-5 bg-[#4a69bd]'>
      <div className='lg:w-1/3 md:w-1/2 w-full p-5 rounded-xl my-shadow bg-white'>
      <h2 className='text-center mb-5 text-3xl font-semibold text-[#4a69bd] '>
        {
          page === "Register" ? 'Create Account' : 'Login Now'
        }
      </h2>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
           {
             page == "Register" && <>
              <input type="text" placeholder='Enter your name' value={userData.fullName} onChange={handleChange} name='fullName' className='rounded-full bg-gray-100 px-4 py-2 text-lg' required/>
              <input type="text" placeholder='Enter your username'  name='username'value={userData.username} onChange={handleChange} className='rounded-full bg-gray-100 px-4 py-2 text-lg' required/>
             </>
           }
            <input type="email" placeholder='Enter your email' name='email' value={userData.email} onChange={handleChange} className='rounded-full bg-gray-100 px-4 py-2 text-lg' required/>
           <div className='relative'>
           <input type={`${showPassword ? 'text':'password'}`} placeholder='Enter your password' name='password' value={userData.password} onChange={handleChange} className='rounded-full bg-gray-100 w-full px-4 py-2 text-lg' required/>
           <button className='absolute top-4 text-gray-700 right-3' type='button' onClick={()=>setShowPassword(!showPassword)}>
            {
            showPassword ? <FaRegEye/> :<FaRegEyeSlash/>
           }</button>
           </div>
            <button type='submit' className='bg-[#4a69bd] hover:bg-blue-700 text-white  rounded-full px-4 py-2 relative'>
            {page}
              {loading && <div className='small-loader absolute right-2 bottom-2'></div> }</button>


        </form>
       <div className='flex mt-4 items-center  justify-center gap-1'>
       <p>Already have an account ? </p>
       <button className='text-[#4a69bd] hover:underline ' onClick={handleClick}>
        
        {page==="Register" ? 'Login':'Register'}</button>

       </div>
      </div>
    </div>
  )
}

export default Login
