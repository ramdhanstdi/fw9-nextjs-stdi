import { createSlice } from '@reduxjs/toolkit';
import { showHistory } from '../asyncAction/history';


const initialState = {
  value:{}
}

export const history = createSlice({
  name:'history',
  initialState,
  reducers:{},
  extraReducers:(build)=>{
    build.addCase(showHistory.pending,(state)=>{
      state.value={}
    })
    build.addCase(showHistory.fulfilled,(state,action)=>{
      state.value={...action.payload}
    })
  }
})

export {showHistory}
export default history.reducer