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
  getMyHelth
} from './HealthConsultationSlice'
import { getAuthConfig } from '../authConfig'

export const createHelth = (data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.post('/health-consultation', data, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(createSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const getHealthConsultation = () => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get('/health-consultation', config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(getSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const getMyHealthConsultation = () => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get('/health-consultation/my-account', config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(getMyHelth(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const updateHelth = (id, data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.put(`/health-consultation/${id}`, data, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(updateSuccess(res.data))
      message.success('Cập nhật thành công')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const deleteHelth = (id) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.delete(`/health-consultation/${id}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(deleteSuccess(id))
      message.success('Xóa thành công')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}
