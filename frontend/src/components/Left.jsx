import React from 'react'
import { Link } from 'react-router-dom'
import { CiHome, CiUser, CiLogout, CiImageOn } from "react-icons/ci";
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import {setUser} from "../redux/slices/authSlice"

const Left = () => {
  const links = [
    {
      name: "Home",
      icon: <CiHome />,
      path: "/"
    },
    {
      name: "Upload Post",
      icon: <CiImageOn />,
      path: "/upload"
    },
    {
      name: "Profile",
      icon: <CiUser />,
      path: "/profile"
    },

  ]
  const dispatch = useDispatch()
  const handleLogout = async() =>{
    try{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{
        credentials:'include'
      })
      const data = await res.json()
      if(data.success){
          dispatch(setUser(null))
          toast.success(data.message)
      }

    }catch(error){
      toast.error("Network error.")
    }
  }
  return (
    <div className='h-full flex flex-col items-center justify-center lg:w-[20%] w-fit'>
      <div className='flex  items-center gap-1'>
      <img src="./logo.png" alt=""  width={30}/>
      <h1 className='text-3xl font-bold'>LOW</h1>
      </div>
      <div className='flex flex-col gap-5 md:p-5 p-2'>
        {
          links.map((link, idx) => {
            return <Link key={idx} to={link.path} className='flex gap-2 w-full  items-center justify-start bg-gray-100 md:px-4 px-2 py-2 rounded-full hover:bg-gray-300'>

             <div className='text-2xl'>
             {link.icon}
             </div>

              <span className='lg:block hidden'>{link.name}</span>
            </Link>
          })
        }
        <button className='flex items-center w-full gap-2 bg-gray-100 hover:bg-gray-300 rounded-full lg:px-4 px-2 justify-start py-2' onClick={handleLogout}>
        <div className='text-2xl'>
             <CiLogout/>
             </div>

              <span className='lg:block hidden'>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Left
