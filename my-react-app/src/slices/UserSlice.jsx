import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const setSessionStorage = () => {
    const data = sessionStorage.getItem("token");
    return data ? data : "lütfen giriş yapınız";
};



    





const initialState = {
    token:null,
    sessiontoken:setSessionStorage(),
    loading:false,
    user:{}

    

}






export const gettoken= createAsyncThunk(
    "gettoken",
    async ({email,password,isim},thunkApi) => {
        try {
            const response=await axios.post("https://backend-for-stockmanagement-production.up.railway.app/stokman/user/saveuser",
                {
                    email,
                    password,
                    isim
                    
                },

               

            )
            
            
            
            
            return response;

            
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data || "Hata oluştu");
            


    
    }
}
)


 

export const getuser=createAsyncThunk(
    "getuser",
    async (thunkApi) => {
        try {
            const response=await axios.get("https://backend-for-stockmanagement-production.up.railway.app/stokman/user/getuser",
                {
                    headers:{
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }


                }
            );
            return response.data
            
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data || "Hata Oluştu")
            
        }
        
        
    }
)


        
    




export const login=createAsyncThunk(
    "login",
    async ({email,password},thunkAPI) => {
        try {
            const response=await axios.post("https://backend-for-stockmanagement-production.up.railway.app/auth/login",
                
                {
                    email,
                    password
                },
                 { responseType: "text" }

            )
            const token = JSON.parse(response.data).token;
            sessionStorage.setItem("token",token)
            console.log(token);
            

            return token


            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || "Hata oluştu");
            
        }
        
    }
)
    const UserSlice=createSlice({
        name:"user",
        initialState,
        reducers:{
            clearSession(state){
                sessionStorage.removeItem("token")
                state.sessiontoken=null;
                state.token=null
                state.user={}
            }
        },
        extraReducers: (builder) => {
        builder
            .addCase(gettoken.pending, (state) => {
                state.loading = true;
            })
            .addCase(gettoken.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.sessiontoken = action.payload;
            })
            .addCase(getuser.pending,(state)=>{
                state.loading=false;
            })
            .addCase(getuser.fulfilled,(state,action)=>{
                state.user=action.payload;
            })
            
    }
});

export const { clearSession } = UserSlice.actions;
export default UserSlice.reducer;


