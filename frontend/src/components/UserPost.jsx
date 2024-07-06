import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UserPost = () => {
    const user = useSelector(state=>state.auth.user)
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        const fetchUserPost = async() =>{
            try{
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/user/${user._id}`)
                const data = await res.json()
                if(data.success){
                    setPosts(data.posts)
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchUserPost()
    },[])
  return (
    <div className='flex w-full mt-3 p-2'>
      {
        posts.length > 0 && posts.map((post)=>{
            return <div key={post._id} className='w-1/3 p-1'>
                <img src={post.image.url} alt="photo" className='rounded-lg'/>

            </div>
        }) 
      }
    </div>
  )
}

export default UserPost
