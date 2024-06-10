import LogIn from "./Components/LogIn";
import Root from "./Components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Components/Home";
import Error from "./Error";
import Dashboard from "./Components/Dashboard";
import GuideProfile from "./Components/GuideProfile";
import AssignedTours from "./Components/AssignedTours";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/logIn",
          element: <LogIn />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard/profile",
          element: <ProtectedRoute><GuideProfile /></ProtectedRoute>
            
        },
        {
          path: "/dashboard/tours",
          element: <ProtectedRoute><AssignedTours/></ProtectedRoute>
            
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
