import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllCustomers } from "../../services/customerServices";

export const getData = createAsyncThunk(
  "getData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getAllCustomers(); // Await the async request
      return response.data; // Return the response data directly
    } catch (error) {
      return rejectWithValue(error?.response?.data ?? ""); // Handle and return error properly
    }
  }
);

const getCustomerData = createSlice({
  name: "test",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData?.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData?.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.result;
      })
      .addCase(getData?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload ?? ""; // Use payload for error message
      });
  },
});

export default getCustomerData.reducer;
