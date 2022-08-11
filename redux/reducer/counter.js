import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  num: 1,
  search:''
};

const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.num += 1;
    },
    decrement: (state) => {
      state.num -= 1;
    },
    searchNum: (state,action) => {
      state.search = action.payload
    }
  }
});

export const { increment, decrement,searchNum } = counter.actions;

export default counter.reducer;