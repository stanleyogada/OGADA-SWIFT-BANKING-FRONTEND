import { createBrowserRouter } from "react-router-dom";

import Home from "../../pages/Home";
import About from "../../pages/About";
import Auth from "../../components/Auth";

// GLOBAL CONFGURATIONS FILE FOR THE APP
const CLIENT_ROUTES = {
  home: "/",
  about: "/about",
  auth: "/auth",
  authSignin: "/auth/signin",
  authSignup: "/auth/signup",
};

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
        element: <About/>,
      },
    ],
  },
  {
    path: CLIENT_ROUTES.auth,
    element: <Auth />,
    children: [
      {
        path: CLIENT_ROUTES.authSignin,
        element: <div>Sign In</div>,
      },
      {
        path: CLIENT_ROUTES.authSignup,
        element: <div>Sign Up</div>,
      },
    ],
  },
]);

export { CLIENT_ROUTES, ROUTER };
