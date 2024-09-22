import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: false,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action) => {
      // The payload is directly accessible as the second argument to the reducer
      if (action.payload && action?.payload?.notification) {
        return { ...state, notification: true };
      }
      // If the payload or notification property is missing, return the current state
      return state;
    },
    closeModal: (state, action) => {
        // The payload is directly accessible as the second argument to the reducer
        if (!action?.payload?.notification) {
          return { ...state, notification: false };
        }
        // If the payload or notification property is missing, return the current state
        return state;
      },
  },
});

export const { openModal,closeModal } = modalSlice.actions; // Export the action creator

export default modalSlice.reducer; // Export the reducer
