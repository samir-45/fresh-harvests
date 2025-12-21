import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/store/services/api";

type CartItem = { product: Product; qty: number };

type CartState = { items: Record<string, CartItem> };

const initialState: CartState = { items: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const p = action.payload;
      const existing = state.items[p.id];
      state.items[p.id] = { product: p, qty: existing ? existing.qty + 1 : 1 };
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    setQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.items[action.payload.id];
      if (!item) return;
      item.qty = Math.max(1, action.payload.qty);
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, setQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
