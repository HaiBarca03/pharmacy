import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './User/userSlice'
import { productReducer } from './Product/productSlice'
import { CategoryReducer } from './Category/CategorySlice'
import { HealthConsultationReducer } from './HealthConsultation/HealthConsultationSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: CategoryReducer,
    healthConsultation: HealthConsultationReducer
  }
})

export default store
