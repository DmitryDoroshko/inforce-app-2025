import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../model/Product.ts";
import {
  addComment,
  addProduct,
  deleteProduct,
  editProduct,
  fetchProductById,
  fetchProducts,
} from "./productsThunks.ts";
import type { RootState } from "../index.ts";

interface ProductsState {
  products: IProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentProduct: IProduct | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
  currentProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<{ products: IProduct[] }>) {
      state.products = action.payload.products;
    },
    setCurrentProduct(state, action: PayloadAction<IProduct | null>) {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Check if product already exists in the array
        const productExists = state.products.some(product => product.id === action.payload.id);

        // Only add to the products array if it doesn't already exist
        if (!productExists) {
          state.products.push(action.payload);
        } else {
          // If it exists, update it to ensure we have the latest data
          const index = state.products.findIndex(product => product.id === action.payload.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        }

        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch product";
        state.currentProduct = null;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add product";
      })
      // Edit product
      .addCase(editProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        const existingProductIndex = state.products.findIndex((product) => product.id === id);
        if (existingProductIndex !== -1) {
          state.products[existingProductIndex] = { ...state.products[existingProductIndex], ...action.payload };
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to edit product";
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const productId = action.payload;
        state.products = state.products.filter((product) => product.id !== productId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete product";
      })
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { productId, comment } = action.payload;
        const productIndex = state.products.findIndex((product) => product.id === productId);

        if (productIndex !== -1) {
          state.products[productIndex].comments.push(comment);

          // If this is the current product, update it too
          if (state.currentProduct && state.currentProduct.id === productId) {
            state.currentProduct.comments.push(comment);
          }
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add comment";
      });
  },
});

export const { setCurrentProduct, setProducts } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const selectError = (state: RootState) => state.products.error;
export const selectStatus = (state: RootState) => state.products.status;
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct;

export default productsSlice.reducer;
