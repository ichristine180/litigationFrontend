import { useDispatch, useSelector } from "react-redux";
import { useFixedFooter } from "../../common/helper";
import { useEffect } from "react";
import { getCustomers } from "../../../redux/thunk/globalThunk";

const Customers = () => {
  useFixedFooter();
  const gloabal = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  return (
    <>
      <Table data={gloabal.customers} />
    </>
  );
};
const Table = ({ data }) => {
  return (
    <div class="col-lg-12">
      <h5 class="card-title">All Customers</h5>
      <table className="table datatable">
        <thead>
          <tr>
            <th scope="col">Registered date</th>
            <th scope="col"> First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile no</th>
            <th scope="col">Gender</th>
            <th scope="col">NID</th>
            <th scope="col">Location</th>
            <th scope="col">Date of birth</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </td>
              <td>{item.Account?.firstName}</td>
              <td>{item.Account?.lastName}</td>
              <td>{item.Account?.email}</td>
              <td>{item.Account?.mobileNo}</td>
              <td>{item.gender}</td>
              <td>{item.NID}</td>
              <td>{item.location}</td>
              <td>
                {new Date(item.dob).toLocaleDateString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Customers;
