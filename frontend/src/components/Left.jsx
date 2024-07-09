import React from 'react'
import { Link } from 'react-router-dom'
import { CiHome, CiUser, CiLogout, CiImageOn, CiSearch, CiBookmark } from "react-icons/ci";
import toast from "react-hot-toast"
import {useDispatch, useSelector} from "react-redux"
import {setCurrUser} from "../redux/slices/userSlice"

const Left = () => {
  const user = useSelector(state=>state.user.currUser)
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
      name: "Explore",
      icon: <CiSearch />,
      path: "/explore"
    },
    {
      name: "Profile",
      icon: <CiUser />,
      path: `${`/profile/${user._id}`}`
    },
    {
      name: "Bookmarks",
      icon: <CiBookmark />,
      path: `${`/bookmarks`}`
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
          dispatch(setCurrUser(null))
          toast.success(data.message)
      }

    }catch(error){
      toast.error("Network error.")
    }
  }
  return (
    <div className='h-full flex flex-col items-center justify-center lg:w-[20%] w-fit'>
      <div className='flex  items-center gap-1 mb-10 md:mb-0'>
      <img src="/logo.png" alt="logo"  width={30}/>
      <h1 className='text-3xl font-bold lg:block hidden'>LOW</h1>
      </div>
      <div className='flex flex-col gap-5 md:p-5 p-2'>
        {
          links.map((link, idx) => {
            return <Link key={idx} to={link.path} className={`${idx=== 2 && 'md:hidden'} flex gap-2 w-full  items-center justify-start bg-gray-100 md:px-4 px-2 py-2 rounded-full hover:bg-gray-300`}>

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
