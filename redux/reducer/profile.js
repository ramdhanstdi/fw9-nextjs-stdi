import { createSlice } from '@reduxjs/toolkit';
import { editphoto, editprofile, showProfile } from '../asyncAction/profile';

const initialState = {
  value:[],
  balance:{},
  email:'',
  data:{},
  successmsg:''
}

export const profile = createSlice({
  name:'profile',
  initialState,
  reducers:{
    balance:(state,action)=>{
      state.balance=action.payload
    },
    loginemail:(state,action)=>{
      state.email=action.payload
    },
    resetmsg:(state)=>{
      state.successmsg=null
    }
  },
  extraReducers:(build)=>{
    build.addCase(showProfile.pending,(state)=>{
      state.value=null
    })
    build.addCase(editprofile.pending,(state)=>{
      state.data=null
      state.successmsg=null
    })
    build.addCase(showProfile.fulfilled,(state,action)=>{
      state.value=action.payload
    })
    build.addCase(editprofile.fulfilled,(state,action)=>{
      state.data=action.payload
      state.successmsg=action.payload?.successmsg
    })
    build.addCase(editphoto.pending,(state)=>{
      state.data=null
      state.successmsg=null
    })
    build.addCase(editphoto.fulfilled,(state,action)=>{
      state.successmsg=action.payload?.successmsg
    })
  }
})

export {showProfile,editprofile,editphoto}
export const {balance,loginemail,resetmsg} = profile.actions
export default profile.reducer