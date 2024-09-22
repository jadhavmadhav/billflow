import { TextField } from "@mui/material";
import React from "react";

const TextField_Render = (props) => {
  const { label, name, required, isMask } = props;
  const inputProps = { style: { fontSize: "20px" } };

  return (
    <TextField
      //   size="small"
      fullWidth
      required={required ? true : false}
      label={label}
      name={name}
      type={isMask ? "password" : ""}
      InputProps={inputProps}
    />
  );
};

export default TextField_Render;
