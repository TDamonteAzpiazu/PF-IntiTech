import { Iproducts_props } from "@/interfaces/interfaces";

export const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function get_product_DB(): Promise<Iproducts_props[]> {
  try {
    const res = await fetch(`${api_url}/panelForSale`, {
      method: "GET",
      //next: { revalidate: 10 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const products: Iproducts_props[] = await res.json();
    return products;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error(error);
  }
}