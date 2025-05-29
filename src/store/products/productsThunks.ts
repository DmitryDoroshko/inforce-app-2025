import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "../../service/products.service.ts";
import type { IProduct } from "../../model/Product.ts";
import type { IComment } from "../../model/Comment.ts";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const products = await ProductService.getAllProducts();
  return products;
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (productId: string) => {
  const product = await ProductService.getProductById(productId);
  return product;
});

export const addProduct = createAsyncThunk("products/addProduct", async (product: IProduct) => {
  const newProduct = await ProductService.addProduct(product);
  return newProduct;
});

export const editProduct = createAsyncThunk("products/editProduct", async ({ productId, updatedProduct }: {
  productId: string,
  updatedProduct: Partial<IProduct>
}) => {
  const editedProduct = await ProductService.updateProduct(productId, updatedProduct);
  return editedProduct;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId: string) => {
  await ProductService.deleteProduct(productId);
  return productId;
});

type AddCommentPayload = {
  productId: string;
  description: string;
  date: string;
};

export const addComment = createAsyncThunk(
  "products/addComment",
  async ({ productId, description, date }: AddCommentPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { products: { products: IProduct[] } };
      const product = state.products.products.find(p => p.id === productId);

      if (!product) {
        return rejectWithValue("Product not found");
      }

      const newComment: IComment = {
        id: `comment-${Date.now()}`,
        productId: parseInt(productId),
        description,
        date
      };

      const updatedProduct = {
        ...product,
        comments: [...product.comments, newComment]
      };

      const result = await ProductService.updateProduct(productId, updatedProduct);
      return { productId, comment: newComment };
    } catch (error) {
      return rejectWithValue("Failed to add comment");
    }
  }
);