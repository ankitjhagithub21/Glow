import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState:{
  
    page:"Login"
  },
  reducers: {
  
   
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
})


export const {setPage } = authSlice.actions

export default authSlice.reducer