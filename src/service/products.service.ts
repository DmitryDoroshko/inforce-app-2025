import axios, { type AxiosResponse } from "axios";
import type { IProduct } from "../model/Product.ts";
import { BASE_URL } from "../constants/constants.ts";

export const ProductService = {
  getAllProducts: async (): Promise<IProduct[]> => {
    try {
      const response: AxiosResponse<IProduct[]> = await axios.get(
        `${BASE_URL}/products`
      );
      return response.data;
    } catch {
      throw new Error("Failed to fetch products");
    }
  },

  getProductById: async (productId: string): Promise<IProduct> => {
    try {
      const response: AxiosResponse<IProduct> = await axios.get(
        `${BASE_URL}/products/${productId}`
      );
      return response.data;
    } catch {
      throw new Error("Failed to fetch product");
    }
  },

  addProduct: async (product: IProduct): Promise<IProduct> => {
    try {
      const response: AxiosResponse<IProduct> = await axios.post(
        `${BASE_URL}/products`,
        product
      );
      return response.data;
    } catch {
      throw new Error("Failed to add product");
    }
  },

  updateProduct: async (
    productId: string,
    product: Partial<IProduct>
  ): Promise<IProduct> => {
    try {
      const response: AxiosResponse<IProduct> = await axios.put(
        `${BASE_URL}/products/${productId}`,
        product
      );
      return response.data;
    } catch {
      throw new Error("Failed to update product");
    }
  },

  deleteProduct: async (productId: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/products/${productId}`);
    } catch {
      throw new Error("Failed to delete product");
    }
  },
};
