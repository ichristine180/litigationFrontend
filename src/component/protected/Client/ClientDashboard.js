import {
  faCheckDouble,
  faScaleBalanced,
  faScaleUnbalancedFlip,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserApplication } from "../../../redux/thunk/globalThunk";
import { useFixedFooter } from "../../common/helper";
import InfoCard from "../../common/InfoCard";

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
          value="145"
          filterOptions={filterOptions}
          classN="sales"
        />
        <InfoCard
          title="Closed cases"
          icon={faScaleBalanced}
          value="$3,264"
          filterOptions={filterOptions}
          classN={"customers"}
        />
        <InfoCard
          title="Validated Re"
          icon={faCheckDouble}
          value="1244"
          filterOptions={filterOptions}
          classN={"revenue"}
        />
      </div>
      <Table data={application} />
    </>
  );
};
const Table = ({ data }) => {
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
                <button
                  className={`btn btn-primary ${
                    item.status !== "validated" ? "disabled" : ""
                  }`}
                  disabled
                >
                  pay Consulation fee
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length && <p className="text-center">No data found</p>}
    </div>
  );
};


export default ClientDashboard;
