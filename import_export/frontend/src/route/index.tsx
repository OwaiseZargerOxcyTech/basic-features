// src/routes/index.js
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App";
import Loading from "../components/common/Loading";
import Dashboard from "../components/dashboard";
import FormComponent from "../components/form/index";
import AddForm from "../components/feature/AddForm";
import AllData from "../components/feature/AllData";
import UploadFile from "../components/feature/UploadFile";
const DataTable = lazy(() => import("../components/dataTable"));
const Login = lazy(() => import("../components/login"));
const Signup = lazy(() => import("../components/login/subComponents/Signup"));
const ForgotPassword = lazy(
  () => import("../components/login/subComponents/ForgotPassword")
);
const ResetPassword = lazy(() => import("../components/login/subComponents/ResetPassword"));
const VerifyUser = lazy(() => import("../components/login/subComponents/VerifyUser"));

const appRouter: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FormComponent />,
      },

      {
        path: "/table",
        element: (
          <Suspense fallback={<Loading />}>
            <DataTable />
          </Suspense>
        ),
      },
      {
        path: "/table",
        element: (
          <Suspense fallback={<Loading />}>
            <DataTable />
          </Suspense>
        ),
      },
      {
        path: "/feature-add-data",
        element: (
          <Suspense fallback={<Loading />}>
            <AddForm />
          </Suspense>
        ),
      },{
        path: "/download-data",
        element: (
          <Suspense fallback={<Loading />}>
            <AllData />
          </Suspense>
        ),
      },
      {
        path: "/file-upload",
        element: (
          <Suspense fallback={<Loading />}>
            <UploadFile />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element:<Dashboard />,
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
