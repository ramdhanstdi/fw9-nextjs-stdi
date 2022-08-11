import { createSlice } from '@reduxjs/toolkit'
import {createpin, login, register} from '../asyncAction/auth'
import Cookies from 'js-cookie'

const initialState = {
  token:Cookies.get('token')||null,
  email:'',
  errormsg:'',
  successmsg:''
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state,action) => {
      Cookies.remove('token');
      state.token=null
    },
    costumeEmail:(state,action)=>{
      state.email=action.payload
    },
    resetEmail:(state,action)=>{
      state.email=''
    },
    deleteErrorAuth:(state,action)=>{
      state.errormsg=null
    },
    deleteSuccessAuth:(state,action)=>{
      state.successmsg=null
    }
  },
  extraReducers: (build) => {
    build.addCase(login.pending,(state)=>{
      state.errormsg= null;
      state.successmsg= null;
    })
    build.addCase(login.fulfilled,(state,action)=>{
      const token = action.payload?.token
      if(token){
        state.token=token
        Cookies.set('token',token)
      }else{
        state.errormsg = action.payload?.errormsg
        state.successmsg = action.payload?.successmsg
      }
    })
    build.addCase(register.pending,(state)=>{
      state.errormsg=null
      state.successmsg=null
    })
    build.addCase(register.fulfilled,(state,action)=>{
      state.errormsg = action.payload?.errormsg
      state.successmsg = action.payload?.successmsg
    })
    build.addCase(createpin.pending,(state)=>{
      state.errormsg=null
      state.successmsg=null
    })
    build.addCase(createpin.fulfilled,(state,action)=>{
      state.errormsg = action.payload?.errormsg
      state.successmsg = action.payload?.successmsg
    })
  }
})

export {login}
export const {logout} = auth.actions
export const {costumeEmail,resetEmail,deleteErrorAuth,deleteSuccessAuth} = auth.actions
export default auth.reducer