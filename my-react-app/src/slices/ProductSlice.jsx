import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    loading:false,
    products:[]
}

export const getallproducts=createAsyncThunk(
    "getallproduct",
    async () => {
        const response=await axios.get("https://backend-for-stockmanagement-production.up.railway.app/stokman/product/getallproducts")
        return response.data
        
    }
)

export const ProductSlice=createSlice({
    name:"product",
    initialState,
    reducers : {

    },
    extraReducers:(builder)=>{
        builder.addCase(getallproducts.fulfilled,(state,action)=>{
            state.products=action.payload;
        })
        builder.addCase(getallproducts.pending,(state)=>{
            state.loading=false;

        })
        builder.addCase(getallproducts.rejected,(state)=>{
            state.loading=false;
            

        })
    }
    

})
export default ProductSlice.reducer