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
        path: "/products",
        element: <Products />,
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
  </QueryClientProvider>
);
