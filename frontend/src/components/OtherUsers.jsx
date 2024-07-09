import React, { useState, useEffect } from 'react'
import OtherUser from './OtherUser'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers } from '../redux/slices/userSlice'
import Search from './Search'

const OtherUsers = () => {
  const dispatch = useDispatch()
  const otherUsers = useSelector(state => state.user.otherUsers)
  const [filteredUsers, setFilteredUsers] = useState(otherUsers)
  const [query, setQuery] = useState('')

  const fetchOtherUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/others`, {
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        dispatch(setOtherUsers(data.otherUsers))
        setFilteredUsers(data.otherUsers)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOtherUsers()
  }, [])

  useEffect(() => {
    const filterUsers = () => {
      const lowercasedQuery = query.toLowerCase()
      const filtered = otherUsers.filter(user =>
        user.username.toLowerCase().includes(lowercasedQuery) ||
        user.fullName.toLowerCase().includes(lowercasedQuery)
      )
      setFilteredUsers(filtered)
    }
    filterUsers()
  }, [query, otherUsers])
  
  return (
    <div className='flex flex-col'>
      <Search query={query} setQuery={setQuery} />
      
       {
         filteredUsers.length > 0 ? <>
         {
           filteredUsers.map((user) => {
             return <OtherUser key={user._id} user={user} />
           })
         }
         
         </> : <p>User not found.</p>
       }
    </div>
  )
}

export default OtherUsers
