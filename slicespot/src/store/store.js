import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./Slices/UserSlice";
import CartSliceReducer from "./Slices/CartSlice";
import PizzaSliceReducer from "./Slices/PizzaSlice";
import OrderSliceReducer from "./Slices/OrderSlice";

export const store = configureStore({
  reducer: {
    app: UserSliceReducer,
    cart: CartSliceReducer,
    shop: PizzaSliceReducer,
    orders: OrderSliceReducer
  },
});

export default store;
