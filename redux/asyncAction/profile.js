import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs'
import http from '../../helpers/http';

export const showProfile = createAsyncThunk('profile/showProfile',async(token)=>{
  const {data} = await axios.get('http://localhost:3333/profile',{headers: { Authorization:'Bearer ' + token}})
  return data
})

export const editprofile = createAsyncThunk('profile/editprofile',async({token,first_name,last_name,photo})=>{
  const results = {}
  try{
    const profile_photo = new FormData()
    profile_photo.append('file',photo)
    const send = qs.stringify({first_name,last_name,profile_photo},{headers:{'Content-Type': 'multipart/form-data' }})
    const {data} = await http(token).patch('/profile',send)
    results.successmsg=data.massage
    return results
  }
  catch(e){
    console.log(e);
    results.errormsg = e.response.data.massage
    return results
  }
})