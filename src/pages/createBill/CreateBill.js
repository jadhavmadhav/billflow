import React, { memo, useEffect, useMemo } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react";
import {
  UpdateCustomer,
  getCustomerById,
} from "../../services/customerServices";
import axios from "axios";
import { baseURL } from "../../AxiosInstance";
import { json, useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllProductsForBilling } from "../../services/productsServices";
import useToast from "../../hooks/useToast";
import {
  UpdateBill,
  createNewBill,
  getBillByBillId,
} from "../../services/billServices";
import ConformationPrompt from "../../components/conformationPrompt";
import PageLayout from "../../layout/PageLayout";

const CreateBill = () => {
  const [productList, setProductList] = useState([]);
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [payStatus, setPayStatus] = useState("paid");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [billDetails, setBillDetails] = useState({});
  const [customerInfo, setCustomerInfo] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [isConformation, setIsConformation] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();
  const bill_number = useLocation()?.state?.billId;
  const customerId = useLocation()?.state?.customerId;

  let GrandTotal = 0;

  const handleAddNew = () => {
    try {
      if (!customerInfo.name) {
        throw new Error("Please enter customer name");
      }
      if (!customerInfo.mobileNumber) {
        throw new Error("Please enter customer mobile number");
      }
      if (!customerInfo.address) {
        throw new Error("Please enter customer address");
      }
      if (!selectedProduct.item) {
        throw new Error("Please choose a product");
      }
      if (!selectedProduct.quantity) {
        throw new Error("Please enter quantity for selected product");
      }
      setSelectedProductList([...selectedProductList, selectedProduct]);
      setSelectedProduct({});
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (e) {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  // Example usage
  const debouncedFunc = debounce((e) => {
    console.log("Function debounced", e);
  }, 1000);

  const handleDeleteItem = (index) => {
    const Result = selectedProductList.filter((item, ind) => ind !== index);
    setSelectedProductList(Result);
  };

  const handleChange = (event, newValue) => {
    setSelectedProduct({ ...selectedProduct, ...newValue });
  };

  const handleChangeCustomerInfo = (e) => {
    if (e.target.name == "name") {
      console.log("call");
      debouncedFunc(e.target.value);
    }
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  // ------- API's -----------------------

  const createNewBillApi = async (data) => {
    try {
      const response = await createNewBill(data);

      if (response.status == 200) {
        setSelectedProductList([]);
        setCustomerInfo({});
        showToast(response.message, "success");
        navigate(`/customers/${response.result.customerId}`);
      }
      if (response.status == 201) {
        showToast(response.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const productDetailsApi = async () => {
    try {
      const request = await getAllProductsForBilling(
        localStorage.getItem("enterpriseId")
      );
      setProductList(request.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productDetailsApi();
  }, []);

  const handleCreateCustomer = async () => {
    try {
      const formData = new FormData();
      formData.append("image", profileImage);
      formData.append("name", customerInfo?.name);
      formData.append("address", customerInfo?.address);
      formData.append("mobileNumber", customerInfo?.mobileNumber);
      formData.append("enterpriseId", localStorage.getItem("enterpriseId"));

      const request = await axios.post(`${baseURL}/customer`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await request.data;
      if (response.status === 200) {
        const customer = response?.result;
        const customerId = response?.result?._id;
        customerId &&
          createNewBillApi({
            customerId,
            customerName: customer.name,
            customerAddress: customer.address,
            mobileNumber: customer.mobileNumber,
            items: selectedProductList,
            status: payStatus,
            enterpriseId: localStorage.getItem("enterpriseId"),
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedProduct);
  const handleIsBillStatus = (e) => {
    setPayStatus(e.target.value);
  };

  const handleOkConformation = () => {
    if (!payStatus || payStatus == undefined) {
      showToast("Please select at least one payment option !", "error");
    } else {
      setIsConformation(false);
      bill_number ? handleUpdateCustomer() : handleCreateCustomer();
    }
  };
  const handleUpdateCustomer = async () => {
    try {
      const response = await UpdateCustomer(customerInfo);

      if (response.status == 200) {
        handleUpdateBill();
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateBill = async () => {
    try {
      const response = await UpdateBill({
        ...billDetails,
        customerName: customerInfo.name,
        customerAddress: customerInfo.address,
        mobileNumber: customerInfo.mobileNumber,
        items: selectedProductList,
        status: payStatus,
        updatedDate: new Date(),
        isUpdate: true,
      });
      // const response = await request.data;
      if (response.status == 200) {
        navigate(-1);
      }
    } catch (error) {}
  };

  const findBill = async () => {
    try {
      const response = await getBillByBillId(bill_number);
      if (response.status == 200) {
        setSelectedProductList(response.result.items);
        setPayStatus(response.result.status);
        setCustomerInfo({
          _id: response.result.customerId,
          name: response.result.customerName,
          mobileNumber: response.result.mobileNumber,
          address: response.result.customerAddress,
        });
        setBillDetails(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findCustomer = async () => {
    try {
      const response = await getCustomerById(customerId);

      if (response.status == 200) {
        setCustomerInfo({
          ...response.result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect
  useMemo(() => {
    customerId && findCustomer();
  }, [customerId]);

  useMemo(() => {
    bill_number && findBill();
  }, [bill_number]);

  return (
    <PageLayout
      label={"Create Bill"}
      Footer={Footer(
        bill_number,
        navigate,
        selectedProductList,
        setIsConformation
      )}
    >
      <div className="h-[100%] flex flex-col ">
        <div>
          <div className="flex py-5 gap-5">
            <TextField
              fullWidth
              required
              size="small"
              id="outlined-required"
              label="First Name"
              name="name"
              value={customerInfo?.name || ""}
              onChange={handleChangeCustomerInfo}
              InputProps={{
                style: {
                  fontSize: "18px",
                },
              }}
              InputLabelProps={{
                style: { fontSize: "18px" },
              }}
            />

            <TextField
              fullWidth
              required
              size="small"
              id="outlined-required"
              label="Mobile Number"
              name="mobileNumber"
              value={customerInfo?.mobileNumber || ""}
              onChange={handleChangeCustomerInfo}
              InputProps={{
                style: {
                  fontSize: "18px",
                },
              }}
              InputLabelProps={{
                style: { fontSize: "18px" },
              }}
            />
            <TextField
              fullWidth
              required
              size="small"
              id="outlined-required"
              label="Address"
              name="address"
              value={customerInfo?.address || ""}
              onChange={handleChangeCustomerInfo}
              InputProps={{
                style: {
                  fontSize: "18px",
                },
              }}
              InputLabelProps={{
                style: { fontSize: "18px" },
              }}
            />
          </div>

          <hr className="opacity-20" />

          <div className="py-5 flex gap-5">
            <div className="w-[50%]">
              <Autocomplete
                id="combo-box-demo"
                sx={{ width: "100%" }}
                size="small"
                value={selectedProduct.item ?? ""}
                options={productList}
                onChange={handleChange}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.item}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a product"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </div>

            <div className="w-[30%]">
              <TextField
                required
                size="small"
                sx={{ width: "100%" }}
                id="outlined-required"
                label="Quantity"
                type="number"
                name="quantity"
                value={selectedProduct?.quantity || ""}
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: e.target.value,
                  });
                }}
              />
            </div>

            <div className="w-[20%] flex justify-center items-center">
              <Button
                className="cta-btn-pulse"
                variant="contained"
                color="primary"
                onClick={handleAddNew}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* <hr className="opacity-80" /> */}

        <div className="py-8 flex-1">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="product table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>HSN Code</TableCell>
                  <TableCell>GST(%)</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProductList?.map((product, index) => {
                  GrandTotal += product.quantity * product.sellingPrice;
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{product.item}</TableCell>
                      <TableCell>{product.hsnCode}</TableCell>
                      <TableCell>{product.gst}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.sellingPrice}</TableCell>
                      <TableCell>
                        <RiDeleteBin5Fill
                          onClick={() => handleDeleteItem(index)}
                          style={{
                            cursor: "pointer",
                            fontSize: "24px",
                            color: "#f44336",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="h-[50px] ">
          {selectedProductList.length > 0 && (
            <div className="bg-brand p-3 flex justify-end border-[#8d8c8c] border-t-[2px]">
              <div className="flex gap-[100px] items-center">
                <h5 className="text-[18px] font-[500]">Total : </h5>
                <h5 className="text-[18px] font-[500]">
                  {GrandTotal.toFixed(2)}
                </h5>
              </div>
            </div>
          )}
        </div>

        <ConformationPrompt
          isOpen={isConformation}
          handleOk={handleOkConformation}
          handleCancel={() => setIsConformation(false)}
          header="Bill Payment Status"
        >
          <Typography variant="body1" sx={{ fontSize: "18px" }}>
            Has the bill payment been completed?
          </Typography>
          <div className="flex flex-col gap-1">
            <FormControlLabel
              control={<Checkbox checked={payStatus === "paid"} />}
              label="Paid"
              value="paid"
              onChange={handleIsBillStatus}
              sx={{ fontSize: "18px" }}
            />
            <FormControlLabel
              control={<Checkbox checked={payStatus === "pending"} />}
              label="Pending"
              value="pending"
              onChange={handleIsBillStatus}
              sx={{ fontSize: "18px" }}
            />
          </div>
        </ConformationPrompt>
      </div>
    </PageLayout>
  );
};

export default CreateBill;

const Footer = (
  bill_number,
  navigate,
  selectedProductList,
  setIsConformation
) => {
  return (
    <div className="h-[100%] py-3 px-10 flex gap-[25px] justify-end items-center shadow-modalShadow">
      <div>
        <Button
          className="cta-btn-pulse"
          variant="contained"
          color="primary"
          onClick={() => setIsConformation(true)}
          disabled={selectedProductList?.length > 0 ? false : true}
        >
          {bill_number ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
};
