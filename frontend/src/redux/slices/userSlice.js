import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    otherUsers: [],
    currUser: null
  },
  reducers: {

    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload
    },
    setCurrUser: (state, action) => {
      state.currUser = action.payload
    },
    followUnfollowUser: (state, action) => {
      const userId = action.payload
      const isFollowing = state.currUser.following.includes(userId)

      if (isFollowing) {

        state.currUser.following = state.currUser.following.filter(id => id !== userId)

      } else {
        state.currUser.following.push(userId)
      }
    },
   

  },
})


export const { setOtherUsers, setCurrUser, followUnfollowUser } = userSlice.actions

export default userSlice.reducer