import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import axios from '../../helpers/http';

export const changePassword = createAsyncThunk('user/changePassword',async({id,oldPassword,newPassword,confirmPassword})=>{
  const results = {}
  try{
    const {data} = await axios.patch(`/user/password/${id}`,{oldPassword,newPassword,confirmPassword})
    results.data = data.result
    window.alert(data.msg);
    return {...data}
  }
  catch(e){
    console.log(e);
  }
})