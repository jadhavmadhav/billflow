import React, { useEffect, useState } from "react";
import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { GrDownload } from "react-icons/gr";
import moment from "moment";
import { DateFormatter } from "../../util/formats";
import { DownloadInvoice, getAllInvoices } from "../../services/reports";
import Spinner from "../../components/Spinner";
import Invoice from "../../components/Invoice";
import PageLayout from "../../layout/PageLayout";

const Reports = () => {
  const [openInvoice, setOpenInvoice] = useState({
    isOpen: false,
    invoiceNo: "",
  });
  const [invoices, setInvoices] = useState([]);

  const getAllInvoiceApi = async () => {
    try {
      const request = await getAllInvoices(localStorage.getItem("userId"));
      const response = await request.data;
      if (response.status === 200) {
        setInvoices(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const downloadInvoice = async (id, customerName, invoiceDate) => {
    try {
      const dd = await DownloadInvoice(id);
      const link = await dd.data;
      const pdfBlob = new Blob([link], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute(
        "download",
        `invoice_${customerName.split(" ").join("_")}_${moment(invoiceDate).format("MM_DD_YYYY")}.pdf`
      );

      document.body.appendChild(tempLink);
      tempLink.click();

      // Clean up the temporary elements and URL
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllInvoiceApi();
  }, []);

  return (
    <PageLayout label={"Reports"}>
      <div className="flex flex-col gap-2 h-[100%]">
        <div className="flex-1 overflow-auto">
          <TableContainer component={Paper} className="overflow-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice No</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Creation Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Bill No</TableCell>
                  <TableCell>Pay Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices?.map((i, index) => {
                  const {
                    totalInvoiceAmount,
                    invoiceId,
                    invoiceNo,
                    invoiceDate,
                    dueDate,
                    customerName,
                    billId,
                  } = i;
                  const InvoiceDate = DateFormatter(invoiceDate);
                  return (
                    <TableRow key={invoiceId}>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          {invoiceNo}
                          <IconButton
                            color="primary"
                            onClick={() => {
                              downloadInvoice(invoiceNo, customerName, invoiceDate);
                            }}
                          >
                            <GrDownload size={20} />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell>{customerName}</TableCell>
                      <TableCell>{InvoiceDate}</TableCell>
                      <TableCell>{totalInvoiceAmount}</TableCell>
                      <TableCell>{billId}</TableCell>
                      <TableCell>
                        <button className="bg-[#20c06d] w-[130px] font-[500] py-[5px] rounded-[6px] text-[white]">
                          Done
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* <div className="h-[80px] w-full bg-[#7c7b7b]"></div> */}
      </div>

      {/* Modals */}
      <Modal
        open={openInvoice.isOpen}
        onClose={() => {
          setOpenInvoice({ isOpen: false });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Invoice
          invoiceNo={openInvoice.invoiceNo}
          onClose={() => {
            setOpenInvoice({ isOpen: false });
          }}
        />
      </Modal>
    </PageLayout>
  );
};

export default Reports;
