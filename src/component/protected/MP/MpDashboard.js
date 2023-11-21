import {
  faMoneyBillAlt,
  faScaleBalanced,
  faScaleUnbalancedFlip,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "../../common/InfoCard";
import { useFixedFooter } from "../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  assignLawyer,
  getAllApplication,
  getLawyers,
} from "../../../redux/thunk/globalThunk";
import { setApprovedApp, setPendings } from "../../../redux/slice/globalSLice";
import { Modal } from "react-bootstrap";

const MpDashboard = () => {
  useFixedFooter();
  const gloabal = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllApplication({ status: "approved" }, setApprovedApp));
    dispatch(getAllApplication({ status: "pending" }, setPendings));
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <InfoCard
          title="Pending cases"
          icon={faScaleUnbalancedFlip}
          value={gloabal?.pendingApp.length}
          classN="sales"
        />
        <InfoCard
          title="Approved cases"
          icon={faScaleBalanced}
          value={gloabal?.approvedApp.length}
          classN={"customers"}
        />
        <InfoCard
          title="Revenue"
          icon={faMoneyBillAlt}
          value={`${100 * gloabal?.approvedApp.length} rwf`}
          classN={"revenue"}
        />
      </div>
      <Table data={gloabal.approvedApp} />
    </>
  );
};
export const Table = ({ data, title }) => {
  const [show, setShow] = useState(false);
  const [lawyer, setLawyer] = useState();
  const dispatch = useDispatch();
  const gloabal = useSelector((state) => state.global);
  useEffect(() => {
    dispatch(getLawyers());
  }, [dispatch]);
  return (
    <div class="col-lg-12">
      <h5 class="card-title">{title || "Approved Consulations"}</h5>
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
                {!item.caseId && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShow(item.id);
                    }}
                  >
                    Assign lawyer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <h2>Assign laywer on this case</h2>
          <div className="mt-5 mb-5">
            <select
              value={lawyer}
              onChange={(e) => setLawyer(e.target.value)}
              className="form-select"
            >
              <option>choose laywer</option>
              {gloabal.lawyers.map((i, key) => {
                return (
                  <option value={i.Account.id} key={key}>
                    {i.Account.firstName}|{i.category}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="btn btn-primary pull-right"
            disabled={lawyer ? false : true}
            onClick={() => {
              setShow(false);
              dispatch(
                assignLawyer({ accountId: lawyer, applicationId: show })
              );
            }}
          >
            Assign
          </button>
        </Modal.Body>
      </Modal>
      {!data.length && <p className="text-center">No data found</p>}
    </div>
  );
};

export default MpDashboard;
