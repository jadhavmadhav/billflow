<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
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
<<<<<<< HEAD
import { createNewProduct } from "../../services/productsServices";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";

const AddNewProduct = () => {
  const [productObj, setProductObj] = useState({});
  const { showToast } = useToast();
  const enterpriseId = localStorage.getItem("enterpriseId");

  // Fetching extra fields from Redux
  const extraFieldsForProduct = useSelector(
    (state) => state?.enterpriseDetails?.extraFieldsForProduct
  );

  // Reset the form
  const handleCancel = () => {
    setProductObj({});
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      const response = await createNewProduct({
        ...productObj,
        enterpriseId: localStorage.getItem("enterprise_id"),
      });
    
      if (response.status === 200) {
        setProductObj({});
        showToast(response.message, "success");
      } else {
        throw new Error(response.message);
=======
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
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };
<<<<<<< HEAD
  // Add new product
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue;
    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      // Ensure that value is converted to a number but allow empty input for better UX
      newValue = value === "" ? "" : +value;
    } else {
      newValue = value;
    }

    setProductObj((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Render different field types
=======

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

>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <TextField
            fullWidth
            required={field.required}
            label={field.label}
<<<<<<< HEAD
            name={field.field}
            type={field.type}
            value={productObj[field.field] || ""}
=======
            name={field.name}
            type={field.type}
            value={productObj[field.name] || ""}
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
            onChange={handleChange}
            placeholder={`Enter ${field.label}`}
          />
        );
<<<<<<< HEAD
      case "textarea":
        return (
          <TextField
            fullWidth
            multiline
            required={field.required}
            label={field.label}
            name={field.field}
            value={productObj[field.field] || ""}
            onChange={handleChange}
            placeholder={`Enter ${field.label}`}
          />
        );
      case "dropdown":
=======
      case "select":
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel>{field.label}</InputLabel>
            <Select
<<<<<<< HEAD
              name={field.field}
              value={productObj[field.field] || ""}
=======
              name={field.name}
              value={productObj[field.name] || ""}
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
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
<<<<<<< HEAD
      case "boolean":
=======
      case "checkbox":
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
        return (
          <FormControlLabel
            control={
              <Checkbox
<<<<<<< HEAD
                name={field.field}
                checked={productObj[field.field] || false}
=======
                name={field.name}
                checked={productObj[field.name] || false}
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
                onChange={handleChange}
              />
            }
            label={field.label}
          />
        );
<<<<<<< HEAD
      case "date":
        return (
          <TextField
            fullWidth
            required={field.required}
            label={field.label}
            name={field.field}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={productObj[field.field] || ""}
            onChange={handleChange}
          />
        );
=======
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
      default:
        return null;
    }
  };

  return (
<<<<<<< HEAD
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "8px" }}>
      <Typography variant="h6" gutterBottom>
        Add New Product
      </Typography>

      <Grid container spacing={2}>
        {extraFieldsForProduct?.map((field) => (
          <Grid item xs={12} sm={6} md={4} key={field.field}>
=======
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
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
            {renderField(field)}
          </Grid>
        ))}
      </Grid>

<<<<<<< HEAD
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
=======
      {/* Action Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add
        </Button>
>>>>>>> 16d91b5135bb711fec28b178af2ec99bf78a5ec4
      </div>
    </Paper>
  );
};

export default AddNewProduct;
