import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Authpage/LoginPage.jsx";
// import Authenticateuser from "./pages/HOC/Authenticateuser.jsx";
import Dashboard from "./pages/dashboard/index.jsx";
import OverviewPage from "./pages/dashboard/overview/index.jsx";
import DeliveryPage from "./pages/dashboard/delivery/index.jsx";
import CreateTransactionPage from "./pages/dashboard/createTransaction/index.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRouteHOC from "./pages/HOC/PrivateRouteHOC.jsx";
import Products from "./pages/dashboard/products/index.jsx";
import Stores from "./pages/dashboard/stores/index.jsx";
import Brands from "./pages/dashboard/brands/index.jsx";
import Stocks from "./pages/dashboard/stocks/Stocks.jsx";
import Reworks from "./pages/dashboard/stocks/Reworks.jsx";
import Disposals from "./pages/dashboard/stocks/Disposals.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const PrivateRoute = PrivateRouteHOC(Dashboard);

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <OverviewPage />,
      },
      {
        path: "/delivery",
        element: <DeliveryPage />,
      },
      {
        path: "/createtransaction",
        element: <CreateTransactionPage />,
      },
      {
        path: "/stocks",
        element: <Stocks />,
      },
      {
        path: "/reworks",
        element: <Reworks />,
      },
      {
        path: "/disposals",
        element: <Disposals />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/stores",
        element: <Stores />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    <ToastContainer />
  </QueryClientProvider>
);
