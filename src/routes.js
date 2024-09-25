import React, { Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/login/login";
import PublicRoutes from "./layout/publicRoutes";
import MainLayout from "./layout/mainLayout";
import { Dashboard } from "./pages/dashboard/Dashboard";

import Sales from "./pages/sales/Sales";
import Reports from "./pages/reports/Reports";
import Customers from "./pages/customers/Customers";
import CustomerDetails from "./pages/customers/customerDetails";
// import AddNewProduct from "./pages/inventory/AddNewProduct";
import ViewNotification from "./pages/Notification/ViewNotification";
import Profile from "./pages/profile/profile";
import Registration from "./pages/registration/registration";
import CreateBill from "./pages/createBill/CreateBill";
import Bills from "./pages/bills/bills";
import Inventory from "./pages/products/Products";
import PurchaseBill from "./pages/products/PurchaseBill";
import Configuration from "./pages/configuration/Configuration";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/create-bill",
        element: <CreateBill />,
      },

      {
        path: "/sales",
        element: <Sales />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/customers/:customers_id",
        element: <CustomerDetails />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/bills",
        element: <Bills />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/purchase-bill",
        element: <PurchaseBill />,
      },
      {
        path: "/configuration",
        element: <Configuration />,
      },
      {
        path: "/notification/:id",
        element: <ViewNotification />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default Routes;
