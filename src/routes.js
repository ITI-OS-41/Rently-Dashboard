import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Empty from "views/examples/Empty";
import BlogCreate from "views/blog/BlogCreate";
import BlogList from "views/blog/BlogList";
import BlogShow from "views/blog/BlogShow";
import BlogEdit from "views/blog/BlogEdit";

import NotificationList from "views/notification/NotificationList";


var routes = [

  {
    path: "/blog",
    name: "Blogs",
    icon: "far fa-newspaper text-blue",
    component: BlogList,
    layout: "/admin",
    exact: true,
    showInSidebar: true
  },
  {
    path: "/blog/create",
    name: "Blog Create",
    icon: "far fa-newspaper text-blue",
    component: BlogCreate,
    layout: "/admin",
    exact: false
  },
  {
    path: "/blog/:id",
    name: "Blog Show",
    icon: "far fa-newspaper text-blue",
    component: BlogShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/blog/:id/edit",
    name: "Blog Edit",
    icon: "far fa-newspaper text-blue",
    component: BlogEdit,
    layout: "/admin",
    exact: false
  },
  {
    path: "/notification",
    name: "Notification",
    icon: "ni ni-planet text-blue",
    component: NotificationList,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/empty",
    name: "Empty",
    icon: "ni ni-planet text-blue",
    component: Empty,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
