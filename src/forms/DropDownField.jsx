import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";

const DropDownField = (props) => {
  const { setSelectedValue, selectedValue, label, option } = props;
  return (
    <div>
      <Autocomplete
        // size="small"
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
    </div>
  );
};

export default DropDownField;
