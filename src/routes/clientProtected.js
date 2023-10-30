import ClientDashboard from "../component/protected/Client/ClientDashboard";
import RequestConsulations from "../component/protected/Client/RequestConsulations";

const clientProtected = [
  { path: "/", element: <ClientDashboard /> },
  { path: "/requestConsulation", element: <RequestConsulations /> },
];

export default clientProtected;
