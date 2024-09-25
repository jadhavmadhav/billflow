import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

// Sample columns configuration
const columns = [
  { label: "Product Name", field: "productName" },
  { label: "Company", field: "companyName" },
  { label: "HSN Code", field: "hsnCode" },
  { label: "GST %", field: "gst" },
  { label: "Buying Price", field: "buyingPrice" },
  { label: "Selling Price", field: "sellingPrice" },
  { label: "Quantity", field: "quantity" },
  { label: "Seller Name", field: "companySellerName" },
  { label: "Labour Cost", field: "labourCost" },
  { label: "Transport Rent", field: "transportRent" },
];

const Configuration = () => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    // Initialize columns with default visibility and position
    const initialColumns = columns.map((col) => ({
      ...col,
      visible: false,
      position: null, // Initially no position assigned
    }));
    setSelectedColumns(initialColumns);
  }, []);

  const handleColumnChange = (index) => {
    setSelectedColumns((prev) => {
      let updatedColumns = [...prev];
      const column = updatedColumns[index];

      // Toggle visibility
      column.visible = !column.visible;

      // If the column is visible, assign the next available position
      if (column.visible) {
        column.position =
          updatedColumns.filter((col) => col.visible).length - 1;
      } else {
        // If it's being unchecked, reset the position and reassign the positions for the visible columns
        column.position = null;

        // Adjust the positions of the remaining visible columns
        updatedColumns = updatedColumns
          .filter((col) => col.visible)
          .map((col, idx) => ({ ...col, position: idx }));

        // Merge back with non-visible columns
        updatedColumns = [
          ...updatedColumns,
          ...prev.filter((col) => !col.visible),
        ];
      }

      return updatedColumns;
    });
  };

  const handleSaveConfig = () => {
    const visibleColumns = selectedColumns.filter((col) => col.visible);
    console.log("Saved Configuration:", visibleColumns);
  };

  return (
    <Box
      sx={{
        padding: 3,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Column Configuration
      </Typography>

      <Typography variant="body1" color="textSecondary" gutterBottom>
        Select the columns you wish to display. Positions will be updated
        automatically based on your selections. Click "Save Configuration" to
        apply changes.
      </Typography>

      {/* Product Configuration Section */}
      <Card variant="outlined" sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Product Configuration
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2}>
            {selectedColumns.map((col, index) => (
              <Grid item xs={12} sm={6} md={4} key={col.field}>
                <Box display="flex" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={col.visible}
                        onChange={() => handleColumnChange(index)}
                        color="primary"
                      />
                    }
                    label={col.label}
                  />
                  {col.visible && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ marginLeft: 2 }}
                    >
                      Position: {col.position}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Bill Configuration Section */}
      <Card variant="outlined" sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bill Configuration
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2}>
            {selectedColumns.map((col, index) => (
              <Grid item xs={12} sm={6} md={4} key={col.field}>
                <Box display="flex" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={col.visible}
                        onChange={() => handleColumnChange(index)}
                        color="primary"
                      />
                    }
                    label={col.label}
                  />
                  {col.visible && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ marginLeft: 2 }}
                    >
                      Position: {col.position}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: "10px 20px" }}
          onClick={handleSaveConfig}
        >
          Save Configuration
        </Button>
      </Box>
    </Box>
  );
};

export default Configuration;
