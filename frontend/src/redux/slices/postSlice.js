import { createSlice } from '@reduxjs/toolkit'


export const postSlice = createSlice({
  name: 'post',
  initialState:{
    isOpen:false,
    currPost:null,
  },
  reducers: {
    setIsOpen:(state,action)=>{
        state.isOpen = action.payload
    },
    setCurrPost: (state, action) => {
      state.currPost = action.payload
    },
  },
})


export const {setIsOpen,setCurrPost } = postSlice.actions

export default postSlice.reducer