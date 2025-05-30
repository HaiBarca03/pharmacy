import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productsList: [],
  productsPriceList: [],
  productDetails: {},
  productSearch: {},
  loading: false,
  error: null,
  response: null
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true
    },
    doneSuccess: (state, action) => {
      state.productDetails = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getSuccess: (state, action) => {
      state.productsList = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getSuccessPrice: (state, action) => {
      state.productsPriceList = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getSearch: (state, action) => {
      state.productSearch = action.payload
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
      state.productsList = state.productsList.filter(
        (item) => item.user_id !== action.payload
      )
      state.loading = false
      state.error = null
      state.response = 'Deleted successfully'
    },
    createSuccess: (state, action) => {
      if (!Array.isArray(state.productsList)) {
        state.productsList = []
      }
      state.productsList.push(action.payload)
      state.loading = false
      state.error = null
      state.response = 'Created successfully'
    },
    updateSuccess: (state, action) => {
      if (Array.isArray(state.productsList)) {
        const index = state.productsList.findIndex(
          (item) => item.user_id === action.payload.user_id
        )
        if (index !== -1) {
          state.productsList[index] = action.payload
        }
      } else {
        console.warn('productsList is not an array!', state.productsList)
      }

      state.loading = false
      state.error = null
      state.response = 'Updated successfully'
    },
    clearProductDetails: (state) => {
      state.productDetails = {}
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
  clearProductDetails,
  getSearch,
  getSuccessPrice
} = productSlice.actions

export const productReducer = productSlice.reducer
