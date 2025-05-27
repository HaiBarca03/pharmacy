import MedicationDetails from '../components/MedicationDetails/MedicationDetails'
import AdminCategory from '../page/Admin/AdminCategory/AdminCategory'
import AdminPageHome from '../page/Admin/AdminPageHome/AdminPageHome'
import ArticleHomePage from '../page/Article/ArticleHomePage'
import Cart from '../page/Cart/Cart'
import ProductCategory from '../page/Category/ProductCategory'
import HealthConsultationHomePage from '../page/HealthConsultation/HealthConsultationHomePage'
import HomePage from '../page/HomePage/HomePage'
import Login from '../page/Login/Login'
import NotFoundPage from '../page/NotPoundPage/NotPoundPage'
import OrderDetailPage from '../page/Order/OrderDetailPage'
import OrderPage from '../page/Order/OrderPage'
import PaymentPage from '../page/Payment/PaymentPage'
import ProductAll from '../page/Product/ProductAllPage'
import Profile from '../page/Profile/Profile'
import UpdateProfile from '../page/Profile/UpdateProfile'
import RegisterPage from '../page/Register/RegisterPage'
import ProductSeach from '../page/Search/ProductSeach'
import Unauthorized from '../page/Unauthorized/Unauthorized'

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true
  },
  {
    path: '/admin',
    page: AdminPageHome,
    isShowHeader: false,
    isPrivate: true
  },
  {
    path: '/login',
    page: Login,
    isShowHeader: false
  },
  {
    path: '/register',
    page: RegisterPage,
    isShowHeader: false
  },
  {
    path: '/profile',
    page: Profile,
    isShowHeader: true
  },
  {
    path: '/profile/edit',
    page: UpdateProfile,
    isShowHeader: true
  },
  {
    path: '/all-product',
    page: ProductAll,
    isShowHeader: true
  },
  {
    path: '/product/category/:id',
    page: ProductCategory,
    isShowHeader: true
  },
  {
    path: '/search/:keyword',
    page: ProductSeach,
    isShowHeader: true
  },
  {
    path: '/product/:id',
    page: MedicationDetails,
    isShowHeader: true
  },
  {
    path: '/article',
    page: ArticleHomePage,
    isShowHeader: true
  },
  {
    path: '/health-consultation',
    page: HealthConsultationHomePage,
    isShowHeader: true
  },
  {
    path: '/cart',
    page: Cart,
    isShowHeader: true
  },
  {
    path: '/order',
    page: OrderPage,
    isShowHeader: true
  },
  {
    path: '/order/:id',
    page: OrderDetailPage,
    isShowHeader: true
  },
  {
    path: '/payment',
    page: PaymentPage,
    isShowHeader: true
  },
  {
    path: '/admin/category',
    page: AdminCategory
    // isShowHeader: true
  },
  {
    path: '/unauthorized',
    page: Unauthorized
  },
  {
    path: '*',
    page: NotFoundPage
  }
]
