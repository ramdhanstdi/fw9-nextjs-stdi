import { createAsyncThunk } from '@reduxjs/toolkit'
import qs from 'qs'
import http from '../../helpers/http'

export const addPhone = createAsyncThunk('profile/addPhone',async({token,num_phone})=>{
  const results = {}
  try{
    const send = qs.stringify({num_phone})
    const {data} = await http(token).patch('/profile',send,{headers:{'Content-Type': 'application/x-www-form-urlencoded' }})
    results.successmsg=data.massage
    return results
  }
  catch(e){
    console.log(e);
    results.errormsg = e.response.data.massage
    return results
  }
})