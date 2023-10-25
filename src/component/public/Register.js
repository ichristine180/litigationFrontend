import { useDispatch } from "react-redux";
import Form from "../common/Form";
import { register } from "../../redux/thunk/authThunk";

const fields = [
  { name: "mobileNo", label: "Mobile Number", type: "text", required: true },
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "NID", label: "National ID", type: "text", required: true },
  { name: "location", label: "Location", type: "text", required: true },
  { name: "dob", label: "Date of Birth", type: "date", required: true },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
];

const handleSubmit = (data, dispatch) => {
  dispatch(register(data));
};
const Register = () => {
  const dispatch = useDispatch();
  return (
    <section id="hero" className="d-flex">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 d-flex flex-column">
            <h1>Register to start Enjoying LMS</h1>
            <img src="assets/img/form.jpg" className="img-fluid" alt="" />
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <Form
              fields={fields}
              onSubmit={(data) => handleSubmit(data, dispatch)}
              submitButtonText="Register"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
