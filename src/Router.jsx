import LogIn from "./Components/LogIn";
import Root from "./Components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Components/SignUp";
import AddBook from "./Components/AddBook";
import ProtectedRoute from "./Components/ProtectedRoute";
import Borrowed from "./Components/Borrowed";
import AllBooks from "./Components/AllBooks";
import Home from "./Components/Home";
import Update from "./Components/Update";
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
          element: <ProtectedRoute><AddBook/></ProtectedRoute>,
        },
        {
          path: "/borrowed",
          element: <ProtectedRoute><Borrowed/></ProtectedRoute>,
          loader: fetchCrafts,
        },
        {
          path: "/update/:id",
          element: <ProtectedRoute><Update/></ProtectedRoute>,
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
          element: <ProtectedRoute><AllBooks/></ProtectedRoute>
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
