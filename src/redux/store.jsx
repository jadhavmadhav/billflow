import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/loginSlice";
import modalStates from "./features/modalStates";
import getCustomerData from "./features/callAip";
import getOverview from "./features/getOverview";
import enterpriseDetails from "./features/enterpriseDetails";

const store = configureStore({
  reducer: {
    todoSlice: todoSlice,
    ModalStates: modalStates,
    getCustomerData: getCustomerData,
    getOverviewData: getOverview,
    enterpriseDetails: enterpriseDetails,
  },
});

export default store;
