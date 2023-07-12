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
import Post from "../compoents/pages/Post";
import UpdatePost from "../compoents/pages/UpdatePost/UpdatePost";

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
      { path: "login", element: <Login /> },
      { path: "login/sign-up", element: <SignUp /> },
      { path: "/play/new", element: <NewPost /> },
      { path: "/play/:no", element: <Post /> },
      { path: "/updatePlay/:no", element: <UpdatePost /> },
      { path: "/half-time/new", element: <NewPost /> },
      { path: "/half-time/:no", element: <Post /> },
      { path: "/updateHalfTime/:no", element: <UpdatePost /> },
    ],
  },
]);

export default router;
