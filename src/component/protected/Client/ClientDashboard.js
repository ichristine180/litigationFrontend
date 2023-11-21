import {
  faScaleBalanced,
  faScaleUnbalancedFlip,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserApplication, pay } from "../../../redux/thunk/globalThunk";
import { useFixedFooter } from "../../common/helper";
import InfoCard from "../../common/InfoCard";
import { Modal } from "react-bootstrap";

const ClientDashboard = () => {
  const application = useSelector((state) => state.global).applications;
  const dispatch = useDispatch();
  useFixedFooter();
  useEffect(() => {
    dispatch(getUserApplication());
  }, [dispatch]);
  const filterOptions = ["Today", "This Month", "This Year"];
  return (
    <>
      <div className="row">
        <InfoCard
          title="Open cases"
          icon={faScaleUnbalancedFlip}
          value={application.length}
          filterOptions={filterOptions}
          classN="sales"
        />
        <InfoCard
          title="Closed cases"
          icon={faScaleBalanced}
          value="0"
          filterOptions={filterOptions}
          classN={"customers"}
        />
      </div>
      <Table data={application} />
    </>
  );
};
const Table = ({ data }) => {
  const [show, setShow] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const hideHandler = () => setShow(false);
  const rwandaMobileRegex = /^(078|073)\d{7}$/;
  const [error, setError] = useState();
  const dispatch = useDispatch();
  return (
    <div class="col-lg-12">
      <h5 class="card-title">All Consulations</h5>
      <table className="table datatable">
        <thead>
          <tr>
            <th scope="col">Application date</th>
            <th scope="col">Category</th>
            <th scope="col">Summary</th>
            <th scope="col">Status</th>
            <th scope="col">Lawyer</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <th scope="row">
                {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </th>
              <td>{item.caseCategory}</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: item.caseSummary }} />
              </td>
              <td>{item.status}</td>
              <td>
                {item.Case?.Account.firstName} {item.Case?.Account?.mobileNo}
              </td>
              <td>
                {(!item.payment || item.payment?.status === "failed") && (
                  <button
                    className={`btn btn-primary ${
                      item.status === "validated" ? "" : "disabled"
                    }`}
                    onClick={() => setShow(item.id)}
                  >
                    pay Consulation fee
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length && <p className="text-center">No data found</p>}
      <Modal show={show ? true : false} onHide={hideHandler} centered>
        <Modal.Body>
          <p className="text-center text-danger">{error}</p>
          <div className="mb-3">
            <label htmlFor="mobileNo" className="form-label">
              mobile no
            </label>

            <input
              type="text"
              name="mobileNo"
              placeholder="enter mobile no you want to pay with"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className={`form-control`}
            />
          </div>
          <div>
            <button
              className="btn btn-secondary pull-left"
              onClick={hideHandler}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary pull-right"
              onClick={() => {
                if (!rwandaMobileRegex.test(mobileNo))
                  setError("Invalid mobile no");
                else {
                  setError();
                  dispatch(
                    pay({
                      applicationId: show,
                      mobileNo,
                    })
                  );
                  setShow(false);
                }
              }}
            >
              Pay
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientDashboard;
