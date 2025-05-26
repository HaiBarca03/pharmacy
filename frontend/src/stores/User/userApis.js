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
  updateSuccess,
  getProfile
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

    if (result.data && result.data.token && result.data.user) {
      const userData = {
        ...result.data.user,
        isAdmin: result.data.user.role === 'admin'
      }

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', result.data.token)

      dispatch(doneSuccess(userData))
    } else {
      console.warn('User or token missing in response')
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

const getUserProfile = () => async (dispatch) => {
  dispatch(getRequest())

  try {
    const config = getAuthConfig()
    const result = await axios.get(`/user/my-account`, config)

    if (result.data.message) {
      dispatch(getFailed(result.data.message))
      throw new Error(result.data.message)
    }

    dispatch(getProfile(result.data))
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Search failed. Please try again.'
    dispatch(getFailed(errorMessage))
    console.error('Search user error:', errorMessage)
    throw error
  }
}

const updateUser = (id, userData) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.put(`/user/${id}`, userData, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(updateSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

const getAllUser = () => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get('/user/get-all-user')
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(getSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

const deleteUsers = (userIds) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = {
      ...getAuthConfig(),
      data: { user_ids: userIds } // đây là phần quan trọng
    }

    const res = await axios.delete('/user', config)

    if (res.data.error) {
      dispatch(getFailed(res.data.error))
      message.error(res.data.error)
    } else {
      dispatch(deleteSuccess(userIds))
      message.success(res.data.message)
    }
  } catch (error) {
    dispatch(getError(error.message))
    message.error('Failed to delete users')
  }
}

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUser,
  getAllUser,
  deleteUsers
}
