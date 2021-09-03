import React from "react";
import UpdateCandidate from "../components/UpdateCandidate";
import UserService from "../services/UserService";

type State = {
  candData: [];
  clientName: [];
  candDataUpdate: [];
};

const usersId = localStorage.getItem("userId");
class UpdateCandidateMain extends React.Component {
  state: State = {
    candData: [],
    clientName: [],
    candDataUpdate: [],
  };
  componentDidMount() {
    this.roleClick();
  }
  roleClick = async () => {
    const cand = await UserService.getClient();
    this.setState({
      clientName: cand.data.res,
    });
  };

  render() {
    return (
      <div>
        <UpdateCandidate
          clientName={this.state.clientName}
          data={this.state.candDataUpdate}
        />
      </div>
    );
  }
}
export default UpdateCandidateMain;
