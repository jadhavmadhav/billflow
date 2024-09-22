import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../layout/PageLayout";
import ShowProducts from "./ShowProducts";
import AddNewProduct from "./AddNewProduct";
import { getAllProduct } from "../../services/productsServices";
import { Tabs, Tab, CircularProgress, Box } from "@mui/material";

const Inventory = () => {
  const [isActiveTab, setIsActiveTab] = useState("products_list");
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setIsActiveTab(newValue);
  };

  const productDetailsApi = async () => {
    setIsLoading(true);
    try {
      const request = await getAllProduct(localStorage.getItem("enterpriseId"));
      if (request.status === 200) {
        setProductList(request.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    productDetailsApi();
  }, []);

  return (
    <PageLayout>
      <Box className="flex flex-col h-full gap-[20px] p-2">
        {/* Tabs for switching between views */}
        <Tabs
          value={isActiveTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Product List" value="products_list" />
          <Tab label="Add New Product" value="add_new_products" />
        </Tabs>

        <Box className="flex-1">
          {/* Loading Spinner */}
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {["products_list"].includes(isActiveTab) && (
                <ShowProducts
                  productList={productList}
                  productDetailsApi={productDetailsApi}
                />
              )}

              {isActiveTab === "add_new_products" && <AddNewProduct />}
            </>
          )}
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Inventory;
