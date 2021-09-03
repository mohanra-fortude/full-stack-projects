import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Workspace from "../containers/Workspace";
import PageLayout from "../containers/PageLayout";
import AmManageCandidate from "../containers/account-manager/AmManageCandidate";
import ViewProfile from "../components/profile/ViewProfile";
import Dashboard from "../containers/account-manager/Dashboard";
import ErrorPage from "../components/ErrorPage";
import {
  account_manager_routes,
  admin_routes,
  candidate_routes,
  hr_routes,
  leader_routes,
  recruiter_routes,
} from "../Routes";
import Unauthorized from "../components/Unauthorized";
import Offer from "../containers/account-manager/Offer";
import Renegotiate from "../containers/account-manager/Renegotiate";
import OfferMain from "../components/OfferMain";

type Props = {
  role: string;
};

const AccoutManagerRouter: React.FC<Props> = ({ role }) => {
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
              exact
              strict
              sensitive
              path="/"
              render={() => {
                return <Redirect to="/account-manager/workspace" />;
              }}
            />
            <Route
              exact
              strict
              sensitive
              path="/manage-candidates"
              render={() => {
                return <Redirect to="/account-manager/manage-candidates" />;
              }}
            />
            <Route
              exact
              path="/account-manager/workspace"
              component={Workspace}
            />
            <Route
              strict
              sensitive
              exact
              path="/account-manager/dashboard"
              component={Dashboard}
            />
            <Route
              strict
              sensitive
              exact
              path="/account-manager/manage-candidates"
              component={AmManageCandidate}
            />
            <Route
              strict
              sensitive
              exact
              path="/account-manager/offer-request-initiated"
              component={Offer}
            />
            <Route path={"/view-profile"} component={ViewProfile} />
            <Route path={"/offer"} component={OfferMain} />

            <Route
              strict
              sensitive
              exact
              path="/am/renegotiate"
              component={Renegotiate}
            />
            <Route exact path={loc} component={Unauthorized} />
          </Switch>
        </PageLayout>
      </Router>
    );
  }
};

export default AccoutManagerRouter;
