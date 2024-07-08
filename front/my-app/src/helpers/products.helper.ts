import { Iproducts_props } from "@/interfaces/interfaces";

export const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function get_product_DB(): Promise<Iproducts_props[]> {
  try {
    // cambiamos el .env
    const res = await fetch(`https://pf-intitech.onrender.com//panelForSale`, {
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

export async function product_by_id(id: string): Promise<Iproducts_props> {
  try {
    const response = await fetch(`https://pf-intitech.onrender.com//panelForSale/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(id);

    if (!response.ok) {
      throw new Error(`error en el id: ${id}`);
    }

    const product: Iproducts_props = await response.json();
    console.log(product);

    return product;
  } catch (error: any) {
    console.error("Error en products id:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
}