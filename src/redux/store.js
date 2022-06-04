import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice.js'
import tourReducer from './features/tourSlice.js'

export const store = configureStore({
  reducer: {
      auth:authReducer,
      tours:tourReducer,
  },
})