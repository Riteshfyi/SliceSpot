import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../config";

const initialState = {
  cart: [],
  totalprice: 0,
  isLoading: false,
};

export const getCart = createAsyncThunk("user/cart", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${URL}/getcart`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        state.totalprice = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.rejected, (state) => {
        state.cart = [];
        state.totalprice = 0;
        state.isLoading = false;
      });
  },
});

export default CartSlice.reducer;
