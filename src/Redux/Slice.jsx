import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartOpen: false, // track if cart is open
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find(item => item._id === id);
      if (existing) {
        existing.quantity -= 1;
        if (existing.quantity <= 0) {
          state.items = state.items.filter(item => item._id !== id);
        }
      }
    },
    openCart: (state) => {
      state.cartOpen = true;
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },
  },
});

export const { addItem, removeItem, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
