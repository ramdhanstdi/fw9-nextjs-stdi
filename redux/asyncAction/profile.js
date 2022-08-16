import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import axios from '../../helpers/http';

export const showProfile = createAsyncThunk('profile/showProfile',async(id)=>{
  const {data} = await axios.get(`/user/profile/${id}`)
  return data
})

export const editprofile = createAsyncThunk('profile/editprofile',async({id,firstName,lastName})=>{
  const results = {}
  try{
    const {data} = await axios.patch(`/user/profile/${id}`,{firstName,lastName})
    results.successmsg=data.msg
    return results
  }
  catch(e){
    console.log(e);
    results.errormsg = e.response.data.massage
    return results
  }
})

export const editphoto = createAsyncThunk('profile/editphoto',async({id,image})=>{
  const results = {}
  try{
    const formData = new FormData()
    formData.append('image',image)
    const {data} = await axios.patch(`/user/image/${id}`,formData)
    console.log(data);
    results.successmsg=data.msg
    return results
  }
  catch(e){
    console.log(e);
    results.errormsg = e.response.data.massage
    return results
  }
})