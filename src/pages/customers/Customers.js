import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { FaTrashAlt, FaEye } from "react-icons/fa"; // Importing icons from react-icons
import {
  DeleteCustomerById,
  getAllCustomers,
} from "../../services/customerServices";
import useToast from "../../hooks/useToast";
import PageLayout from "../../layout/PageLayout";

const Customers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cardData, setCardData] = useState([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const getAllCustomersData = async () => {
    try {
      const request = await getAllCustomers(searchValue);
      if (request.status === 200) {
        setCardData(request.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const request = await DeleteCustomerById(id);
      if (request.status === 200) {
        showToast(request.message, "success");
        getAllCustomersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomersData();
  }, [searchValue]);

  return (
    <PageLayout label={"Customers"}>
      <div className="flex flex-col h-[100%] gap-10">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardData?.map((i, index) => {
                const { _id, name, address, mobileNumber } = i;
                return (
                  <TableRow key={_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{mobileNumber}</TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell>
                      {/* Flex container for action buttons */}
                      <div className="flex justify-center items-center space-x-4">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            navigate(`/customers/${_id}`);
                          }}
                        >
                          <FaEye />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            deleteCustomer(_id);
                          }}
                        >
                          <FaTrashAlt />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </PageLayout>
  );
};

export default Customers;
