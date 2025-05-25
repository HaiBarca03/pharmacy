import HomePage from '../page/HomePage/HomePage'
import Login from '../page/Login/Login'
import NotFoundPage from '../page/NotPoundPage/NotPoundPage'
import RegisterPage from '../page/Register/RegisterPage'

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true
  },
  {
    path: '/admin',
    // page: AdminPage,
    isShowHeader: false
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
    path: '*',
    page: NotFoundPage
  }
]
