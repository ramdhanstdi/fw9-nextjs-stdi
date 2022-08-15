import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import axios from '../../helpers/http';

export const changePin = createAsyncThunk('user/changePin',async({id,pin})=>{
  const results = {}
  try{
    const {data} = await axios.patch(`/user/pin/${id}`,{pin})
    results.data = data.result
    window.alert(data.msg);
    return {...data}
  }
  catch(e){
    console.log(e);
  }
})