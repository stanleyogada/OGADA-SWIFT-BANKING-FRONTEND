import { createBrowserRouter } from "react-router-dom";

import Home from "../../pages/Home";
import About from "../../pages/About";

// GLOBAL CONFGURATIONS FILE FOR THE APP
const CLIENT_ROUTES = {
  home: "/",
  about: "/about",
};

const ROUTER = createBrowserRouter([
  {
    path: CLIENT_ROUTES.home,
    element: <Home />,
  },
  {
    path: CLIENT_ROUTES.about,
    element: <About />,
  },
]);

export { CLIENT_ROUTES, ROUTER };
