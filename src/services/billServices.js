import { apiRequestWithAuth } from "../AxiosInstance";

export const createNewBill = (data) => {
  return apiRequestWithAuth("post", `/create-new-bill`, data);
};

export const getAllBillsOfCustomer = (id) => {
  return apiRequestWithAuth("get", `/get-all-bills/${id}`);
};

export const getAllBillsForUser = () => {
  return apiRequestWithAuth(
    "get",
    `/get-all-bills?enterpriseId=${localStorage.getItem("enterpriseId")}`
  );
};

export const getBillByBillId = (id) => {
  return apiRequestWithAuth("get", `/getBillById/${id}`);
};

export const UpdateBill = (data) => {
  return apiRequestWithAuth("post", `/updateBill`, data);
};

export const DeleteBillById = (id) => {
  return apiRequestWithAuth("delete", `deleteBill/${id}`);
};

// ----------------------------Sales -------------------------------

export const getSales = () => {
  return apiRequestWithAuth(
    "get",
    `/getAllSalesOfUser/${localStorage.getItem("enterpriseId")}`
  );
};
