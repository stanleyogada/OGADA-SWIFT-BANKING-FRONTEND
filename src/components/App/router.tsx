import { createBrowserRouter } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Welcome from "../../pages/Welcome";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";
import PageWrapper from "../PageWrapper";

const ROUTER = createBrowserRouter([
  {
    path: CLIENT_ROUTES.home,
    children: [
      {
        path: CLIENT_ROUTES.home,
        element: (
          <PageWrapper>
            <Home />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.about,
        element: (
          <PageWrapper>
            <About />
          </PageWrapper>
        ),
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: CLIENT_ROUTES.authWelcome,
        element: (
          <PageWrapper>
            <Welcome />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.authSignin,
        element: (
          <PageWrapper>
            <Signin />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.authSignup,
        element: (
          <PageWrapper>
            <Signup />
          </PageWrapper>
        ),
      },
    ],
  },
]);

export default ROUTER;
