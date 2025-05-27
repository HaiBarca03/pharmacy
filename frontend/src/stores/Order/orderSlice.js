import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderList: [],
  orderDetails: {},
  loading: false,
  error: null,
  response: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true
    },
    doneSuccess: (state, action) => {
      state.orderDetails = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getSuccess: (state, action) => {
      state.orderList = action.payload
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
      state.orderList = state.orderList.filter(
        (item) => item.user_id !== action.payload
      )
      state.loading = false
      state.error = null
      state.response = 'Deleted successfully'
    },
    createSuccess: (state, action) => {
      if (!Array.isArray(state.orderList)) {
        state.orderList = []
      }
      state.orderList.push(action.payload)
      state.loading = false
      state.error = null
      state.response = 'Created successfully'
    },
    updateSuccess: (state, action) => {
      if (Array.isArray(state.orderList)) {
        const index = state.orderList.findIndex(
          (item) => item.user_id === action.payload.user_id
        )
        if (index !== -1) {
          state.orderList[index] = action.payload
        }
      } else {
        console.warn('orderList is not an array!', state.orderList)
      }

      state.loading = false
      state.error = null
      state.response = 'Updated successfully'
    },
    clearOrderDetails: (state) => {
      state.orderDetails = {}
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
  clearOrderDetails
} = orderSlice.actions

export const orderReducer = orderSlice.reducer
