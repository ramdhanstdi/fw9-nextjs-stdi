import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const showAllProfile = createAsyncThunk('admin/profile',async({pages,search})=>{
  const next = pages?pages:'1'
  const find = search?search:''
  console.log(find);
  const {data} = await axios.get(`http://localhost:3333/admin/profile?page=${next}&search=${find}`)
  return data
})