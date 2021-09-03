import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PageLayout from "../containers/PageLayout";
import CandidateSubmenu1 from "../containers/candidate/CandidateSubmenu1";
import CandidateSubmenu2 from "../containers/candidate/CandidateSubmenu2";
import Workspace from "../containers/Workspace";
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

const CandidateRouter: React.FC<Props> = ({ role }) => {
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
      <Router>
        <PageLayout role={role}>
          <Switch>
            <Route
              strict
              sensitive
              exact
              path="/"
              render={() => {
                return <Redirect to="/candidate/workspace" />;
              }}
            />
            <Route
              strict
              sensitive
              exact
              path="/candidate/workspace"
              component={Workspace}
            />
            <Route
              strict
              sensitive
              exact
              path="/candidate/manage-documents"
              component={CandidateSubmenu1}
            />
            <Route
              strict
              sensitive
              exact
              path="/candidate/offer"
              component={CandidateSubmenu2}
            />
            <Route
              strict
              sensitive
              path={"/view-profile"}
              component={ViewProfile}
            />
            <Route exact path={loc} component={Unauthorized} />
          </Switch>
        </PageLayout>
      </Router>
    );
  }
};

export default CandidateRouter;
