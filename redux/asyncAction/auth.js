import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import axios from '../../helpers/http';

export const login = createAsyncThunk('profile/login', async(request)=>{
  const results = {}
  try{
    const send = qs.stringify(request)
    const {data} = await axios.post('/auth/login', request)
    results.token=data.data.token
    results.id=data.data.id
    results.pin=data.data.pin
    return results
  }
  catch(e) {
    results.errormsg = e.response.data.msg
    return results
  }
})

export const register = createAsyncThunk('profile/register', async(request)=>{
  const results = {}
  try{
    const send = qs.stringify(request)
    const {data} = await axios.post('auth/register',send)
    results.successmsg = data.massage
    return results
  }
  catch(e){
    const error = e.response.data.result
    const errormsg = error.map((e)=>{
      window.alert(e.msg);
      return e.msg
    })
    results.errormsg = errormsg
    return results
  }
})

export const createpin = createAsyncThunk('profile/createpin',async(request)=>{
  const results = {}
  try{
    const send = qs.stringify(request)
    const {data} =await axios.post('auth/createPin',send)
    results.successmsg = data.message
    return results
  }
  catch(e){
    console.log(e.response.data.massage);
    results.errormsg = e.response.data.massage
    return results
  }
})