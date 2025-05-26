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
} from './productSlice'
import { getAuthConfig } from '../authConfig'

export const getAllProducts =
  (page = 1, limit = 12) =>
  async (dispatch) => {
    dispatch(getRequest())
    try {
      const config = getAuthConfig()
      const res = await axios.get(
        `/product?page=${page}&limit=${limit}`,
        config
      )
      if (res.data.message) {
        dispatch(getFailed(res.data.message))
      } else {
        dispatch(getSuccess(res.data))
      }
    } catch (error) {
      dispatch(getError(error.message))
    }
  }

export const getDetailProducts = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get(`/product/${id}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(doneSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const createProduct = (newProduct) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.post('/product', newProduct, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(createSuccess(res.data))
      message.success('Tạo sản phẩm thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const updateProduct = (updatedProduct) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.put(
      `/product/${updatedProduct.id}`,
      updatedProduct,
      config
    )
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(updateSuccess(res.data))
      message.success('Cập nhật sản phẩm thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.delete(`/product/${id}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(deleteSuccess(id))
      message.success('Xóa sản phẩm thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}
