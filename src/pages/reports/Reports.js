import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const ReportPage = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openDatePickerModal, setOpenDatePickerModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [activeReport, setActiveReport] = useState('sales');

  // Example data for each report type
  const reportData = {
    sales: [
      { id: 1, name: 'John Doe', sales: 500, date: '2024-08-12' },
      { id: 2, name: 'Jane Doe', sales: 300, date: '2024-08-14' },
    ],
    bills: [
      { id: 1, customer: 'John Doe', amount: 1500, date: '2024-08-12' },
      { id: 2, customer: 'Jane Doe', amount: 1200, date: '2024-08-14' },
    ],
    products: [
      { id: 1, productName: 'Laptop', stock: 10, sold: 5, date: '2024-08-12' },
      { id: 2, productName: 'Phone', stock: 20, sold: 15, date: '2024-08-14' },
    ],
  };

  const handleFilter = () => {
    const filtered = reportData[activeReport].filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate >= dateRange[0].startDate && itemDate <= dateRange[0].endDate
      );
    });
    setFilteredData(filtered);
    setOpenDatePickerModal(false); // Close modal after applying filter
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  // Function to export data as Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, `${activeReport}_report.xlsx`);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Reports Dashboard
      </Typography>

      {/* Report Type Selection */}
      <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4} md={3}>
          <Card
            variant={activeReport === 'sales' ? 'elevation' : 'outlined'}
            sx={{ cursor: 'pointer' }}
            onClick={() => setActiveReport('sales')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Sales Report
              </Typography>
              <Divider />
              <Typography sx={{ marginTop: '10px' }}>
                View and export sales data.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Card
            variant={activeReport === 'bills' ? 'elevation' : 'outlined'}
            sx={{ cursor: 'pointer' }}
            onClick={() => setActiveReport('bills')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Bills Report
              </Typography>
              <Divider />
              <Typography sx={{ marginTop: '10px' }}>
                View and export bills data.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Card
            variant={activeReport === 'products' ? 'elevation' : 'outlined'}
            sx={{ cursor: 'pointer' }}
            onClick={() => setActiveReport('products')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Products Report
              </Typography>
              <Divider />
              <Typography sx={{ marginTop: '10px' }}>
                View and export products data.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Date Range Picker Modal */}
      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button
          variant="outlined"
          onClick={() => setOpenDatePickerModal(true)}
          sx={{ fontSize: '16px', padding: '10px 20px' }}
        >
          Select Date Range
        </Button>
      </Box>

      <Dialog
        open={openDatePickerModal}
        onClose={() => setOpenDatePickerModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Select Date Range</DialogTitle>
        <DialogContent>
          <DateRangePicker ranges={dateRange} onChange={handleDateRangeChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDatePickerModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFilter} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Export Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }}>
          <CSVLink
            data={filteredData}
            filename={`${activeReport}_report.csv`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Export CSV
          </CSVLink>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          sx={{ padding: '10px 20px' }}
        >
          Export Excel
        </Button>
      </Box>

      {/* Report Table */}
      <TableContainer component={Paper} sx={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#3f51b5', color: 'white' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              {activeReport === 'sales' && (
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              )}
              {activeReport === 'bills' && (
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
              )}
              {activeReport === 'products' && (
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
              )}
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {activeReport === 'products' ? 'Stock' : activeReport === 'sales' ? 'Sales' : 'Amount'}
              </TableCell>
              {activeReport === 'products' && (
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sold</TableCell>
              )}
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f0f0f0' } }}>
                  <TableCell>{row.id}</TableCell>
                  {activeReport === 'sales' && <TableCell>{row.name}</TableCell>}
                  {activeReport === 'bills' && <TableCell>{row.customer}</TableCell>}
                  {activeReport === 'products' && <TableCell>{row.productName}</TableCell>}
                  <TableCell>{activeReport === 'products' ? row.stock : row.sales || row.amount}</TableCell>
                  {activeReport === 'products' && <TableCell>{row.sold}</TableCell>}
                  <TableCell>{format(new Date(row.date), 'yyyy-MM-dd')}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                  No data available for selected date range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportPage;
