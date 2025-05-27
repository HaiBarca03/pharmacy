import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './User/userSlice'
import { productReducer } from './Product/productSlice'
import { CategoryReducer } from './Category/CategorySlice'
import { HealthConsultationReducer } from './HealthConsultation/HealthConsultationSlice'
import { articleReducer } from './Article/ArticleSlice'
import { CartReducer } from './Cart/CartSlice'
import { orderReducer } from './Order/orderSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: CategoryReducer,
    healthConsultation: HealthConsultationReducer,
    article: articleReducer,
    cart: CartReducer,
    order: orderReducer
  }
})

export default store
