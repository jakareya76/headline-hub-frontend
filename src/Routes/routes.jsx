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
import DashboardLayout from "../layouts/DashboardLayout";
import Admin from "../pages/Dashboard/Admin";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Subscription from "../pages/Subscription";
import PremiumArticles from "../pages/PremiumArticles";
import MyArticles from "../pages/MyArticles";
import AllUsers from "../pages/Dashboard/AllUsers";
import AddPublisher from "../pages/Dashboard/AddPublisher";
import ManageArticles from "../pages/Dashboard/ManageArticles";
import Payment from "../pages/Payment";

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
        element: (
          <PrivateRoute>
            <AddArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-articles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/premium-articles",
        element: (
          <PrivateRoute>
            <PremiumArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: <Payment />,
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-articles",
        element: (
          <AdminRoute>
            <ManageArticles />
          </AdminRoute>
        ),
      },
      {
        path: "add-publisher",
        element: (
          <AdminRoute>
            <AddPublisher />
          </AdminRoute>
        ),
      },
    ],
  },
]);
