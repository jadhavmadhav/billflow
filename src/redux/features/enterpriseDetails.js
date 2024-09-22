import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const modalSlice = createSlice({
  name: "enterpriseDetails",
  initialState,
  reducers: {
    enterPriseDetails: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { enterPriseDetails } = modalSlice.actions; // Export the action creator

export default modalSlice.reducer; // Export the reducer
