import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { DateFormatter } from "../../util/formats";
import PageLayout from "../../layout/PageLayout";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css"; // Import the styles
import "react-date-range/dist/theme/default.css"; // Import the theme
import DateRangePickerComp from "../../components/DateRange/DateRangePicker";
import { getSales } from "../../services/billServices";

// Sample data
// const salesData = [
//   {
//     productName: "Product12544",
//     buyingDate: new Date("2023-09-01"),
//     sellingDate: new Date("2023-09-05"),
//     sellingPrice: "1500",
//     buyingPrice: "1400",
//     labourPrice: "0",
//     discount: "0",
//     profit: "100",
//   },
//   {
//     productName: "Product22555",
//     buyingDate: new Date("2023-08-15"),
//     sellingDate: new Date("2023-08-20"),
//     sellingPrice: "2000",
//     buyingPrice: "1800",
//     labourPrice: "50",
//     discount: "10",
//     profit: "140",
//   },
//   {
//     productName: "Product32566",
//     buyingDate: new Date("2023-07-25"),
//     sellingDate: new Date("2023-07-30"),
//     sellingPrice: "1200",
//     buyingPrice: "1100",
//     labourPrice: "20",
//     discount: "5",
//     profit: "95",
//   },
//   {
//     productName: "Product42577",
//     buyingDate: new Date("2023-06-10"),
//     sellingDate: new Date("2023-06-15"),
//     sellingPrice: "1800",
//     buyingPrice: "1600",
//     labourPrice: "30",
//     discount: "15",
//     profit: "155",
//   },
//   {
//     productName: "Product52588",
//     buyingDate: new Date("2023-05-05"),
//     sellingDate: new Date("2023-05-10"),
//     sellingPrice: "2500",
//     buyingPrice: "2300",
//     labourPrice: "40",
//     discount: "20",
//     profit: "180",
//   },
// ];

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [filters, setFilters] = useState({
    productName: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const getSalesData = async () => {
    try {
      const response = await getSales();
      if (response.status === 200) {
        setSalesData(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSalesData();
  }, []);
  return (
    <PageLayout label="Sales">
      <Box p={2}>
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          <TextField
            label="Product Name"
            name="productName"
            value={filters.productName}
            onChange={handleFilterChange}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ maxWidth: "300px" }}
          />
        </Box>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer Phone</TableCell>
                <TableCell>Buying Date</TableCell>
                <TableCell>Selling Date</TableCell>
                <TableCell>Selling Price</TableCell>
                <TableCell>Buying Price</TableCell>
                <TableCell>Labour Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData?.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{row?.item}</TableCell>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.mobileNumber}</TableCell>
                    <TableCell>{DateFormatter(row.buyingDate)}</TableCell>
                    <TableCell>{DateFormatter(row.saleDate)}</TableCell>
                    <TableCell>{row.sellingPrice}</TableCell>
                    <TableCell>{row.buyingPrice}</TableCell>
                    <TableCell>{row.labourPrice}</TableCell>
                    <TableCell>{row.discount}</TableCell>
                    <TableCell>{row.profit}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </PageLayout>
  );
};

export default Sales;
