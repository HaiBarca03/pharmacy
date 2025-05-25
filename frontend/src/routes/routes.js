import MedicationDetails from '../components/MedicationDetails/MedicationDetails'
import HomePage from '../page/HomePage/HomePage'
import Login from '../page/Login/Login'
import NotFoundPage from '../page/NotPoundPage/NotPoundPage'
import Profile from '../page/Profile/Profile'
import UpdateProfile from '../page/Profile/UpdateProfile'
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
    path: '/product/:id',
    page: MedicationDetails,
    isShowHeader: true
  },
  {
    path: '*',
    page: NotFoundPage
  }
]
