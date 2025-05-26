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
} from './ArticleSlice'
import { getAuthConfig } from '../authConfig'

export const getAllArticle = () => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get('/article', config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(getSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const createArticle = (data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.post('/article', data, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(createSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const deleteArticle = (articleId) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.delete(`/article/${articleId}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(deleteSuccess(articleId))
      message.success('Xoá bài viết thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const updateArticle = (articleId, data) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.put(`/article/${articleId}`, data, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(updateSuccess(res.data))
      message.success('Cập nhật bài viết thành công!')
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}

export const getArticleById = (articleId) => async (dispatch) => {
  dispatch(getRequest())
  try {
    const config = getAuthConfig()
    const res = await axios.get(`/article/${articleId}`, config)
    if (res.data.message) {
      dispatch(getFailed(res.data.message))
    } else {
      dispatch(doneSuccess(res.data))
    }
  } catch (error) {
    dispatch(getError(error.message))
  }
}
