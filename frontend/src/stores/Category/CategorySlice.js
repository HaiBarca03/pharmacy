import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  CategoriesList: [],
  CateListProducts: [],
  CategoriesDetail: {},
  loading: false,
  error: null,
  response: null
}

const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true
    },
    doneSuccess: (state, action) => {
      state.CategoriesDetail = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getSuccess: (state, action) => {
      state.CategoriesList = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getProdCate: (state, action) => {
      state.CateListProducts = action.payload
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
      state.CategoriesList = state.CategoriesList.filter(
        (item) => item.user_id !== action.payload
      )
      state.loading = false
      state.error = null
      state.response = 'Deleted successfully'
    },
    createSuccess: (state, action) => {
      if (!Array.isArray(state.CategoriesList)) {
        state.CategoriesList = []
      }
      state.CategoriesList.push(action.payload)
      state.loading = false
      state.error = null
      state.response = 'Created successfully'
    },
    updateSuccess: (state, action) => {
      if (Array.isArray(state.CategoriesList)) {
        const index = state.CategoriesList.findIndex(
          (item) => item.user_id === action.payload.user_id
        )
        if (index !== -1) {
          state.CategoriesList[index] = action.payload
        }
      } else {
        console.warn('CategoriesList is not an array!', state.CategoriesList)
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
  updateSuccess,
  getProdCate
} = CategorySlice.actions

export const CategoryReducer = CategorySlice.reducer
