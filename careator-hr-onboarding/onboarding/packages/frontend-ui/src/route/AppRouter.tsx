import React from "react";
import AdminRouter from "./AdminRouter";
import RecruiterRouter from "./RecruiterRouter";
import HRRouter from "./HRRouter";
import AccountManagerRouter from "./AccoutManagerRouter";
import LeaderRouter from "./LeaderRouter";
import CandidateRouter from "./CandidateRouter";
import UserService from "../services/UserService";
import { connect } from "react-redux";
import { AppType, UserSessionType } from "../types";
import SetItemsInLocalStorage from "../components/storage/local-storage/SetLocalStorageItems";


type State = {
  role: string;
  gotData: boolean;
};

type Props = {
  userData: UserSessionType;
};

class AppRouter extends React.Component<Props, State> {
  state: State = {
    role: "",
    gotData: false,
  };
  userId = localStorage.getItem("userId");
  componentDidMount() {
    this.getData();
  }

  async getData() {
    //get userId from redux if it is not null
    if (this.userId !== null) {
      var id: any = this.userId;
    }
    try {
      //first check whether user is employee or not. If he is not employee, by default he is assumed to be candidate and call the api to get candidate details
      const { data } = await UserService.getEmployeeDetailsByUserId(id);
      if (data === "null" || data === undefined || data === null) {
        const { data } = await UserService.getCandidateDetailsByUserId(id);
        SetItemsInLocalStorage(data[0]);
        this.setState({
          role: data[0].userRole,
          gotData: true,
        });
      } else {
        SetItemsInLocalStorage(data[0]);
        this.setState({
          role: data[0].userRole,
          gotData: true,
          //You have to fetch the data before rendering, so introduce a new variable to check whether you have got data from backend or not
        });
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  render() {
    switch (this.state.role) {
      case "Admin":
        return (
          <>{this.state.gotData && <AdminRouter role={this.state.role} />}</>
        );

      case "Recruiter":
        return (
          <>
            {this.state.gotData && <RecruiterRouter role={this.state.role} />}
          </>
        );

      case "HR":
        return <>{this.state.gotData && <HRRouter role={this.state.role} />}</>;

      case "AM":
        return (
          <>
            {this.state.gotData && (
              <AccountManagerRouter role={this.state.role} />
            )}
          </>
        );

      case "Leader":
        return (
          <>{this.state.gotData && <LeaderRouter role={this.state.role} />}</>
        );

      case "Candidate":
        return (
          <>
            {this.state.gotData && <CandidateRouter role={this.state.role} />}
          </>
        );

      default:
        return null;
    }
  }
}

const mapStoreToProps = (store: AppType) => {
  return {
    userData: store.userSession,
  };
};
export default connect(mapStoreToProps)(AppRouter);
