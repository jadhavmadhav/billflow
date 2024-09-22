import { RiDeleteBin7Fill } from "react-icons/ri";
import http from "../httpCommon";
import { apiRequestWithAuth } from "../AxiosInstance";

export const createNewProduct = (data) => {
  return http.post(`/create-new-product`, data);
};

export const getAllProduct = (userId) => {
  return apiRequestWithAuth("get", `/get-product-list/${userId}`);
};

export const getAllProductsForBilling = (userId) => {
  return apiRequestWithAuth("get", `/get-product-list/${userId}`);
};

export const deleteProduct = (id) => {
  return apiRequestWithAuth("delete", `/delete-product/${id}`);
};
