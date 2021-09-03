import React, { useEffect, useState } from "react";
import PageLayout from "../containers/PageLayout";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Workspace from "../containers/Workspace";
import ViewProfile from "../components/profile/ViewProfile";
import CandidateDetailsTab from "../containers/hr/CandidateDetailsTab";
import Dashboard from "../containers/hr/Dashboard";
import ErrorPage from "../components/ErrorPage";
import HrManageCandidate from "../containers/hr/HrManageCandidate";
import CandidateList from "../testing/CandidateList";
import Unauthorized from "../components/Unauthorized";
import {
  account_manager_routes,
  admin_routes,
  candidate_routes,
  hr_routes,
  leader_routes,
  recruiter_routes,
} from "../Routes";
import OfferMain from "../components/OfferMain";

type Props = {
  role: string;
};

const HRRouter: React.FC<Props> = ({ role }) => {
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
                return <Redirect to="/hr/workspace" />;
              }}
            />
            <Route
              strict
              sensitive
              exact
              path="/manage-candidates"
              render={() => {
                return <Redirect to="/hr/manage-candidates" />;
              }}
            />
            <Route
              strict
              sensitive
              exact
              path="/hr/workspace"
              component={Workspace}
            />
            <Route
              strict
              sensitive
              exact
              path="/hr/dashboard"
              component={Dashboard}
            />
            <Route
              strict
              sensitive
              exact
              path="/hr/manage-candidates"
              component={CandidateList}
            />
            <Route
              strict
              sensitive
              exact
              path="/hr/candidate-details/*"
              component={CandidateDetailsTab}
            />
            <Route
              strict
              sensitive
              path={"/view-profile"}
              component={ViewProfile}
            />
            <Route exact path="/hr/workspace" component={Workspace} />
            <Route exact path="/hr/dashboard" component={Dashboard} />
            <Route
              exact
              path="/hr/manage-candidates"
              component={HrManageCandidate}
            />
            <Route path={"/view-profile"} component={ViewProfile} />
            <Route path={"/offer"} component={OfferMain} />

            <Route exact path={loc} component={Unauthorized} />
          </Switch>
        </PageLayout>
      </Router>
    );
  }
};

export default HRRouter;
