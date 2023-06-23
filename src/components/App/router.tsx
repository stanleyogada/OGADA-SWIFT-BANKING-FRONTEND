import { createBrowserRouter } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Welcome from "../../pages/Welcome";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";

import Finance from "../../pages/Finance";
import Rewards from "../../pages/Rewards";
import Profile from "../../pages/Profile";
import PageWrapper from "./../PageWrapper/index";
import Cards from "./../../pages/Cards/index";

const ROUTER = createBrowserRouter([
  {
    path: "/",
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
      {
        path: CLIENT_ROUTES.rewards,
        element: (
          <PageWrapper>
            <Rewards />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.finance,
        element: (
          <PageWrapper>
            <Finance />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.profile,
        element: (
          <PageWrapper>
            <Profile />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.cards,
        element: (
          <PageWrapper>
            <Cards />
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
