import { createSlice } from '@reduxjs/toolkit'
import { transfer } from '../asyncAction/transfer'

const initialState = {
  receiver:'',
  name:'',
  phone: '',
  photo:'',
  date:'',
  errormsg:'',
  successmsg:''
}

export const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    costumNameTransfer: (state,action)=>{
      state.name = action.payload
    },
    costumPhoneTransfer: (state,action)=>{
      state.phone = action.payload
    },
    costumPhotoTransfer: (state,action)=>{
      state.photo = action.payload
    },
    costumDateTransfer:(state,action)=>{
      state.date = action.payload
    },
    costumReceiver:(state,action)=>{
      state.receiver = action.payload
    },
    resetTransfer: (state)=>{
      state.name = ''
      state.phone = ''
      state.photo = ''
      state.data = ''
    }
  },
  extraReducers: (build)=>{
    build.addCase(transfer.pending,(state)=>{
      state.errormsg=null
      state.successmsg=null
    })
    build.addCase(transfer.fulfilled,(state,action)=>{
      state.errormsg=action.payload?.errormsg
      state.successmsg=action.payload?.successmsg
    })
  }
})

export const {costumPhotoTransfer,costumNameTransfer,costumPhoneTransfer,costumDateTransfer,costumReceiver,resetTransfer} = transferSlice.actions

export default transferSlice.reducer