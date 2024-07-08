import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import postSlice from './slices/postSlice'
import userSlice from './slices/userSlice'


export const store = configureStore({
  reducer: {
    auth:authSlice,
    post:postSlice,
    user:userSlice
  },
})