import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import http from '../../helpers/http';

export const login = createAsyncThunk('profile/login', async(request)=>{
  const results = {}
  try{
    const send = qs.stringify(request)
    const {data} = await http().post('/auth/login', send)
    results.token=data.data.token
    console.log(data);
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
    const {data} = await http().post('auth/register',send)
    results.successmsg = data.massage
    console.log(data);
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
    const {data} =await http().post('auth/createPin',send,{headers:{'content-type': 'application/x-www-form-urlencoded'}})
    results.successmsg = data.message
    return results
  }
  catch(e){
    console.log(e.response.data.massage);
    results.errormsg = e.response.data.massage
    return results
  }
})