import Tasks from "../component/protected/Task";
import LawyerDashboard from "../component/protected/lawyer/LawyerDasboard";

const lawyerProtected = [
  { path: "/", element: <LawyerDashboard /> },
  { path: "/tasks", element: <Tasks /> },
];

export default lawyerProtected;
