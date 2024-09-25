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
import { createNewProduct } from "../../services/productsServices";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";

const AddNewProduct = () => {
  const [productObj, setProductObj] = useState({});
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const enterpriseId = localStorage.getItem("enterpriseId");

  // Fetching extra fields from Redux
  const extraFieldsForProduct = useSelector(
    (state) => state?.enterpriseDetails?.extraFieldsForProduct
  );

  // Reset the form
  const handleCancel = () => {
    setProductObj({});
    setErrors({});
  };

  // Validate required fields
  const validateFields = () => {
    const newErrors = {};
    extraFieldsForProduct?.forEach((field) => {
      // For checkboxes, false is a valid value unless it's required to be true
      if (field.required) {
        if (field.type === "boolean") {
          if (productObj[field.field] !== true) {
            newErrors[field.field] = `${field.label} must be checked`;
          }
        } else {
          if (
            productObj[field.field] === undefined ||
            productObj[field.field] === "" ||
            productObj[field.field] === null
          ) {
            newErrors[field.field] = `${field.label} is required`;
          }
        }
      }
    });
    return newErrors;
  };

  // Add new product with validation
  const handleAddProduct = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fill all required fields correctly.", "error");
      return;
    }

    try {
      const response = await createNewProduct({
        ...productObj,
        enterpriseId: localStorage.getItem("enterpriseId"),
      });

      if (response.status === 200) {
        setProductObj({});
        setErrors({});
        showToast(response.message, "success");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // Handle input changes and clear errors for the field
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

    // Clear the error for the field if it exists
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  // Render different field types with validation
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
              label={field.label}
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
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Paper>
  );
};

export default AddNewProduct;
