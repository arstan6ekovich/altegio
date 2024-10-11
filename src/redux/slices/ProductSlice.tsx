import { createSlice } from "@reduxjs/toolkit";

interface IFormInput {
  _id: number;
  firstName: string;
  lastName: string;
  age: number;
  defaultOption: string;
  secondOption: string;
  locationSettings: string;
  number: number;
}
interface searchType {
  search: IFormInput[];
  product: any;
  treu: boolean;
}
const initialState: searchType = {
  product: [],
  treu: !false,
  search: [],
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
    AddSearch(state: any, action) {
      state.search = action.payload;
    },
  },
});

export const { AddProduct, AddTrue, AddSearch } = ProductSlice.actions;
export default ProductSlice.reducer;
