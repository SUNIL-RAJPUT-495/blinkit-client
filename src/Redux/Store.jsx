import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
