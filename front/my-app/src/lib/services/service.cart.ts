import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ cartId, productId, ...productData }) => ({
        url: `cart/add/${cartId}`,
        method: "POST",
        body: { id: productId, ...productData },
      }),
    }),
  }),
});

//HOOK PERSONALIZADO
export const { useAddToCartMutation } = cartApi;

// FORMA DE IMPORTARLO EN OTRO COMPONENTE 
//const [addToCart] = useAddToCartMutation();
