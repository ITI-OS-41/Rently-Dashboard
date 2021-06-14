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
import NotificationCreate from "views/notification/NotificationCreate";
import NotificationEdit from "views/notification/NotificationEdit";
import NotificationShow from "views/notification/NotificationShow";
import FAQList from "views/faq/FAQList";
import FAQCreate from "views/faq/FAQCreate";
import FAQShow from "views/faq/FAQShow";
import FAQEdit from "views/faq/FAQEdit";
import CategoryList from "views/category/CategoryList";
import CategoryCreate from "views/category/CategoryCreate";
import CategoryShow from "views/category/CategoryShow";
import CategoryEdit from "views/category/CategoryEdit";


var routes = [

  //* Blog
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

  //* Notification
  {
    path: "/notification",
    name: "Notification",
    icon: "far fa-bell text-warning",
    component: NotificationList,
    layout: "/admin",
    showInSidebar: true,
    exact: true
  },
  {
    path: "/notification/create",
    name: "Blog Create",
    icon: "ni ni-planet text-blue",
    component: NotificationCreate,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/notification/:id",
    name: "Notification Show",
    icon: "far fa-newspaper text-blue",
    component: NotificationShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/notification/:id/edit",
    name: "Edit Blog",
    icon: "ni ni-planet text-blue",
    component: NotificationEdit,
    layout: "/admin",
    showInSidebar: false
  },


  //* FAQ
  {
    path: "/faq",
    name: "FAQ",
    icon: "fas fa-question text-info",
    component: FAQList,
    layout: "/admin",
    showInSidebar: true,
    exact: true
  },
  {
    path: "/faq/create",
    name: "FAQ Create",
    icon: "ni ni-planet text-blue",
    component: FAQCreate,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/faq/:id",
    name: "FAQ Show",
    icon: "far fa-newspaper text-blue",
    component: FAQShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/faq/:id/edit",
    name: "FAQ Blog",
    icon: "ni ni-planet text-blue",
    component: FAQEdit,
    layout: "/admin",
    showInSidebar: false
  },


  //* Category
  {
    path: "/category",
    name: "Category",
    icon: "fas fa-cube text-dark",
    component: CategoryList,
    layout: "/admin",
    showInSidebar: true,
    exact: true
  },
  {
    path: "/category/create",
    name: "Category Create",
    icon: "ni ni-planet text-blue",
    component: CategoryCreate,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/category/:id",
    name: "Category Show",
    icon: "far fa-newspaper text-blue",
    component: CategoryShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/category/:id/edit",
    name: "Category Blog",
    icon: "ni ni-planet text-blue",
    component: CategoryEdit,
    layout: "/admin",
    showInSidebar: false
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
