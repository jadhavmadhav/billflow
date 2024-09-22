import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils";
import {
  getAllCustomers,
  getOverviewDetails,
} from "../../services/customerServices";

export const callOverviewAPI = createAsyncThunk(
  "callOverviewAPI",
  async (payload, { rejectWithValue }) => {
    try {
      const request = await getOverviewDetails(payload);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle and return error properly
    }
  }
);

const getOverviewData = createSlice({
  name: "overview",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(callOverviewAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(callOverviewAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.result;
      })
      .addCase(callOverviewAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getOverviewData.reducer;
