import React, { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerCard from "../../components/customerCard";
import {
  DeleteBillById,
  getAllBillsOfCustomer,
} from "../../services/billServices";
import moment from "moment";
import useToast from "../../hooks/useToast";
import ConformationPrompt from "../../components/conformationPrompt";
import { CheckIcon, DeleteIcon, EditIcon, PendingIcon } from "../../util/icons";

// MUI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { DateFormatter } from "../../util/formats";
// import './CustomerDetails.css'; // CSS file for sticky header

const CustomerDetails = () => {
  const [billItems, setBillItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [isConformation, setIsConformation] = useState({
    billId: null,
    isOpen: false,
  });
  const { showToast } = useToast();
  const customers_id = useParams()?.customers_id;
  const navigate = useNavigate();

  // Handle bill deletion
  const handleDeleteBill = async (billId) => {
    try {
      const request = await DeleteBillById(billId);
      const response = request.data;

      if (response.status === 200) {
        showToast(response.message, "success");
        setIsConformation({ isOpen: false });
        getBillsData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsConformation({ isOpen: false });
    }
  };

  const handleEditBill = (billId) => {
    navigate(`/create-bill`, { state: { billId } });
  };

  const handleCreateNewBill = () => {
    navigate(`/create-bill`, {
      state: { customerId: customers_id },
    });
  };

  const getBillsData = async () => {
    try {
      const response = await getAllBillsOfCustomer(customers_id);

      if (response.status === 200) { 
        setBillItems(response.result?.bills);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBillsData();
  }, [customers_id]);

  return (
    <>
      <div className="flex flex-col h-[100%] gap-3 px-[16px]">
        <div>
          {/* <CustomerCard data={customerDetails ?? {}} /> */}
          <div className="flex pt-4 justify-end gap-8">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateNewBill}
            >
              Create New Bill
            </Button>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="bills table">
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Billing Date</TableCell>
                <TableCell>Bill Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billItems?.map((item, index) => {
                const { _id, date, totalAmount, status, items } = item;
                const billDate = DateFormatter(date);

                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {items?.map((i, idx) => (
                        <span key={idx}>
                          {i?.item}
                          {idx < items.length - 1 && ", "}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>{billDate}</TableCell>
                    <TableCell>{totalAmount}</TableCell>
                    <TableCell>
                      {status === "paid" ? (
                        <CheckIcon color="#20c06d" fontSize={"25px"} />
                      ) : (
                        <PendingIcon color="red" fontSize={"25px"} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleEditBill(_id)}
                        startIcon={<EditIcon />}
                        color="primary"
                        variant="text"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          setIsConformation({ billId: _id, isOpen: true })
                        }
                        startIcon={<DeleteIcon color="error" />}
                        color="error"
                        variant="text"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Confirmation Modal */}
      {isConformation.isOpen && (
        <ConformationPrompt
          handleOk={() => handleDeleteBill(isConformation.billId)}
          handleCancel={() =>
            setIsConformation({ ...isConformation, isOpen: false })
          }
          header="Delete Bill"
        >
          <h6 className="text-[18px]">
            Are you sure you want to delete this bill?
          </h6>
          <p className="text-[14px] text-gray-600">
            This action cannot be undone.
          </p>
        </ConformationPrompt>
      )}
    </>
  );
};

export default memo(CustomerDetails);
