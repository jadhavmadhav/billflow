import * as React from "react";
import { TextField } from "@mui/material";

export default function SearchField({ setValue, label }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const delaySearch = setTimeout(() => {
      // Execute your search function here
      //   console.log("Searching for:", searchTerm);
      setValue(searchTerm);
    }, 500); // Adjust the delay time as needed (e.g., 500 milliseconds)

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div style={{ width: "100%" }}>
      <TextField
        className="w-[100%] "
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
