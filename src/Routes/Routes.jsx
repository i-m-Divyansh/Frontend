import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//? Components
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import NotFound from "../components/NotFound/NotFound";

let allRoutes = [
  {
    path: "/",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/signup",
    component: Signup,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {allRoutes &&
          allRoutes.map((route, index) => {
            let { path, component, isPrivate } = route;
            return isPrivate ? (
              <PrivateRoute
                key={index}
                exact
                path={path}
                component={component}
              />
            ) : (
              <Route exact key={index} path={path} component={component} />
            );
          })}
        <Route path="*" exact={true} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
