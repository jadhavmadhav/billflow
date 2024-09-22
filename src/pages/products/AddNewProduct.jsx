import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AutocompleteComponent from "../../components/AutocompleteComponent";
import { createNewProduct } from "../../services/productsServices";
import useToast from "../../hooks/useToast";
// import { saveAs } from "file-saver";

// Configuration for fields and their types
const fieldConfig = [
  { label: "Product Name", name: "productName", type: "text", required: true },
  { label: "Company", name: "companyName", type: "text", required: true },
  { label: "HSN Code", name: "hsnCode", type: "text", required: true },
  { label: "GST %", name: "gst", type: "number", required: true },
  { label: "Buying Price", name: "buyingPrice", type: "number", required: true },
  { label: "Selling Price", name: "sellingPrice", type: "number", required: true },
  { label: "Quantity", name: "quantity", type: "number", required: true },
  { label: "Seller Name", name: "companySellerName", type: "text", required: true },
  { label: "Labour Cost", name: "labourCost", type: "number", required: true },
  { label: "Transport Rent", name: "transportRent", type: "number", required: true },
  { label: "Other", name: "other", type: "text" },
  { label: "Measurement", name: "measurement", type: "select", options: ["liter", "item", "kg", "length"], required: true },
  { label: "Is Perishable?", name: "isPerishable", type: "checkbox" }
];

const templateUrl = "/path/to/template.csv"; // Adjust the path to your template file

const AddNewProduct = () => {
  const [productObj, setProductObj] = useState({});
  const [selectedValue, setSelectedValue] = useState("item");

  const { showToast } = useToast();
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductObj((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCancel = () => {
    setProductObj({});
    setSelectedValue("item");
  };

  const handleAddProduct = async () => {
    try {
      const response = await createNewProduct({ ...productObj, userId, measurement: selectedValue });
      if (response.data.status === 200) {
        setProductObj({});
        setSelectedValue("item");
        showToast(response.data.message, "success");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Implement your logic to handle .svc file upload
      console.log("File selected:", file.name);
    }
  };

  const handleDownloadTemplate = () => {
    // saveAs(templateUrl, "product-template.csv");
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <TextField
            fullWidth
            required={field.required}
            label={field.label}
            name={field.name}
            type={field.type}
            value={productObj[field.name] || ""}
            onChange={handleChange}
            placeholder={`Enter ${field.label}`}
          />
        );
      case "select":
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={productObj[field.name] || ""}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Checkbox
                name={field.name}
                checked={productObj[field.name] || false}
                onChange={handleChange}
              />
            }
            label={field.label}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom>Add New Product</Typography>
      
      {/* Buttons for File Upload and Template Download */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Button variant="outlined" component="label">
          Upload .svc File
          <input
            type="file"
            accept=".svc"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
        <Button variant="outlined" color="info" onClick={handleDownloadTemplate}>
          Download Template
        </Button>
      </div>

      {/* Form Fields */}
      <Grid container spacing={3}>
        {fieldConfig.map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>

      {/* Action Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add
        </Button>
      </div>
    </Paper>
  );
};

export default AddNewProduct;
