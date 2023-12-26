import ClientDashboard from "../component/protected/Client/ClientDashboard";
import RequestConsulations from "../component/protected/Client/RequestConsulations";
import Tasks from "../component/protected/Task";

const clientProtected = [
  { path: "/", element: <ClientDashboard /> },
  { path: "/requestConsulation", element: <RequestConsulations /> },
  { path: "/tasks/:id", element: <Tasks isClient={true} /> },
];

export default clientProtected;
