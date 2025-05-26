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
} from './CartSlice'
import { getAuthConfig } from '../authConfig'

export const getMyCart = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get(`/cart/${id}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(getSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const createCart = (data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.post('/cart', data, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(createSuccess(res.data))
      message.success('Thêm vào giỏ hàng thành công')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const updateCart = (id, data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.put(`/cart/${id}`, data, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(updateSuccess(res.data))
      message.success('Cập nhật giỏ hàng thành công')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const deleteCart = (id, data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.delete(`/cart/${id}`, { ...config, data })
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(deleteSuccess(res.data))
      message.success('Xoá sản phẩm khỏi giỏ hàng thành công')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}
