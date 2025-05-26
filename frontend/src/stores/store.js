import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './User/userSlice'
import { productReducer } from './Product/productSlice'
import { CategoryReducer } from './Category/CategorySlice'
import { HealthConsultationReducer } from './HealthConsultation/HealthConsultationSlice'
import { articleReducer } from './Article/ArticleSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: CategoryReducer,
    healthConsultation: HealthConsultationReducer,
    article: articleReducer
  }
})

export default store
