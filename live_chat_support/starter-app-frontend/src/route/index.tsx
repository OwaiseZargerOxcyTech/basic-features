import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App";
import Loading from "../components/common/Loading";
import Dashboard from "../components/dashboard";
import FormComponent from "../components/form/index";

const DataTable = lazy(() => import("../components/dataTable"));
const Login = lazy(() => import("../components/login"));
const Signup = lazy(() => import("../components/login/subComponents/Signup"));
const ForgotPassword = lazy(
  () => import("../components/login/subComponents/ForgotPassword")
);
const ResetPassword = lazy(() => import("../components/login/subComponents/ResetPassword"));
const VerifyUser = lazy(() => import("../components/login/subComponents/VerifyUser"));
const ChatSupport = lazy(() => import("../components/chatSupport/index"));

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
        path: "/dashboard",
        element:<Dashboard />,
      },
      {
        path: "/chat-support",
        element:(
          <Suspense fallback={<Loading />}>
            <ChatSupport />
          </Suspense>
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
