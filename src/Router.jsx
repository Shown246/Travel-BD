import LogIn from "./Components/LogIn";
import Root from "./Components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Components/Home";
import Details from "./Components/Details";
import Categories from "./Components/Categories";
import Error from "./Error";
import axios from "axios";


const Router = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/logIn",
          element: <LogIn/>,
        },
        {
          path: "/signUp",
          element: <SignUp/>,
        },
        {
          path: "/addBook",
          element: <ProtectedRoute></ProtectedRoute>,
        },
        {
          path: "/borrowed",
          element: <ProtectedRoute></ProtectedRoute>,
        },
        {
          path: "/update/:id",
          element: <ProtectedRoute></ProtectedRoute>,
          loader: async ({ params }) => {
            return axios.get(`https://ph-assignment11-server.vercel.app/book/${params.id}`).then((res) => res.data);
          },
        },
        {
          path: "/details/:id",
          element: <ProtectedRoute><Details/></ProtectedRoute>
        },
        {
          path: "/categories/:id",
          element: <ProtectedRoute><Categories/></ProtectedRoute>,
          loader: async ({ params }) => {
            return axios.get(`https://ph-assignment11-server.vercel.app/category/${params.id}`).then((res) => res.data);
          },   
        },
        {
          path: "/allBooks",
          element: <ProtectedRoute></ProtectedRoute>
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
