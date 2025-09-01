import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    token:null,
    loading:false
}


export const addslice = createAsyncThunk(
  "addproduct",
  async ({ productid, eklenenmiktar }, thunkApi) => {
    try {
      const response = await axios.post(
        `https://backend-for-stockmanagement-production.up.railway.app/stokman/stok/savestok/${productid}`,
        { eklenenmiktar }, // body
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Hata oluştu");
    }
  }
);






export const AddSlice=createSlice({
    name:"addslice",
    initialState,
    reducers:{

    },

    extraReducers:(builder)=>{
        builder.addCase(addslice.fulfilled,(state)=>{
            state.loading=true;
            
        })


    }

})


