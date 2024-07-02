import { Iproducts_props } from "@/interfaces/interfaces";

export const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function get_product_DB(): Promise<Iproducts_props[]> {
  // cambiamos el .env
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
    console.error("Error en get products:", error);
    throw new Error(error);
  } 
}

export async function product_by_id(id: string): Promise<Iproducts_props> {
  try {
    const response = await fetch(`${api_url}/panelForSale/${id}`, {
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


const product_by_id_prueba = async (
  id: string
): Promise<Iproducts_props | undefined> =>{
  try {
    const products: Iproducts_props[] = await get_product_DB();
    console.log("esto llega de la BD", products);

    console.log(id);
    const product_id = products.find((product) => product.id === id);

    console.log("este es el resultado del find", product_id);

    if (!product_id) throw new Error("Product not found");
    return product_id;
  } catch (error: any) {
    console.error("Error fetching product by ID:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
}
export default product_by_id_prueba