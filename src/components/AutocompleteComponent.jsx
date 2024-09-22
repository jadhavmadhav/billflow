import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";

const AutocompleteComponent = ({
  setSelectedValue,
  selectedValue,
  label,
  option,
}) => {
  const countries = [
    { item: "product-122", hsn_code: "1425", gst: "18%", price: 248 },
    { item: "product-16622", hsn_code: "1625", gst: "18%", price: 8100 },
    { item: "product-124", hsn_code: "1451", gst: "18%", price: 100 },
    { item: "product-125", hsn_code: "1457", gst: "18%", price: 140 },
    { item: "product-128", hsn_code: "1358", gst: "18%", price: 1400 },
    { item: "product-1222", hsn_code: "1822", gst: "18%", price: 811 },
  ];
  return (
    <Autocomplete
      id="product"
      value={selectedValue ?? ""}
      options={option ?? []}
      autoHighlight
      getOptionLabel={(option) => option}
      onChange={(event, newValue) => { 
        setSelectedValue(newValue);
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          //   size="small"
          label={label ?? ""}
          onChange={(e, newValue) => {
            console.log(e);
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default AutocompleteComponent;
