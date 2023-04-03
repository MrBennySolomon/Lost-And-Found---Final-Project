import "./css/App.css";
import React from "react";
import Controller from "./MVC/Controller/Controller";
import Home from "./MVC/View/pages/Home";
import Root from "./MVC/View/components/Root";
import FindItem from "./MVC/View/pages/FindItem";
import AddItem from "./MVC/View/pages/AddItem";
import DeleteItem from "./MVC/View/pages/DeleteItem";
import EditItem from "./MVC/View/pages/EditItem";
import SearchItem from "./MVC/View/pages/SearchItem";
import ErrorPage from "./MVC/View/pages/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const controller = new Controller();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/add", element: <AddItem controller={controller} /> },
      { path: "/edit", element: <EditItem controller={controller} /> },
      { path: "/delete", element: <DeleteItem controller={controller} /> },
      { path: "/search", element: <SearchItem controller={controller} /> },
      { path: "/find/:location", element: <FindItem controller={controller} /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
