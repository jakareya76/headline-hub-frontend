import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import AllArticles from "../pages/AllArticles";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ArticleDetails from "../pages/ArticleDetails";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/all-articles",
        element: <AllArticles />,
      },
      {
        path: "/news/:id",
        element: <ArticleDetails />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
