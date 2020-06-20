import React, { Component } from "react";
import "antd/dist/antd.css";
// import AppRouter from './components/routers/index';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/HealthCheckupLogin/HealthCheckLogin";
import Forgot from "./components/HealthCheckupLogin/HealthCheckForgot";
import ResetPassword from "./components/HealthCheckupLogin/ResetPassword";
import MiniDrawer from "./components/Drawer page/Drawerpage";

import "./App.css";

export const apiurl = 'http://52.200.251.222:8158/api/v1/';

export default class App extends Component {
  state = { test: false };
  render() {
    return (
      <div>
        <Router basename="healthcheckup/?/">
          <Route exact path="/" component={Login} />
          <Route path={"/ResetPassword"} component={ResetPassword} exact />
          <Route path="/forgot" component={Forgot} exact />
          <Route path="/Home" component={MiniDrawer} />
        </Router>
      </div>
    );
  }
}
