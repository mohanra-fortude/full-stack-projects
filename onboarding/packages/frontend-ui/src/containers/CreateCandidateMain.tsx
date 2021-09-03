import React from "react";
import CreateCandidate from "../components/CreateCandidate";
import UserService from "../services/UserService";

type State = {
  clientName: [];
};

const usersId = localStorage.getItem("userId");
class CreateCandidateMain extends React.Component {
  state: State = {
    clientName: [],
  };
  componentDidMount() {
    this.roleClick();
  }
  newArray: any = [];
  roleClick = async () => {
    const cand = await UserService.getClient();
    this.setState({
      clientName: cand.data.res,
    });
  };
  render() {
    return (
      <div>
        <CreateCandidate clientName={this.state.clientName} />
      </div>
    );
  }
}

export default CreateCandidateMain;
