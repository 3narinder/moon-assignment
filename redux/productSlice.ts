import { Product } from "@/constants/Types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    menProducts: [],
    womenProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.menProducts = action.payload.filter(
          (product: Product) => product.category === "men's clothing"
        );
        state.womenProducts = action.payload.filter(
          (product: Product) => product.category === "women's clothing"
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
