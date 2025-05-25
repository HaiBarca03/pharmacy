import { message } from 'antd'
import axios from '../Axioscustom'
import {
  createSuccess,
  deleteSuccess,
  doneSuccess,
  getError,
  getFailed,
  getRequest,
  getSuccess,
  postDone,
  updateSuccess
} from './userSlice'
import { getAuthConfig } from '../authConfig'

const loginUser = (data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const result = await axios.post('/user/login', data, config)
    if (result.data.message && result.data.message !== 'Login successful') {
      dispatch(getFailed(result.data.message))
      throw new Error(result.data.message)
    }

    dispatch(postDone())

    if (result.data.token) {
      localStorage.setItem('user', JSON.stringify(result.data.user))
      localStorage.setItem('token', result.data.token)
    } else {
      console.warn('Token not found in API response')
    }

    if (result.data) {
      localStorage.setItem('user', JSON.stringify(result.data))
      localStorage.setItem('token', result.data.token)
      dispatch(doneSuccess(result.data))
    } else {
      console.warn('User not found in API response')
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'An unexpected error occurred. Please try again.'
    dispatch(getError(errorMessage))
    console.error('Login error:', errorMessage)
    throw error
  }
}

const registerUser = (data) => async (dispatch) => {
  dispatch(getRequest())

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const result = await axios.post('/user/register', data, config)
    if (
      result.data.message &&
      result.data.message !== 'Verification code sent to email'
    ) {
      dispatch(getFailed(result.data.message))
      message.error(result.data.message)
      throw new Error(result.data.message)
    }

    dispatch(postDone())
    dispatch(getSuccess(result.data)) // hoặc dispatch action phù hợp với bạn

    message.success(
      result.data.message || 'Verification code sent to your email'
    )

    return result.data // để component xử lý tiếp
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Register failed. Please try again.'
    dispatch(getFailed(errorMessage))
    message.error(errorMessage)
    console.error('Register error:', errorMessage)
    throw error
  }
}

export { loginUser, registerUser }
