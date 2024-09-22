import { apiRequestWithAuth } from "../AxiosInstance";

const enterpriseId = localStorage.getItem("enterpriseId");

export const getEnterpriseDetails = () => {
  return apiRequestWithAuth("get", `/enterprise-details/${enterpriseId}`);
};
