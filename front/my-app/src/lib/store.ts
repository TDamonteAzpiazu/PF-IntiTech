import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";//viene de la linea 25

export const store = configureStore({
  reducer: {
    cartReducer, //indica que son las funciones autorizadas a ejecutarse
  },
});

export type RootState=ReturnType<typeof store.getState>//tipo de datos que tenga el estado 
export type AppDispatch=typeof store.dispatch //le informo al dispatch las funciones que posee