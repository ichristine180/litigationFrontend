import AllConsulations from "../component/protected/officer/AllConsulations";
import Customers from "../component/protected/officer/Customers";
import OfficerDashboard from "../component/protected/officer/OfficerDasboard";

const officerProtected = [
  { path: "/", element: <OfficerDashboard /> },
  { path: "/allConsulations", element: <AllConsulations /> },
  { path: "/customers", element: <Customers /> },
];

export default officerProtected;
