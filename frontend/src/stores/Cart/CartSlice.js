import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  MyCartList: [],
  CartDetail: {},
  loading: false,
  error: null,
  response: null
}

const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true
    },
    doneSuccess: (state, action) => {
      state.CartDetail = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getSuccess: (state, action) => {
      state.MyCartList = action.payload
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
      state.MyCartList = state.MyCartList.filter(
        (item) => item.user_id !== action.payload
      )
      state.loading = false
      state.error = null
      state.response = 'Deleted successfully'
    },
    createSuccess: (state, action) => {
      if (!Array.isArray(state.MyCartList)) {
        state.MyCartList = []
      }
      state.MyCartList.push(action.payload)
      state.loading = false
      state.error = null
      state.response = 'Created successfully'
    },
    updateSuccess: (state, action) => {
      if (Array.isArray(state.MyCartList)) {
        const index = state.MyCartList.findIndex(
          (item) => item.user_id === action.payload.user_id
        )
        if (index !== -1) {
          state.MyCartList[index] = action.payload
        }
      } else {
        console.warn('MyCartList is not an array!', state.MyCartList)
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
} = CartSlice.actions

export const CartReducer = CartSlice.reducer
