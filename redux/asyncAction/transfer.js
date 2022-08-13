import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import axios from '../../helpers/http';

export const transfer = createAsyncThunk('home/transfer', async({receiverId,money,notes})=>{
  const results = {}
  const amount = parseInt(money)
  try{
    const {data} = await axios.post('/transaction/transfer', {receiverId,amount,notes})
    results.successmsg = data.msg
    console.log(data);
    return results
  }
  catch(e) {
    results.errormsg = e.response.data.massage
    return results
  }
})

export const topUp = createAsyncThunk('home/topUp',async({amount})=>{
  const results ={}
  try{
    const {data} = await axios.post('/transaction/top-up', {amount})
    results.successmsg = data.massage
    if(data.data.redirectUrl){
      window.open(data.data.redirectUrl,'_blank')
    }
    return results
  }
  catch(e) {
    results.errormsg = e.response.data.massage
    return results
  }
})
