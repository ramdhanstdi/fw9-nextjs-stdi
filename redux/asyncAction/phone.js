import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../helpers/http'

export const addPhone = createAsyncThunk('profile/addPhone',async({id,noTelp})=>{
  const results = {}
  try{
    const {data} = await axios.patch(`/user/profile/${id}`,{noTelp})
    console.log(data);
    results.successmsg=data.massage
    return results
  }
  catch(e){
    console.log(e);
    results.errormsg = e.response.data.massage
    return results
  }
})