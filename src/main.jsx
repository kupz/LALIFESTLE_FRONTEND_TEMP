import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from "./pages/Authpage/LoginPage.jsx";
// import Authenticateuser from "./pages/HOC/Authenticateuser.jsx";
import Dashboard from "./pages/dashboard/index.jsx";
import OverviewPage from "./pages/dashboard/overview/index.jsx";
import DeliveryPage from "./pages/dashboard/delivery/index.jsx";
import CreateTransactionPage from "./pages/dashboard/createTransaction/index.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },  
  {
    path: "/",
    element:<Dashboard />,
    children: [
      {
        path: '',
        element: <OverviewPage />
      },
      {
        path: '/delivery',
        element: <DeliveryPage />
      },
      {
        path: '/createtransaction',
        element: <CreateTransactionPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
