import { RiDeleteBin7Fill } from "react-icons/ri";
import http from "../httpCommon";
import { apiRequestWithAuth } from "../AxiosInstance";

export const createNewProduct = (data) => {
<<<<<<< HEAD
  return apiRequestWithAuth("post", `/create-new-product`, data);
};

export const getAllProduct = (userId) => {
  return apiRequestWithAuth("get", `/get-all-products/${userId}`);
=======
  return http.post(`/create-new-product`, data);
};

export const getAllProduct = (userId) => {
  return apiRequestWithAuth("get", `/get-product-list/${userId}`);
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
};

export const getAllProductsForBilling = (userId) => {
  return apiRequestWithAuth("get", `/get-product-list/${userId}`);
};

export const deleteProduct = (id) => {
  return apiRequestWithAuth("delete", `/delete-product/${id}`);
};
