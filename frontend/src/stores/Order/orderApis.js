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
} from './orderSlice'
import { getAuthConfig } from '../authConfig'

export const getMyOrder =
  (status = '') =>
  async (dispatch) => {
    dispatch(getRequest())
    try {
      const config = getAuthConfig()
      // Nếu có status thì thêm vào query params
      const url = status
        ? `/order/my-order?status=${status}`
        : '/order/my-order'
      const res = await axios.get(url, config)
      if (res.data.message) {
        dispatch(getFailed(res.data.message))
      } else {
        dispatch(getSuccess(res.data))
      }
    } catch (error) {
      dispatch(getError(error.message))
    }
  }

export const getOrderDetails = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get(`/order/${id}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(doneSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const createOrder = (orderData) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.post('/order', orderData, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(createSuccess(res.data))
      message.success('Đặt hàng thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const getAllOrders =
  (status = '', page = 1, limit = 12) =>
  async (dispatch) => {
    dispatch(getRequest())
    try {
      const config = getAuthConfig()
      const url = status
        ? `/order/all-orders?page=${page}&limit=${limit}&status=${status}`
        : `/order/all-orders?page=${page}&limit=${limit}`
      const res = await axios.get(url, config)
      if (res.data.message) {
        dispatch(getFailed(res.data.message))
      } else {
        dispatch(getSuccess(res.data))
      }
    } catch (error) {
      dispatch(getError(error.message))
    }
  }

export const updateOrderStatus = (id, status) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.put(`/order/${id}/status`, { status }, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(updateSuccess(res.data))
      message.success('Cập nhật trạng thái đơn hàng thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const deleteOrder = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.delete(`/order/${id}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(deleteSuccess(res.data))
      message.success('Xoá đơn hàng thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const cancelOrder = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.put(`/order/${id}/cancel`, {}, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(postDone(res.data))
      message.success('Hủy đơn hàng thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}
