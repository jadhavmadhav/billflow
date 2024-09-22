import React from "react";
import { Button } from "@mui/material";

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex justify-between mt-4 p-4 border-t bg-gray-100">
      <Button
        variant="contained"
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="contained"
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
