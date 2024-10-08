import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const ProductSlice = createSlice({
  name: "ALTEGIO",
  initialState,
  reducers: {
    AddProduct(state: any, action) {
      state.product = [...state.product, action.payload];
    },
  },
});

export const { AddProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
