import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import http from '../../helpers/http';

export const transfer = createAsyncThunk('home/transfer', async({token,receiver,amount,notes,time,pin})=>{
  const results = {}
  try{
    const send = qs.stringify({receiver,amount,notes,time,pin})
    const {data} = await http(token).post('/transfer', send, {headers : { 'content-type': 'application/x-www-form-urlencoded'}})
    results.successmsg = data.massage
    console.log(data);
    return results
  }
  catch(e) {
    results.errormsg = e.response.data.massage
    return results
  }
})
