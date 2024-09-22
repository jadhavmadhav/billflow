import { apiRequestWithAuth } from "../AxiosInstance";
import http from "../httpCommon";

export const CreateNewCustomer = (customerData) => {
  return http.post(`/customer`, customerData);
};

export const getAllCustomers = () => {
  return apiRequestWithAuth(
    "get",
    `/customers?enterpriseId=${localStorage.getItem("enterpriseId")}`
  );
};

export const UpdateCustomer = (data) => {
  return apiRequestWithAuth("put", `/updateCustomer`, data);
};

export const DeleteCustomerById = (id) => {
  return apiRequestWithAuth("delete", `/deleteCustomer/${id}`);
};

export const getCustomerById = (id) => {
  return apiRequestWithAuth(
    "get",
    `/getCustomerById/${id}`
  );
};

export const getOverviewDetails = (userId) => {
  return http.get(`/overview/${userId}`);
};
