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
import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import TouristProfile from "./Components/TouristProfile";
import BookTour from "./Components/BookTour";
import Wishlist from "./Components/Wishlist";
import ReqToAdmin from "./Components/ReqToAdmin";
import PackageDetail from "./Components/PackageDetail";
import AllPackages from "./Components/AllPackages";
import GuideProfilePage from "./Components/GuideProfilePage";
import AdminProfile from "./Components/AdminProfile";
import AddPackage from "./Components/AddPackage";
import ManageUsers from "./Components/ManageUsers";
import Blogs from "./Components/Blogs";
import Community from "./Components/Community";
import AboutUs from "./Components/AboutUs";

const Router = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;
  const guideRoutes = [
    {
      path: "/dashboard/profile",
      element: <ProtectedRoute><GuideProfile /></ProtectedRoute>,
    },
    {
      path: "/dashboard/tours",
      element: <ProtectedRoute><AssignedTours /></ProtectedRoute>,
    },
  ];

  const touristRoutes = [
    {
      path: "/dashboard/profile",
      element: <ProtectedRoute><TouristProfile /></ProtectedRoute>,
    },
    {
      path: "/dashboard/bookTour",
      element: <ProtectedRoute><BookTour /></ProtectedRoute>,
    },
    {
      path: "/dashboard/wishlist",
      element: <ProtectedRoute><Wishlist/></ProtectedRoute>,
    },
    {
      path: "/dashboard/reqToAdmin",
      element: <ProtectedRoute><ReqToAdmin/></ProtectedRoute>,
    },
  ];

  const adminRoutes = [
    {
      path: "/dashboard/profile",
      element: <ProtectedRoute><AdminProfile/></ProtectedRoute>,
    },
    {
      path: "/dashboard/addPackage",
      element: <ProtectedRoute><AddPackage/></ProtectedRoute>,
    },
    {
      path: "/dashboard/manageUsers",
      element: <ProtectedRoute><ManageUsers/></ProtectedRoute>,
    },
  ];

  let childrenRoutes = [];

  if (role === "Guide") {
    childrenRoutes = guideRoutes;
  } else if (role === "Tourist") {
    childrenRoutes = touristRoutes;
  } else if (role === "Admin") {
    childrenRoutes = adminRoutes;
  }
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
        {
          path:"/packageDetails/:id",
          element: <PackageDetail/>
        },
        {
          path: "/allPackages",
          element: <AllPackages/>
        },
        {
          path: "/guideProfile/:id",
          element: <GuideProfilePage/>
        },
        {
          path: "/blogs",
          element: <Blogs/>
        },
        {
          path: "/community",
          element: <Community/>
        },
        {
          path: "/about",
          element: <AboutUs/>
        }
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children : childrenRoutes,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
