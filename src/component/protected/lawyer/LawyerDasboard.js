import {
  faFileArrowUp,
  faScaleBalanced,
  faScaleUnbalancedFlip,
  faTasksAlt,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "../../common/InfoCard";
import { useFixedFooter } from "../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getLaywerApplication,
  validateApplication,
} from "../../../redux/thunk/globalThunk";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LawyerDashboard = () => {
  useFixedFooter();
  const gloabal = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLaywerApplication());
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <InfoCard
          title="All cases"
          icon={faScaleUnbalancedFlip}
          value={gloabal.lawyerApp?.length}
          classN="sales"
        />
        <InfoCard
          title="Closed cases"
          icon={faScaleBalanced}
          value="0"
          classN={"customers"}
        />
        <InfoCard
          title="Tasks"
          icon={faTasksAlt}
          value="10"
          classN={"customers"}
        />
      </div>
      <Table data={gloabal.lawyerApp} />
    </>
  );
};
export const Table = ({ data, title }) => {
  const [show, setShow] = useState(false);
  const hideHandler = () => setShow(false);
  const dispatch = useDispatch();
  return (
    <div class="col-lg-12">
      <h5 class="card-title">{"Cases assigned to you"}</h5>
      <table className="table datatable">
        <thead>
          <tr>
            <th scope="col"> Date</th>
            <th scope="col">Category</th>
            <th scope="col">Summary</th>
            <th scope="col">Status</th>
            <th scope="col">Customer</th>
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
                <FontAwesomeIcon
                  icon={faTasksAlt}
                  title="add task"
                  className="btn btn-primary mb-2"
                />
                <FontAwesomeIcon
                  icon={faFileArrowUp}
                  title="Upload documents"
                  className="btn btn-success"
                />
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

export default LawyerDashboard;
