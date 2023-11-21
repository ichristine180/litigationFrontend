import {
  faCheckCircle,
  faScaleUnbalancedFlip,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "../../common/InfoCard";
import { useFixedFooter } from "../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllApplication,
  getCustomers,
  validateApplication,
} from "../../../redux/thunk/globalThunk";
import { setAllApplications, setPendings } from "../../../redux/slice/globalSLice";
import { Modal } from "react-bootstrap";

const OfficerDashboard = () => {
  useFixedFooter();
  const gloabal = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllApplication({ status: "pending" }, setPendings));
    dispatch(getAllApplication(null, setAllApplications));
    dispatch(getCustomers());
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <InfoCard
          title="Pending Consulation"
          icon={faScaleUnbalancedFlip}
          value={gloabal.pendingApp?.length}
          classN="sales"
        />
        <InfoCard
          title="All Consulation"
          icon={faCheckCircle}
          value={gloabal.allApp?.length}
          classN={"revenue"}
        />
        <InfoCard
          title="Customers"
          icon={faUsers}
          value={gloabal.customers?.length}
          classN={"customers"}
        />
      </div>
      <Table data={gloabal.pendingApp} />
    </>
  );
};
export const Table = ({ data, title }) => {
  const [show, setShow] = useState(false);
  const hideHandler = () => setShow(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth).user?.user;
  return (
    <div class="col-lg-12">
      <h5 class="card-title">{title || "Pending Consulations"}</h5>
      <table className="table datatable">
        <thead>
          <tr>
            <th scope="col"> Aate</th>
            <th scope="col">Category</th>
            <th scope="col">Summary</th>
            <th scope="col">Status</th>
            <th scope="col">Customer</th>
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
                {item.Account?.firstName}|{item.Account?.mobileNo}
              </td>
              <td>
                {item.Case?.Account.firstName} {item.Case?.Account?.lastName}
              </td>
              <td>
                {item.status === "pending" && user.role === 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShow(item.id)}
                  >
                    Validate
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
          <p>Are you sure you want to validate this request ?</p>
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
                dispatch(validateApplication({ id: show }));
                setShow(false);
              }}
            >
              Validate
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OfficerDashboard;
