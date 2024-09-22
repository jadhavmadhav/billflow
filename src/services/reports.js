import http from "../httpCommon";

export const getAllInvoices = (userId) => {
  return http.get(`/getAllInvoicesForListing/${userId}`);
};

export const getInvoicesByInvoiceNo = (invoiceNo) => {
  return http.get(`/getInvoicesByInvoiceNo/${invoiceNo}`);
};

export const DownloadInvoice = (invoiceNo) => {
  return http.get(`/download-invoice/${invoiceNo}`, {
    responseType: "blob",
  });
};
