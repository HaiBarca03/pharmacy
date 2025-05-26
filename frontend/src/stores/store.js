import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './User/userSlice'
import { productReducer } from './Product/productSlice'
import { CategoryReducer } from './Category/CategorySlice'
import { HealthConsultationReducer } from './HealthConsultation/HealthConsultationSlice'
import { articleReducer } from './Article/ArticleSlice'
import { CartReducer } from './Cart/CartSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: CategoryReducer,
    healthConsultation: HealthConsultationReducer,
    article: articleReducer,
    cart: CartReducer
  }
})

export default store
