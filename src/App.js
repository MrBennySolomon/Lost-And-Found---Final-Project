import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Controller from './Controller';
import "./App.css";
import Home from "./Home";
import Root from "./Root";
import FindItem from "./FindItem";
import AddItem from "./AddItem";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";
// import ErrorPage from "./MVC/View/pages/Error";
const controller = new Controller();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/",       element: <Home /> },
      { path: "/add",    element: <AddItem controller={controller}/> },
      { path: "/edit",   element: <EditItem controller={controller} /> },
      { path: "/delete", element: <DeleteItem controller={controller} /> },
      { path: "/find",   element: <FindItem controller={controller} /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;