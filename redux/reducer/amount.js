import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0
}

export const amountSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    costumAmount: (state,action)=>{
      state.value = parseInt(action.payload, 10)
    },
    resetAmount: (state)=>{
      state.value = 0
    }
  }
})

export const {costumAmount,resetAmount} = amountSlice.actions

export default amountSlice.reducer