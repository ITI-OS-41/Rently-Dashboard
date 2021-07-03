import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Login from "views/auth/Login.js";


// * BLOG
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
import SubCategoryList from "views/subcategory/SubCategoryList";
import SubCategoryCreate from "views/subcategory/SubCategoryCreate";
import SubCategoryShow from "views/subcategory/SubCategoryShow";
import SubCategoryEdit from "views/subcategory/SubCategoryEdit";
import AppRateList from "views/apprate/AppRateList";
import AppRateCreate from "views/apprate/AppRateCreate";
import AppRateShow from "views/apprate/AppRateShow";
import AppRateEdit from "views/apprate/AppRateEdit";
import UserList from "views/user/UserList";
import UserCreate from "views/user/UserCreate";
import UserShow from "views/user/UserShow";
import UserEdit from "views/user/UserEdit";
import ItemList from "views/item/ItemList";
import ItemCreate from "views/item/ItemCreate";
import ItemShow from "views/item/ItemShow";
import ItemEdit from "views/item/ItemEdit";
import ItemRateList from "views/itemrate/ItemRateList";
import ItemRateCreate from "views/itemrate/ItemRateCreate";
import ItemRateShow from "views/itemrate/ItemRateShow";
import ItemRateEdit from "views/itemrate/ItemRateEdit";


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



  //* SubCategory
  {
    path: "/subcategory",
    name: "SubCategory",
    icon: "fas fa-cubes text-purple",
    component: SubCategoryList,
    layout: "/admin",
    showInSidebar: true,
    exact: true
  },
  {
    path: "/subcategory/create",
    name: "SubCategory Create",
    icon: "ni ni-planet text-blue",
    component: SubCategoryCreate,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/subcategory/:id",
    name: "SubCategory Show",
    icon: "far fa-newspaper text-blue",
    component: SubCategoryShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/subcategory/:id/edit",
    name: "SubCategory Blog",
    icon: "ni ni-planet text-blue",
    component: SubCategoryEdit,
    layout: "/admin",
    showInSidebar: false
  },


  //* apprate
  {
    path: "/apprate",
    name: "App Rate",
    icon: "far fa-star text-warning",
    component: AppRateList,
    layout: "/admin",
    showInSidebar: true,
    exact: true
  },
  {
    path: "/apprate/create",
    name: "AppRate Create",
    icon: "ni ni-planet text-blue",
    component: AppRateCreate,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/apprate/:id",
    name: "AppRate Show",
    icon: "far fa-newspaper text-blue",
    component: AppRateShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/apprate/:id/edit",
    name: "AppRate edit",
    icon: "ni ni-planet text-blue",
    component: AppRateEdit,
    layout: "/admin",
    showInSidebar: false
  },


  //* user
  {
    path: "/user",
    name: "User",
    icon: "far fa-user text-dark",
    component: UserList,
    layout: "/admin",
    showInSidebar: true,
    exact: true
  },
  {
    path: "/user/create",
    name: "User Create",
    icon: "ni ni-planet text-blue",
    component: UserCreate,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/user/:id",
    name: "User Show",
    icon: "far fa-newspaper text-blue",
    component: UserShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/user/:id/edit",
    name: "User edit",
    icon: "ni ni-planet text-blue",
    component: UserEdit,
    layout: "/admin",
    showInSidebar: false
  },

  //* ItemRate
  {
    path: "/itemrate",
    name: "Item Rate",
    icon: "far fa-star text-warning",
    component: ItemRateList,
    layout: "/admin",
    showInSidebar: true,
    exact: true
  },
  {
    path: "/itemrate/create",
    name: "Item Rate Create",
    icon: "ni ni-planet text-blue",
    component: ItemRateCreate,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/itemrate/:id",
    name: "Item Rate Show",
    icon: "far fa-newspaper text-blue",
    component: ItemRateShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/itemrate/:id/edit",
    name: "Item Rate edit",
    icon: "ni ni-planet text-blue",
    component: ItemRateEdit,
    layout: "/admin",
    showInSidebar: false
  },
  // ****


  //* item
  {
    path: "/item",
    name: "Item",
    icon: "fas fa-bicycle text-green",
    component: ItemList,
    layout: "/admin",
    showInSidebar: true,
    exact: true
  },
  {
    path: "/item/create",
    name: "Item Create",
    icon: "ni ni-planet text-blue",
    component: ItemCreate,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/item/:id",
    name: "Item Show",
    icon: "far fa-newspaper text-blue",
    component: ItemShow,
    layout: "/admin",
    exact: true
  },
  {
    path: "/item/:id/edit",
    name: "Item edit",
    icon: "ni ni-planet text-blue",
    component: ItemEdit,
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
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
