import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import HalfTime from "../components/pages/HalfTime";
import Home from "../components/pages/Home";
import LineUp from "../components/pages/LineUp";
import Photos from "../components/pages/Photos";
import Play from "../components/pages/Play";
import Stats from "../components/pages/Stats";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import NewPost from "../components/pages/NewPost";
import UpdatePost from "../components/pages/UpdatePost";
import NewStat from "../components/pages/NewStat";
import ReadStat from "../components/pages/ReadStat";
import UpdateStat from "../components/pages/UpdateStat";
import ReadPost from "../components/pages/ReadPost";
import Email from "../components/pages/Email";

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
