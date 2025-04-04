import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Index from "./pages/Index";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Templates from "./components/Templates";
import CreateDesign from "./pages/CreateDesign";
import Main from "./pages/Main";
import { token_decode } from "./utils";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AapiKey = import.meta.env.VITE_API_KEY;

const userInfo = token_decode(localStorage.getItem("canva_token"));

const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
    ],
  },
  {
    path: "/design/create",
    element: userInfo ? <CreateDesign /> : <Navigate to="/" />,
  },
  {
    path: "/design/:design_id/edit",
    element: userInfo ? <Main /> : <Navigate to="/" />,
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={AapiKey}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
