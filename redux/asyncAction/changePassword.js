import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import http from '../../helpers/http';

export const changePassword = createAsyncThunk('user/changePassword',async({token,oldPass,newPass,confirmPass})=>{
  const results = {}
  try{
    const send = qs.stringify({oldPass,newPass,confirmPass})
    const {data} = await http(token).patch('/changePassword',send)
    results.data = data.result
    console.log(results.data);
    return {...data}
  }
  catch(e){
    console.log(e);
  }
})