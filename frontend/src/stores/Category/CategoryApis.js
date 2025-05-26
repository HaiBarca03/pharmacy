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
  getProdCate
} from './CategorySlice'
import { getAuthConfig } from '../authConfig'

export const createCategory = (data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.post('/category', data, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(createSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const updateCategory = (id, data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.put(`/category/${id}`, data, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(updateSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const getAllCategory = () => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get('/category')
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(getSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const getProductCategory =
  (id, page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch(getRequest())
    try {
      const config = getAuthConfig()
      const res = await axios.get(
        `/product/category/${id}?page=${page}&limit=${limit}`,
        config
      )
      if (res.data.message) {
        dispatch(getFailed(res.data.message))
      } else {
        dispatch(getProdCate(res.data))
      }
    } catch (error) {
      dispatch(getError(error.message))
    }
  }

export const getDetailCategory = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get(`/category/${id}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(doneSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const deleteCategory = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.delete(`/category/${id}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(deleteSuccess(id))
      message.success('Xoá thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}
