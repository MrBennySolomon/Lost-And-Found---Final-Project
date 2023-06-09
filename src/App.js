import "./css/App.css";
import React from "react";
import Home from "./MVC/View/pages/Home";
import Root from "./MVC/View/components/Root";
import Login from "./MVC/View/pages/Login";
import Logout from "./MVC/View/pages/Logout";
import Register from "./MVC/View/pages/Register";
import FindItem from "./MVC/View/pages/FindItem";
import AddItem from "./MVC/View/pages/AddItem";
import DeleteItem from "./MVC/View/pages/DeleteItem";
import EditItem from "./MVC/View/pages/EditItem";
import SearchItem from "./MVC/View/pages/SearchItem";
import ErrorPage from "./MVC/View/pages/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/add", element: <AddItem /> },
      { path: "/edit", element: <EditItem /> },
      { path: "/delete", element: <DeleteItem /> },
      { path: "/search", element: <SearchItem /> },
      { path: "/logout", element: <Logout /> },
      { path: "/find/:name", element: <FindItem /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
