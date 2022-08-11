import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: ''
}

export const phoneSlice = createSlice({
  name: 'numberPhone',
  initialState,
  reducers: {
    costumPhone: (state,action)=>{
      state.value = action.payload
    },
    resetPhone: (state)=>{
      state.value = 0
    }
  }
})

export const {costumPhone,resetPhone} = phoneSlice.actions

export default phoneSlice.reducer