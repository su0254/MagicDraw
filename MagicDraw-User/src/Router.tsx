import { createBrowserRouter } from "react-router";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Category from "./components/Category";
import ShowPainting from "./components/ShowPainting";
import DrawingApp from "./components/DrawingApp";
import PersonalArea from "./components/PersonalArea";

// Example usage of createBrowserRouter
export const router = createBrowserRouter([

  { path: "/", element: <HomePage />, errorElement: <div>Eror</div> },
  { path: "login", element: <Login />, errorElement: <div>Eror</div> },
  { path: "register", element: <Register />, errorElement: <div>Eror</div> },
  { path: "category", element: <Category />, errorElement: <div>Eror</div> },
  { path: '/show-painting', element: <ShowPainting selectedImage="defaultImage.jpg" />, errorElement: <div>Error</div> },
  { path: '/drawing-app', element: <DrawingApp/>, errorElement: <div>Error</div> },
  { path: "/personal-area", element: <PersonalArea />, errorElement: <div>Eror</div> },
]);
