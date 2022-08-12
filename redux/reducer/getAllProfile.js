import { createSlice } from '@reduxjs/toolkit';
import { showAllProfile } from '../asyncAction/getAllProfile';


const initialState = {
  value:[]
}

export const getAllProfile = createSlice({
  name:'history',
  initialState,
  reducers:{},
  extraReducers:(build)=>{
    build.addCase(showAllProfile.pending,(state,action)=>{
      state.value=null
    }),
    build.addCase(showAllProfile.fulfilled,(state,action)=>{
      state.value=action.payload
    })
  }
})

export {showAllProfile}
export default getAllProfile.reducer