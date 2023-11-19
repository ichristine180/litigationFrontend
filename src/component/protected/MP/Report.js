import {
  faMoneyBillAlt,
  faScaleBalanced,
  faScaleUnbalancedFlip,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "../../common/InfoCard";
import {useFixedFooter } from "../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllApplication,
  getCustomers,
} from "../../../redux/thunk/globalThunk";
import { setApprovedApp, setPendings } from "../../../redux/slice/globalSLice";
import CategoriesChart from "./CatChart";
import LawyerChart from "./LawyerChart";

const LMSReport = () => {
  useFixedFooter();
  const gloabal = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllApplication({ status: "approved" }, setApprovedApp));
    dispatch(getAllApplication({ status: "pending" }, setPendings));
    dispatch(getCustomers());
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <InfoCard
          title="All cases"
          icon={faScaleUnbalancedFlip}
          value={gloabal?.approvedApp.length}
          classN="sales"
        />
        <InfoCard
          title="Closed cases"
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
        <InfoCard
          title="Customers"
          icon={faUsers}
          value={gloabal.customers.length}
          classN={"customers"}
        />
      </div>
      <div className="row">
      <CategoriesChart />
      <LawyerChart />
      </div>
      {/* <Table data={gloabal.approvedApp} /> */}
    </>
  );
};


export default LMSReport;
