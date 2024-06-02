import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/routes.jsx";
import { ToastContainer } from "react-toastify";

import NewsProvider from "./context/NewsProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NewsProvider>
        <AuthProvider>
          <RouterProvider router={routes} />
          <ToastContainer />
        </AuthProvider>
      </NewsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
