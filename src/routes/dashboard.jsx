// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import BlurOn from "@material-ui/icons/BlurOn";
// core components/views
import Scoring from "../views/Scoring/Scoring";
import Attendance from "../views/Attendance/Attendance";
import DashboardView from "../views/Dashboard/Dashboard";

const dashboardRoutes = [
  {
    path: "/scoring",
    sidebarName: "Scoring",
    navbarName: "스코어링 시트",
    icon: "content_paste",
    component: Scoring
  },
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "대쉬보드",
    icon: Dashboard,
    component: DashboardView
  },
  {
    path: "/attendance/:sessionId",
    sidebarName: "Attendance",
    navbarName: "출석",
    icon: Person,
    component: Attendance
  },


  // {
  //   path: "/dashboard",
  //   sidebarName: "Dashboard",
  //   navbarName: "Material Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage
  // },
  // {
  //   path: "/user",
  //   sidebarName: "User Profile",
  //   navbarName: "Profile",
  //   icon: Person,
  //   component: UserProfile
  // },
  // {
  //   path: "/table",
  //   sidebarName: "Table List",
  //   navbarName: "Table List",
  //   icon: "content_paste",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro
  // },
  { redirect: true, path: "/", to: "/scoring", navbarName: "Redirect" }
];

export default dashboardRoutes;
