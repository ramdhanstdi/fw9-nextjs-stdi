import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/http';

export const showHistory = createAsyncThunk('history/showHistory',async({pages,limit,filter})=>{
  const results = {}
  try{
    const next = pages?pages:'1'
    const lim = limit?limit:4
    const fil = filter?filter:'MONTH'
    const {data} = await axios.get(`/transaction/history?page=${next}&limit=${lim}&filter=${fil}`)
    results.data = data.result
    console.log(results.data);
    return {...data}
  }
  catch(e){
    console.log(e);

  }
})