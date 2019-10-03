import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Attendance from "../views/Attendance/Attendance";

const indexRoutes = [{ path: "/", component: Dashboard },{ path: "/attendance/:sessionId", component: Attendance }, { path: "/attendance", component: Attendance}];

export default indexRoutes;
