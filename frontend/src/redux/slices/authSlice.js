import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    user:null,
    page:"Login"
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
      },
   
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
})


export const {setUser,setPage } = authSlice.actions

export default authSlice.reducer