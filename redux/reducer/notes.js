import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '-'
}

export const amountSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    costumNotes: (state,action)=>{
      state.value = action.payload
    },
    resetNotes: (state)=>{
      state.value = '-'
    }
  }
})

export const {costumNotes,resetNotes} = amountSlice.actions

export default amountSlice.reducer