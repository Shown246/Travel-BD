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

  const fetchCrafts = () => {
    return fetch("https://ph-assignment10-server-omega.vercel.app/crafts").then((res) => res.json());
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error/>,
      loader: () => fetch("https://ph-assignment10-server-omega.vercel.app/crafts").then((res) => res.json()),
      children: [
        {
          path: "/",
          element: <Home/>,
          loader: fetchCrafts,
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
          loader: fetchCrafts,
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
