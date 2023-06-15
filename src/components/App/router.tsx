import { createBrowserRouter } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Welcome from "../../pages/Welcome";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";

const ROUTER = createBrowserRouter([
  {
    path: CLIENT_ROUTES.home,
    children: [
      {
        path: CLIENT_ROUTES.home,
        element: <Home />,
      },
      {
        path: CLIENT_ROUTES.about,
        element: <About />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: CLIENT_ROUTES.authWelcome,
        element: <Welcome />,
      },
      {
        path: CLIENT_ROUTES.authSignin,
        element: <Signin />,
      },
      {
        path: CLIENT_ROUTES.authSignup,
        element: <Signup />,
      },
    ],
  },
]);

export default ROUTER;
