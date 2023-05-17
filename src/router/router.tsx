import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HalfTime from "../compoents/pages/HalfTime";
import Home from "../compoents/pages/Home";
import LineUp from "../compoents/pages/LineUp";
import Photos from "../compoents/pages/Photos";
import Play from "../compoents/pages/Play";
import Stats from "../compoents/pages/Stats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/line-up", element: <LineUp /> },
      { path: "/play", element: <Play /> },
      { path: "/half-time", element: <HalfTime /> },
      { path: "stats", element: <Stats /> },
      { path: "photos", element: <Photos /> },
    ],
  },
]);

export default router;
