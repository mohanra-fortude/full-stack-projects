import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import IdleTimeout from "../containers/IdleTimeout";
import Login from "../containers/login";

type Props = {
  loginAction: () => void;
};

//take the property function loginAction and pass it to login component make isLoggedIn as true once user clicks on login component
const LoginRouter: React.FC<Props> = ({ loginAction }) => {
  return (
    <Router>
      <Switch>
        <Route
          strict
          sensitive
          path={"/"}
          render={(props) => <Login {...props} loginAction={loginAction} />}
        />
        <Route strict sensitive path="/timeout" component={IdleTimeout} />

        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default LoginRouter;
