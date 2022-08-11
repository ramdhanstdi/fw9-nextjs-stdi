import { createSlice } from '@reduxjs/toolkit'
import { addPhone } from '../asyncAction/phone'

const initialState = {
  phone:'',
  successmsg:''
}

export const addNumber = createSlice({
  name: 'addphone',
  initialState,
  reducers:{},
  extraReducers:(build)=>{
    build.addCase(addPhone.pending,(state,action)=>{
      state.successmsg=null
    })
    build.addCase(addPhone.fulfilled,(state,action)=>{
      state.successmsg=action.payload?.successmsg
    })
  }
})

export {addPhone}
export default addNumber.reducer