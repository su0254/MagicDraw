import { createBrowserRouter } from "react-router";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

// Example usage of createBrowserRouter
export const router = createBrowserRouter([
  {
	path: "/",
	element: <HomePage />,
    errorElement: <div>Eror</div>,
    children: [
        {path: "/login", element: <Login/>},
    ]
  },
]);
