import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import HalfTime from "../compoents/pages/HalfTime";
import Home from "../compoents/pages/Home";
import LineUp from "../compoents/pages/LineUp";
import Photos from "../compoents/pages/Photos";
import Play from "../compoents/pages/Play";
import Stats from "../compoents/pages/Stats";
import Login from "../compoents/pages/Login";
import SignUp from "../compoents/pages/SignUp";
import NewPost from "../compoents/pages/NewPost";
import UpdatePost from "../compoents/pages/UpdatePost";
import NewStat from "../compoents/pages/NewStat";
import ReadStat from "../compoents/pages/ReadStat";
import UpdateStat from "../compoents/pages/UpdateStat";
import ReadPost from "../compoents/pages/ReadPost";
import Email from "../compoents/pages/Email";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/line-up", element: <LineUp /> },
      { path: "/play", element: <Play /> },
      { path: "/half-time", element: <HalfTime /> },
      { path: "/stats", element: <Stats /> },
      { path: "/photos", element: <Photos /> },
      { path: "/login", element: <Login /> },
      { path: "/login/sign-up", element: <SignUp /> },
      { path: "/play/new", element: <NewPost /> },
      { path: "/play/:no", element: <ReadPost /> },
      { path: "/updatePlay/:no", element: <UpdatePost /> },
      { path: "/half-time/new", element: <NewPost /> },
      { path: "/half-time/:no", element: <ReadPost /> },
      { path: "/updateHalfTime/:no", element: <UpdatePost /> },
      { path: "/stats/new", element: <NewStat /> },
      { path: "/stats/:no", element: <ReadStat /> },
      { path: "/updateStat/:no", element: <UpdateStat /> },
      { path: "/email", element: <Email /> },
    ],
  },
]);

export default router;
