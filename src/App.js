import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Root from "./Root";
// import AddItem from "./MVC/View/pages/AddItem";
// import EditItem from "./MVC/View/pages/EditItem";
// import DeleteItem from "./MVC/View/pages/DeleteItem";
// import FindItem from "./MVC/View/pages/FindItem";
// import ErrorPage from "./MVC/View/pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/",       element: <Home /> },
      // { path: "/add",    element: <AddItem /> },
      // { path: "/edit",   element: <EditItem /> },
      // { path: "/delete", element: <DeleteItem /> },
      // { path: "/find",   element: <FindItem /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;