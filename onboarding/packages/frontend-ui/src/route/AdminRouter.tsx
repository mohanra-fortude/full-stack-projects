import React, {useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageLayout from "../containers/PageLayout";
import { Redirect } from "react-router-dom";
import Workspace from "../containers/Workspace";
import DashboardContent from "../components/DashboardContent";
import EmployeeList from "../containers/admin/EmployeeList";
import CreateUserMain from "../containers/CreateUserMain";
import UpdateMain from "../containers/UpdateMain";
import DeleteEmployee from "../containers/admin/DeleteEmployee";
import ViewProfile from "../components/profile/ViewProfile";
import ErrorPage from "../components/ErrorPage";
import Unauthorized from "../components/Unauthorized";
import {
  account_manager_routes,
  admin_routes,
  candidate_routes,
  hr_routes,
  leader_routes,
  recruiter_routes,
} from "../Routes";

type Props = {
  role: string;
};

const AdminRouter: React.FC<Props> = ({ role }) => {
  const [loc, setLoc] = useState("");
  const [ind, setInd] = useState(0);
  const location = window.location.href;
  const locat = location.substring(ind);
  const admin = admin_routes.includes(locat);
  const recruiter = recruiter_routes.includes(locat);
  const hr = hr_routes.includes(locat);
  const account_manager = account_manager_routes.includes(locat);
  const leader = leader_routes.includes(locat);
  const candidate = candidate_routes.includes(locat);
  const checkNull = "" || "/";

  const findLocation = () => {
    var n = 0;
    var i;
    for (i = 0; i <= location.length; i++) {
      if (location[i] === "/") {
        n = n + 1;
        if (n === 3) {
          setInd(i);
        }
      }
    }
  };

  useEffect(() => {
    findLocation();
    if (
      admin ||
      recruiter ||
      hr ||
      account_manager ||
      leader ||
      candidate ||
      checkNull
    ) {
      setLoc(locat);
    } else {
      setLoc("error");
    }
  }, [findLocation]);

  if (
    admin === false &&
    recruiter === false &&
    hr === false &&
    account_manager === false &&
    leader === false &&
    candidate === false &&
    loc !== checkNull &&
    window.location.pathname.split("/")[1] !== "view-profile"
  ) {
    return (
      <Router>
        <PageLayout role={role}>
          <Route component={ErrorPage} />
        </PageLayout>
      </Router>
    );
  } else {
    return (
      <>
        <Router>
          <PageLayout role={role}>
            <Switch>
              <Route
                strict
                sensitive
                exact
                path="/"
                render={() => {
                  return <Redirect to="/admin/workspace" />;
                }}
              />
              <Route
                strict
                exact
                path="/admin/workspace"
                component={Workspace}
              />
              <Route
                strict
                sensitive
                exact
                path="/admin/dashboard"
                component={DashboardContent}
              />
              <Route
                strict
                sensitive
                exact
                path="/admin/manage-employees"
                component={EmployeeList}
              />
              <Route
                strict
                sensitive
                exact
                path="/admin/delete-employee"
                component={DeleteEmployee}
              />
              <Route
                strict
                sensitive
                exact
                path={"/createuser"}
                component={CreateUserMain}
              />
              <Route
                strict
                sensitive
                exact
                path={"/update/:id"}
                component={UpdateMain}
              />
              <Route
                strict
                exact
                path={"/view-profile"}
                component={ViewProfile}
              />
              <Route exact path={loc} component={Unauthorized} />
            </Switch>
          </PageLayout>
        </Router>
      </>
    );
  }
};

export default AdminRouter;
