import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //funciones que modifican el estado
    addToCart: (state) => {
    },
    deleteItem: (state) => {
    },
    deleteCart: (state) => {},
  },
});

//exporto las acciones que modifican el estado y los puedo llamar en los componentes 
export const { addToCart, deleteItem, deleteCart } = cartSlice.actions;

//exportacion solo del reducer
export default cartSlice.reducer