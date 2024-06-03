import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import AllArticles from "../pages/AllArticles";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ArticleDetails from "../pages/ArticleDetails";
import MyProfile from "../pages/MyProfile";
import AddArticle from "../pages/AddArticle";

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
        path: "/add-articles",
        element: <AddArticle />,
      },
      {
        path: "/my-profile",
        element: <MyProfile />,
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
