import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  LinearProgress,
  Box,
  Button,
} from "@mui/material";
import { DateFormatter } from "../../util/formats";
import { deleteProduct } from "../../services/productsServices";
import { MdDeleteSweep } from "react-icons/md";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

export default function ShowProducts({ productList, productDetailsApi }) {
  const [tableRows, setTableRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Set the number of rows per page

  const enterpriseData = useSelector(
    (state) => state?.enterpriseDetails?.product?.productTable
  );
  useEffect(() => {
    setTableRows(enterpriseData);
  }, [enterpriseData]);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (response.status == 200) {
        productDetailsApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "S.No", width: 100 },
    ...tableRows?.map((col) => ({
      field: col.key, // Assuming col.key contains the correct key in the row object
      headerName: col.label, // Display label for the header
      width: 200,
      renderCell: (params) => {
        const value = params.row[col.key]; // Extract the specific field value from the row
        const obj = params.row;
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
        if (col.key === "actions") {
          return (
            <div className="flex items-center h-[100%] ">
              <MdDeleteSweep
                fontSize="26px"
                color="#d80404"
                className="cursor-pointer active:scale-[1.2] "
                onClick={() => handleDeleteProduct(obj._id)}
              />
            </div>
          );
        }

        if (col.key === "totalBuyingPrice") {
          const totalPrice = obj.buyingPrice * obj.quantity;
          return totalPrice;
        }

        if (col.key === "availableQuantity") {
          return obj.quantity - obj.saleQuantity;
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

  const rows = productList?.map((invoice, index) => ({
    id: index + 1,
    ...invoice,
  }));

  // Pagination Logic

   
  const getRowClassName = (params) => {
    const availableQuantity = params.row.quantity - params.row.saleQuantity;
    return availableQuantity < 0 ? "negative-quantity-row" : "";
  };
  return (
    <div className="flex flex-col h-full">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows || []}
          columns={columns || []}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          pagination
          disableSelectionOnClick
          // columnHeaderHeight={36}
          getRowClassName={getRowClassName}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "lightblue", // Header background color
            },
          }}
        />
      </div>
    </div>
  );
}
