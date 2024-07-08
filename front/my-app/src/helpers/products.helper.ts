import { Iproducts_props } from "@/interfaces/interfaces";

export const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function get_product_DB(): Promise<Iproducts_props[]> {
  try {
    const res = await fetch(`${api_url}/panelForSale`, {
      method: "GET",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const products: Iproducts_props[] = await res.json();
    return products;
  } catch (error: any) {
    console.error("Error en get products:", error);
    throw new Error(error);
  } 
}

export async function product_by_id(id: string) {
  console.log("llega hasta aqui")
  try {
    const products = await get_product_DB();
    const product = products.find(product => product.id === id);
    if(!product) console.log("No se encontro el producto");
    return product
  } catch (error) {
    console.log("todo mal")
  }
}