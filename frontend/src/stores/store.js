import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './User/userSlice'
import { productReducer } from './Product/productSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer
  }
})

export default store
