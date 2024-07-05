import React from 'react'
import { Link } from 'react-router-dom'
import { CiHome, CiUser, CiLogout, CiImageOn } from "react-icons/ci";

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
      path: "/profile"
    },
    {
      name: "Profile",
      icon: <CiUser />,
      path: "/profile"
    },

  ]
  return (
    <div className='h-full flex items-center justify-center lg:w-[20%] w-fit'>
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
      </div>
    </div>
  )
}

export default Left
