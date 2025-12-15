import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { CollectionPage } from "./pages/collections/[id]";
import { IndexPage } from "./pages";
import { collections } from "./assets/data";

const router = createBrowserRouter(
  [
    {
      path: "/",
      children: [
        {
          index: true,
          loader: () => collections,
          Component: IndexPage,
        },
        {
          path: "/collections/:id",
          loader: ({ params }) =>
            collections.find((collection) => collection.id === params.id),
          Component: CollectionPage,
        },
      ],
    },
  ],
  {
    basename:
      process.env.NODE_ENV === "development"
        ? undefined
        : process.env.PUBLIC_URL,
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
