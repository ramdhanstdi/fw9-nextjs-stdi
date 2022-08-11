// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios'
// import qs from 'qs'

// export const login = createAsyncThunk('profile/login', async({email,password})=>{
//   const data = await axios.post('http://localhost:3333/auth/login',qs.stringify({email:email,password:password}))
//     .then((Response)=>{
//       if (Response.data.result) {
//         console.log(Response.result);
//         localStorage.setItem('token', JSON.stringify(Response.data.result))
//       }
//     })
//     .catch((err)=>{
//       window.alert(err.response.data.massage)
//       return err.response.data.massage
//     })
//   return data
// })