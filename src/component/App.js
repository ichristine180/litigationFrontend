import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import publicRoutes from "../routes/public";
import { useSelector } from "react-redux";
import Spinner from "./common/Spinner";
import Notification from "./common/Notification";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  return (
    <Router>
      <Header />
      {isAuthenticated ? <ProtectedR role={user?.role} /> : <PublicR />}
      <Spinner />
      <Notification />
      <Footer />
    </Router>
  );
};
const PublicR = () => {
  return (
    <Routes>
      {publicRoutes.map((i, key) => {
        return <Route path={i.path} element={i.element} key={key} />;
      })}
    </Routes>
  );
};
const ProtectedR = ({ role }) => {
  console.log(role)
  return <Routes></Routes>;
};
export default App;
