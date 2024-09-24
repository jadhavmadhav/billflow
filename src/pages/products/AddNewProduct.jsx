import React, { useCallback, useEffect, useState } from "react";
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
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };
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
          />
        );
      case "dropdown":
        return (
          <FormControl fullWidth required={field.required}>
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
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "8px" }}>
      <Typography variant="h6" gutterBottom>
        Add New Product
      </Typography>

      <Grid container spacing={2}>
        {extraFieldsForProduct?.map((field) => (
          <Grid item xs={12} sm={6} md={4} key={field.field}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Paper>
  );
};

export default AddNewProduct;
