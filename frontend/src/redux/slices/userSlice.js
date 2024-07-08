import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState:{
     otherUsers:[]
  },
  reducers: {
   
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload
    }
   
  },
})


export const {setOtherUsers } = userSlice.actions

export default userSlice.reducer