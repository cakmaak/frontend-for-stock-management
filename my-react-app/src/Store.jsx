import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './slices/ProductSlice'
import StockReducer from './slices/StockSlice'
import UserReducer from './slices/UserSlice'






export const store = configureStore({
  reducer: {
   product:ProductReducer,
   stockhistory:StockReducer,
   user:UserReducer
   

  },
})