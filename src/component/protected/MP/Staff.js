import {
  faUserCheck,
  faUserPlus,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPosition, useFixedFooter } from "../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStaffs } from "../../../redux/thunk/globalThunk";
import Form from "../../common/Form";
import { Modal } from "react-bootstrap";
import { newStaff } from "../../../redux/thunk/authThunk";

const StaffM = () => {
  useFixedFooter();
  const gloabal = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStaffs());
  }, [dispatch]);
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={faUserPlus} /> new staff
        </button>
      </div>
      <Table data={gloabal.staffs} />
      <NewStaff show={show} onHide={() => setShow(false)} />
    </>
  );
};
const NewStaff = ({ show, onHide }) => {
  const dispatch = useDispatch();
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <Form
          fields={fields}
          onSubmit={(data) => {
            handleSubmit(data, dispatch);
            onHide();
          }}
          submitButtonText="Register"
        />
      </Modal.Body>
    </Modal>
  );
};
const Table = ({ data }) => {
  return (
    <div class="col-lg-12">
      <h5 class="card-title">Staff members</h5>
      <table className="table datatable">
        <thead>
          <tr>
            <th scope="col"> First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile no</th>
            <th scope="col">Position</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            let position = getPosition(item);

            return (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.mobileNo}</td>
                <td>{position}</td>
                <td>
                  {item.status === 1 && (
                    <FontAwesomeIcon
                      icon={faUserSlash}
                      className="btn btn-danger"
                      title="deactivate"
                    />
                  )}
                  {item.status === 0 && (
                    <FontAwesomeIcon
                      icon={faUserCheck}
                      className="btn btn-primary"
                      title="activate"
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const fields = [
  { name: "mobileNo", label: "Mobile Number", type: "text", required: true },
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "NID", label: "National ID", type: "text", required: true },
  {
    name: "role",
    label: "Position",
    type: "select",
    required: true,
    options: [
      { value: "1", label: "Officer" },
      { value: "2", label: "Lawyer" },
      { value: "3", label: "Managing partner1" },
    ],
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "family", label: "Family case" },
      { value: "criminal defense", label: "Criminal defense case" },
      { value: "real estate", label: "Real Estate case" },
      { value: "personal injury", label: "Personal injury case" },
    ],
  },
  { name: "experience", label: "Years of experience", type: "number" },
];

const handleSubmit = (data, dispatch) => {
  dispatch(newStaff(data));
};
export default StaffM;
