
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, Router } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import history from './functions/history';
import Context from './Context';
import AdminRoute from "./functions/route-guards/AdminRoute";
import VisitorRoute from "./functions/route-guards/VisitorRoute";

ReactDOM.render(
    <Context>
      <div id="snackbarhelper"/>
      <Router history={history}>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </Router>
    </Context>,
  document.getElementById("root")
);
