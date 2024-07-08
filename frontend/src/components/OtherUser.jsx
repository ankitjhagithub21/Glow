import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const OtherUser = ({ user }) => {
    const navigate = useNavigate()
    const currUser = useSelector(state => state.auth.user)

    const handleFollow = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/follow/${user._id}`, {
                credentials: 'include'
            })
            const data = await res.json()
            if (data.success) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    const isFollowing = currUser.following.includes(user._id)

    return (
        <div className='flex justify-between items-center p-2 rounded-full'>
            <div className='flex items-center gap-1 cursor-pointer' onClick={() => navigate(`/profile/${user._id}`)}>
                <img src={user.profileImg} alt={user.fullName} className='w-10 rounded-full' />
                <div className='flex flex-col'>
                    <span className='text-sm font-semibold hover:underline'>{user.fullName}</span>
                    <span className='text-xs hover:underline'>@{user.username}</span>
                </div>
            </div>
            {
                isFollowing ? (
                    <button className='border bg-gray-800 text-white px-4 py-2 text-sm hover:bg-gray-800 hover:text-white rounded-full' onClick={handleFollow}>Unfollow</button>
                ) : (
                    <button className='border text-gray-800 px-4 py-2 text-sm hover:bg-gray-800 hover:text-white rounded-full' onClick={handleFollow}>Follow</button>
                )
            }
        </div>
    )
}

export default OtherUser
