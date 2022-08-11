// import { createSlice } from '@reduxjs/toolkit';
// import { login } from '../asyncAction/login';

// const initialState = {
//   user:''
// }

// export const loginSlice = createSlice({
//   name:'login',
//   initialState,
//   reducers:{
//     logout: (state) => {
//       localStorage.removeItem('token');
//       return initialState;
//     }
//   },
//   extraReducers:(build)=>{
//     build.addCase(login.fulfilled,(state,action)=>{
//       state.user=action.payload
//     })
//   }
// })

// export {login}
// export const {logout} = loginSlice.actions
// export default loginSlice.reducer