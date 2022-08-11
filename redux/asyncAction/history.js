import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import http from '../../helpers/http';

export const showHistory = createAsyncThunk('history/showHistory',async({token,pages})=>{
  const results = {}
  try{
    const next = pages?pages:'1'
    const {data} = await http(token).get(`/historyTransaction?page=${next}`)
    results.data = data.result
    console.log(results.data);
    return {...data}
  }
  catch(e){
    console.log(e);

  }
})