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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";
import { createNewProduct } from "../../services/productsServices";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";

const PurchaseBill = () => {
  const [productObj, setProductObj] = useState({});
  const [productsList, setProductsList] = useState([]);
  const [sellerDetails, setSellerDetails] = useState({});
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const extraFieldsForProduct = useSelector(
    (state) => state?.enterpriseDetails?.extraFieldsForProduct
  );

  // Handle product field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductObj((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle seller field changes
  const handleSellerChange = (e) => {
    const { name, value } = e.target;
    setSellerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate required fields
  const validateFields = (obj, fields) => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !obj[field.field]) {
        newErrors[field.field] = `${field.label} is required`;
      }
    });
    return newErrors;
  };

  // Add product to list
  const handleAddProduct = () => {
    const productErrors = validateFields(productObj, extraFieldsForProduct);
    if (Object.keys(productErrors).length > 0) {
      setErrors(productErrors);
      return;
    }
    setProductsList((prevList) => [...prevList, productObj]);
    setProductObj({});
    setErrors({});
  };

  // Remove product from list
  const handleRemoveProduct = (index) => {
    setProductsList((prevList) => prevList.filter((_, i) => i !== index));
  };

  // Submit the final purchase bill
  const handleSubmitBill = async () => {
    const sellerErrors = validateFields(sellerDetails, [
      { field: "sellerName", label: "Seller Name", required: true },
      { field: "sellerContact", label: "Seller Contact", required: true },
    ]);
    if (Object.keys(sellerErrors).length > 0 || productsList.length === 0) {
      setErrors(sellerErrors);
      if (productsList.length === 0) showToast("At least one product is required", "error");
      return;
    }

    const billData = {
      sellerDetails,
      products: productsList,
    };

    try {
      const response = await createNewProduct(billData); // Modify this to create a bill
      if (response.status === 200) {
        setSellerDetails({});
        setProductsList([]);
        showToast("Purchase bill created successfully", "success");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // Render different field types
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <TextField
            fullWidth
            required={field.required}
            label={field.label}
            name={field.field}
            type={field.type}
            value={productObj[field.field] || ""}
            onChange={handleChange}
            placeholder={`Enter ${field.label}`}
            error={!!errors[field.field]}
            helperText={errors[field.field]}
          />
        );
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
            error={!!errors[field.field]}
            helperText={errors[field.field]}
          />
        );
      case "dropdown":
        return (
          <FormControl fullWidth required={field.required} error={!!errors[field.field]}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.field}
              value={productObj[field.field] || ""}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {errors[field.field] && (
              <Typography color="error" variant="caption">
                {errors[field.field]}
              </Typography>
            )}
          </FormControl>
        );
      case "boolean":
        return (
          <FormControlLabel
            control={
              <Checkbox
                name={field.field}
                checked={productObj[field.field] || false}
                onChange={handleChange}
              />
            }
            label={field.label}
            error={!!errors[field.field]}
          />
        );
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
            error={!!errors[field.field]}
            helperText={errors[field.field]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        position: "relative",
        minHeight: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flex: "1", flexDirection: "column" }}>
        {/* Seller Details */}
        <Typography variant="h6" gutterBottom>
          Seller Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Seller Name"
              name="sellerName"
              value={sellerDetails.sellerName || ""}
              onChange={handleSellerChange}
              error={!!errors.sellerName}
              helperText={errors.sellerName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Seller Contact"
              name="sellerContact"
              value={sellerDetails.sellerContact || ""}
              onChange={handleSellerChange}
              error={!!errors.sellerContact}
              helperText={errors.sellerContact}
            />
          </Grid>
        </Grid>

        {/* Product Form */}
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {extraFieldsForProduct?.map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field.field}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>

        {/* Add Product Button */}
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>

        {/* Display Added Products in a Scrollable Table */}
        {productsList.length > 0 && (
          <div
            style={{ marginTop: "20px", maxHeight: "300px", overflowY: "auto" }}
          >
            <Typography variant="h6" gutterBottom>
              Added Products
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsList.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {product.name || `Product ${index + 1}`}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveProduct(index)}
                      >
                        <MdDeleteSweep />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleSubmitBill}>
          Submit Bill
        </Button>
      </div>
    </div>
  );
};

export default PurchaseBill;
