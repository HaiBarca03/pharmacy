import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articleList: [],
  articleDetail: {},
  loading: false,
  error: null,
  response: null
}

const articleSlice = createSlice({
  name: 'Article',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true
    },
    doneSuccess: (state, action) => {
      state.articleDetail = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getSuccess: (state, action) => {
      state.articleList = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getFailed: (state, action) => {
      state.response = action.payload
      state.loading = false
      state.error = null
    },
    getError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    postDone: (state) => {
      state.loading = false
      state.error = null
      state.response = null
    },
    deleteSuccess: (state, action) => {
      state.articleList = state.articleList.filter(
        (item) => item.user_id !== action.payload
      )
      state.loading = false
      state.error = null
      state.response = 'Deleted successfully'
    },
    createSuccess: (state, action) => {
      if (!Array.isArray(state.articleList)) {
        state.articleList = []
      }
      state.articleList.push(action.payload)
      state.loading = false
      state.error = null
      state.response = 'Created successfully'
    },
    updateSuccess: (state, action) => {
      if (Array.isArray(state.articleList)) {
        const index = state.articleList.findIndex(
          (item) => item.user_id === action.payload.user_id
        )
        if (index !== -1) {
          state.articleList[index] = action.payload
        }
      } else {
        console.warn('articleList is not an array!', state.articleList)
      }

      state.loading = false
      state.error = null
      state.response = 'Updated successfully'
    }
  }
})

export const {
  getRequest,
  doneSuccess,
  getSuccess,
  getFailed,
  getError,
  postDone,
  deleteSuccess,
  createSuccess,
  updateSuccess
} = articleSlice.actions

export const articleReducer = articleSlice.reducer
