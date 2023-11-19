import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./public/Header";
import publicRoutes from "../routes/public";
import Spinner from "./common/Spinner";
import Notification from "./common/Notification";
import clientProtected from "../routes/clientProtected";
import officerProtected from "../routes/officerProtected";
import mpProtected from "../routes/MpProtected";
import HeaderP from "./protected/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser, logoutUser } from "../redux/slice/authSlice";
import Sidebar from "./protected/Sidebar";
import lawyerProtected from "../routes/lawyerProtected";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      dispatch(loginUser(user));
    } else dispatch(logoutUser());
  }, [dispatch]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  return (
    <Router>
      {!isAuthenticated && <Header />}
      {isAuthenticated && (
        <>
          <HeaderP user={user?.user} />
          <Sidebar />
        </>
      )}
      {isAuthenticated ? (
        <main id="main" className="main">
          <section className="section dashboard">
            <ProtectedR role={user?.user?.role} />
          </section>
        </main>
      ) : (
        <PublicR />
      )}
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
  let body = null;
  if (role === 0)
    body = clientProtected.map((i, key) => (
      <Route path={i.path} element={i.element} key={key} />
    ));
  if (role === 1)
    body = officerProtected.map((i, key) => (
      <Route path={i.path} element={i.element} key={key} />
    ));
  if (role === 2)
    body = lawyerProtected.map((i, key) => (
      <Route path={i.path} element={i.element} key={key} />
    ));
  if (role === 3)
    body = mpProtected.map((i, key) => (
      <Route path={i.path} element={i.element} key={key} />
    ));
  return <Routes>{body}</Routes>;
};
export default App;
