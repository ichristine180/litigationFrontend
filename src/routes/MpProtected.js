import MpDashboard from "../component/protected/MP/MpDashboard";
import LMSReport from "../component/protected/MP/Report";
import StaffM from "../component/protected/MP/Staff";
import AllConsulations from "../component/protected/officer/AllConsulations";
import Customers from "../component/protected/officer/Customers";
const mpProtected = [
  { path: "/", element: <MpDashboard /> },
  { path: "/allConsulations", element: <AllConsulations /> },
  { path: "/customers", element: <Customers /> },
  { path: "/staff", element: <StaffM /> },
  { path: "/report", element: <LMSReport /> },
];

export default mpProtected;
