import LandingPage from "../component/public/LandingPage";
import Login from "../component/public/Login";
import Register from "../component/public/Register";

const publicRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
];

export default publicRoutes;
