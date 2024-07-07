import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPost, setIsOpen } from '../redux/slices/postSlice'

const UserPost = () => {
    const user = useSelector(state=>state.auth.user)
    const [posts,setPosts] = useState([])
    const dispatch = useDispatch()
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
    <div className='flex flex-wrap w-full mt-3 p-2'>
      {
        posts.length > 0 && posts.map((post)=>{
            return <div key={post._id} className='md:w-1/3 w-1/2 p-1 cursor-pointer' onClick={()=>{
              dispatch(setCurrPost(post))
              dispatch(setIsOpen(true))
            }}>
                <img src={post.image.url} alt="photo" className='rounded-lg h-32  w-full object-cover object-center '/>

            </div>
        }) 
      }
    </div>
  )
}

export default UserPost
