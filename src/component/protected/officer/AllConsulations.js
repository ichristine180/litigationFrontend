import { useDispatch, useSelector } from "react-redux";
import { useFixedFooter } from "../../common/helper";
import { Table } from "./OfficerDasboard";
import { useEffect } from "react";
import { getAllApplication } from "../../../redux/thunk/globalThunk";
import { setAllApplications } from "../../../redux/slice/globalSLice";

const AllConsulations = () => {
  useFixedFooter();
  const gloabal = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllApplication(null, setAllApplications));
  }, [dispatch]);
  return (
    <>
      <Table data={gloabal.allApp} title="Consulations" />
    </>
  );
};
export default AllConsulations;
