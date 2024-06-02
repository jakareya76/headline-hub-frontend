import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/routes.jsx";
import NewsProvider from "./context/NewsProvider.jsx";

import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import "swiper/css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NewsProvider>
        <RouterProvider router={routes} />
      </NewsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
