import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  HealthConsultationsList: [],
  HealthConsultationDetail: {},
  loading: false,
  error: null,
  response: null
}

const HealthConsultationSlice = createSlice({
  name: 'HealthConsultation',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true
    },
    doneSuccess: (state, action) => {
      state.HealthConsultationDetail = action.payload
      state.loading = false
      state.error = null
      state.response = null
    },
    getSuccess: (state, action) => {
      state.HealthConsultationsList = action.payload
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
      state.HealthConsultationsList = state.HealthConsultationsList.filter(
        (item) => item.user_id !== action.payload
      )
      state.loading = false
      state.error = null
      state.response = 'Deleted successfully'
    },
    createSuccess: (state, action) => {
      if (!Array.isArray(state.HealthConsultationsList)) {
        state.HealthConsultationsList = []
      }
      state.HealthConsultationsList.push(action.payload)
      state.loading = false
      state.error = null
      state.response = 'Created successfully'
    },
    updateSuccess: (state, action) => {
      if (Array.isArray(state.HealthConsultationsList)) {
        const index = state.HealthConsultationsList.findIndex(
          (item) => item.user_id === action.payload.user_id
        )
        if (index !== -1) {
          state.HealthConsultationsList[index] = action.payload
        }
      } else {
        console.warn(
          'HealthConsultationsList is not an array!',
          state.HealthConsultationsList
        )
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
} = HealthConsultationSlice.actions

export const HealthConsultationReducer = HealthConsultationSlice.reducer
