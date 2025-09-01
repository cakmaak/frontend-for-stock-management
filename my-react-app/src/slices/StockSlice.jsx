import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
  loading: false,
  stockhistory: []
};

export const deletestockhistory = createAsyncThunk(
  "deletestock",
  async ({ id }, thunkApi) => {
    try {
      const response = await axios.delete(
        `https://backend-for-stockmanagement-production.up.railway.app/stokman/stok/stok/${id}`,
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


export const getallstockhistory = createAsyncThunk(
  "getallstock",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://backend-for-stockmanagement-production.up.railway.app/stokman/stok/getallstockhistory",
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const StockSlice = createSlice({
  name: "stockslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallstockhistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallstockhistory.fulfilled, (state, action) => {
        state.loading = false;
        state.stockhistory = action.payload;
      })
      .addCase(getallstockhistory.rejected, (state) => {
        state.loading = false;
      })
       .addCase(deletestockhistory.fulfilled, (state, action) => {
    state.stockhistory = state.stockhistory.filter(
      item => item.id !== action.meta.arg.id
    );
  });
  }
});

export default StockSlice.reducer;
