import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../config";

const initialState = {
   Orders: [],
   isLoading:false
};

export const getOrders= createAsyncThunk("user/orders",async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/getorders`,{
        withCredentials: true,
      });
      if(response.data.success){
         
      return response.data.data.reverse();
      }else{
         
        rejectWithValue(response.data.message);
      }
    
    
     
    } catch (e) {
      rejectWithValue(e.response.data.message);
    }
  });



export const OrderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.Orders = action.payload;
        state.isLoading = false;
      })

      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
   
      })
      

      .addCase(getOrders.rejected, (state, action) => {
        state.Orders = [];
        state.isLoading = false;
      });
  },
});

export default OrderSlice.reducer;
