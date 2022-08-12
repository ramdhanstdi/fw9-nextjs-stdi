import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/http';

export const showAllProfile = createAsyncThunk('admin/profile',async({pages,search})=>{
  const next = pages?pages:'1'
  const find = search?search:''
  const limit = 5
  const {data} = await axios.get(`/user?page=${next}&search=${find}&limit=${limit}&sort=firstName ASC`)
  console.log(data.data);
  return data.data
})