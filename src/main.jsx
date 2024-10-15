import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import WishlistPage from "./pages/WishList.jsx";
import BookDetails from "./pages/BookDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
