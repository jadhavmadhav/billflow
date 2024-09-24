import React, { useEffect, useState } from "react";
import { Modal, Button } from "@mui/material";
import Invoice from "../../components/Invoice";
import { getAllBillsForUser } from "../../services/billServices";
import moment from "moment";
import PageLayout from "../../layout/PageLayout";
import { DateFormatter } from "../../util/formats";
import { useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";

const Bills = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openInvoice, setOpenInvoice] = useState({
    isOpen: false,
    invoiceNo: "",
  });

  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const enterpriseData = useSelector(
    (state) => state?.enterpriseDetails?.bill?.billTable
  );

  useEffect(() => {
    setTableRows(enterpriseData);
  }, [enterpriseData]);
  const getAllInvoiceApi = async () => {
    try {
      const request = await getAllBillsForUser();
      if (request.status === 200) {
        setFilteredInvoices(request.result);
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    getAllInvoiceApi();
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 100 },
    ...tableRows?.map((col) => ({
      field: col.key, // Assuming col.key contains the correct key in the row object
      headerName: col.label, // Display label for the header
      width: 200,
      renderCell: (params) => {
        const value = params.row[col.key]; // Extract the specific field value from the row

        // Handle cases where value is an array (like items array)
        if (Array.isArray(value)) {
          return value.map((x, idx) => (
            <span key={idx}>
              {x.item}
              {idx < value.length - 1 && ", "}
            </span>
          ));
        }

        // Handle the case where the column key is 'status'
        if (col.key === "status") {
          return (
            <Button
              variant="contained"
              color={value === "paid" ? "success" : "error"}
              style={{ width: "100px" }}
            >
              {value === "paid" ? "Done" : "Pending"}
            </Button>
          );
        }

        // Handle the case where the column key is 'date' (formatting the date)
        if (col.key === "date") {
          return DateFormatter(value);
        }

        // Return the value for other cases
        return value ?? "N/A"; // Handle null or undefined values with fallback
      },
    })),
  ];

  const rows = filteredInvoices?.map((invoice, index) => ({
    id: index + 1,
    ...invoice,
  }));
  console.log("customerName", filteredInvoices);
  return (
    <PageLayout label={"Bills"}>
      {/* Main Container */}

      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows || []}
          columns={columns || []}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          pagination
          disableSelectionOnClick
        />
      </div>

      {/* Invoice Modal */}
      <Modal
        open={openInvoice.isOpen}
        onClose={() => setOpenInvoice({ isOpen: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Invoice
          invoiceNo={openInvoice?.invoiceNo}
          onClose={() => setOpenInvoice({ isOpen: false })}
        />
      </Modal>
    </PageLayout>
  );
};

export default Bills;
