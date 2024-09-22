import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./routes";
import { useEffect, useState } from "react";
import useToast from "./hooks/useToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { showToast } = useToast();

  localStorage.setItem("host", "mtech");
  localStorage.setItem("branch", "test");
  localStorage.setItem("subBranch", "");
  localStorage.setItem("userId", "madhav145255");

  localStorage.setItem("enterpriseId", "66dbfa49486d811da42ac3f0");

  localStorage.setItem("organizationId", "65a3ba18b54c47a8470cb244");
  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
