import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "../../pages/About";
import HomePage from "../../pages/Home";
import Auth from "../Auth";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth/signin",
        element: <div>Sign In</div>,
      },
      {
        path: "/auth/signup",
        element: <div>Sign Up</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
