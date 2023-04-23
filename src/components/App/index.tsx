import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "../../pages/About";
import Home from "../../pages/Home";
import HomePage from "../../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/homesample",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
