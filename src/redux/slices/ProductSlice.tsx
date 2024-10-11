import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  treu: !false,
};

export const ProductSlice = createSlice({
  name: "ALTEGIO",
  initialState,
  reducers: {
    AddProduct(state: any, action) {
      state.product = [...state.product, action.payload];
    },
    AddTrue(state: any, action) {
      state.treu = action.payload;
    },
  },
});

export const { AddProduct, AddTrue } = ProductSlice.actions;
export default ProductSlice.reducer;
