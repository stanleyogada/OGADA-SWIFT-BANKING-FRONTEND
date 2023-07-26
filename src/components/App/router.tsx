import { createBrowserRouter } from "react-router-dom";

import { CLIENT_ROUTES } from "@constants/routes";
import PageWrapper from "@components/PageWrapper";

import Home from "@pages/Home";
import About from "@pages/About";
import Rewards from "@pages/Rewards";
import Finance from "@pages/Finance";
import Profile from "@pages/Profile";
import Cards from "@pages/Cards";
import Account from "@pages/Account.tsx";
import Livechat from "@pages/Livechat";
import Redirect from "@components/Redirect";
import Welcome from "@pages/Auth/Welcome";
import Signin from "@pages/Auth/Signin";
import Signup from "@pages/Auth/Signup";
import VerifyEmail from "@pages/Auth/VerifyEmail";
import ResendEmail from "@pages/Auth/ResendEmail";

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
      {
        path: CLIENT_ROUTES.account,
        element: (
          <PageWrapper>
            <Account />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.liveChat,
        element: (
          <PageWrapper>
            <Livechat />
          </PageWrapper>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Redirect path={CLIENT_ROUTES.auth} redirectTo={CLIENT_ROUTES.authWelcome} />,
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
      {
        path: CLIENT_ROUTES.authVerifyEmail,
        element: (
          <PageWrapper>
            <VerifyEmail />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.authResendEmail,
        element: (
          <PageWrapper>
            <ResendEmail />
          </PageWrapper>
        ),
      },
    ],
  },
]);

export default ROUTER;
