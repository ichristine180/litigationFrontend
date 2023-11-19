import { useDispatch } from "react-redux";
import Form from "../common/Form";
import { login } from "../../redux/thunk/authThunk";
import { useNavigate } from "react-router-dom";
import { useFixedFooter } from "../common/helper";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useFixedFooter();
  return (
    <section id="hero" className="d-flex">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 d-flex flex-column">
            <h1>Login to your LMS Account</h1>
            <img src="assets/img/login.jpg" className="img-fluid" alt="" />
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <Form
              fields={[
                {
                  name: "mobileNo",
                  label: "Mobile Number",
                  type: "text",
                  required: true,
                },
                {
                  name: "password",
                  label: "Password",
                  type: "password",
                  required: true,
                },
              ]}
              onSubmit={(data) => {
                dispatch(login(data, navigate));
              }}
              submitButtonText="Login"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
