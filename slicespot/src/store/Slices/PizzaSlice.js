import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../config";

const initialState = {
   pizzaInfo: [],
   isLoading : false,

};

export const getMenu = createAsyncThunk("shop/pizza",async (_,{rejectWithValue}) => {
    try {
      const response = await axios.get(`${URL}/getmenu`,{
        withCredentials: true,

      });
      rejectWithValue(response.data.message);

      if(response.data.success){
        return response.data.data
      }else{
        rejectWithValue(response.data.message);
      }
   
     
    } catch (e) {
      
      rejectWithValue(e.response.data.message);
    }
  });



export const PizzaSlice = createSlice({
  name: "shop",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.fulfilled, (state, action) => {
        state.pizzaInfo = action.payload;
        state.isLoading = false;
      })

      .addCase(getMenu.pending, (state, action) => {
        state.isLoading = true;
   
      })

      .addCase(getMenu.rejected, (state, action) => {
        state.pizzaInfo = [];
        state.isLoading = false;
      });
  },
});

export default PizzaSlice.reducer;
