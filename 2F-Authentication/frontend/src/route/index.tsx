// src/routes/index.js
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App";
import Loading from "../components/common/Loading";
import Dashboard from "../components/dashboard";
import FormComponent from "../components/form/index";
import ProtectedRoute from "./ProtectedRoute";
import { EditItem } from "../components/dataTable/EditItem";
// import Cookies from 'js-cookie';
const DataTable = lazy(() => import("../components/dataTable"));
const Login = lazy(() => import("../components/login"));
const Signup = lazy(() => import("../components/login/subComponents/Signup"));
const ForgotPassword = lazy(
  () => import("../components/login/subComponents/ForgotPassword")
);
const ResetPassword = lazy(() => import("../components/login/subComponents/ResetPassword"));
const VerifyUser = lazy(() => import("../components/login/subComponents/VerifyUser"));

const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
}

const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => {
  return (
    <>
      <App />
      {/* <Outlet /> */}
    </>
  )
}

const appRouter: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <FormComponent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/table",
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Suspense fallback={<Loading />}>
              <DataTable />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/editItem/:id",
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Suspense fallback={<Loading />}>
              <EditItem />
            </Suspense>
          </ProtectedRoute>
        ),
      }
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<Loading />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<Loading />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/verify-user",
    element: (
      <Suspense fallback={<Loading />}>
        <VerifyUser />
      </Suspense>
    ),
  }
];

const router = createBrowserRouter(appRouter);

export default router;
