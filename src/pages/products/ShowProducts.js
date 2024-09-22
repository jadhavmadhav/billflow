import React, { useState } from "react";
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
} from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { DateFormatter } from "../../util/formats";
import { deleteProduct } from "../../services/productsServices";
import NoData from "../../components/NoData";

export default function ShowProducts({ productList, productDetailsApi }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Set the number of rows per page

  const productDeleteApi = async (productId) => {
    try {
      const request = await deleteProduct(productId);
      const response = await request.data;
      if (response.status === 200) {
        productDetailsApi();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Pagination Logic
  const paginatedProducts = productList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex flex-col h-full">
      <TableContainer component={Paper} className="overflow-auto flex-grow">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Buying Date</TableCell>
              <TableCell>SGST (%)</TableCell>
              <TableCell>CGST (%)</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Buying Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Buying Price</TableCell>
              <TableCell>Available Quantity</TableCell> {/* New column */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product, index) => {
              const {
                productId,
                item,
                sgst,
                cgst,
                buyingPrice,
                sellingPrice,
                quantity,
                cost,
                createdAt,
                saleQuantity,
              } = product;
              let inDate = DateFormatter(createdAt);
              let totalBuyingPrice = Number(buyingPrice) * Number(quantity);
              let availableQuantity = Number(quantity) - Number(saleQuantity);
              let totalQuantity = Number(quantity); // Total quantity as the progress max value

              return (
                <TableRow key={productId}>
                  <TableCell>
                    {index + 1 + (currentPage - 1) * rowsPerPage}
                  </TableCell>
                  <TableCell>{item}</TableCell>
                  <TableCell>{inDate}</TableCell>
                  <TableCell>{sgst}</TableCell>
                  <TableCell>{cgst}</TableCell>
                  <TableCell>{cost}</TableCell>
                  <TableCell>{buyingPrice}</TableCell>
                  <TableCell>{sellingPrice}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{totalBuyingPrice}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {availableQuantity}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => console.log(`Edit ${productId}`)}
                    >
                      <FaEdit size={20} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => productDeleteApi(productId)}
                    >
                      <FaTrashAlt size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {productList.length === 0 && <NoData />}
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(productList.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
}
