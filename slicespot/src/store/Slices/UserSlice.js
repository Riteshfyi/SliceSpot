import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../config";


const initialState = {
  user: false,
  isLoading: false,
  role:"Customer"
};



export const UserSlice = createSlice({
  name: "app",
  initialState,
  reducers:{
    setUser:(state,action)=>{
    
         state.user = action.payload
        
    }
,
setRole:(state,action)=>{
    
  state.role = action.payload
 
}
,
    setLoading:(state,action)=>{
        state.isLoading = action.payload
    }
  },
 
});

export const {setUser , setLoading , setRole} = UserSlice.actions;
export default UserSlice.reducer;
