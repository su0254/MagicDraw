import { createBrowserRouter } from "react-router";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Category from "./components/Category";

// Example usage of createBrowserRouter
export const router = createBrowserRouter([

  {path: "/", element: <HomePage />, errorElement: <div>Eror</div>},
  {path: "login", element: <Login/>, errorElement: <div>Eror</div>},
  {path:"register", element: <Register/>, errorElement: <div>Eror</div>},
  {path:"category", element: <Category/>, errorElement: <div>Eror</div>}
]);
