import React from "react";
import CreateUser from "../components/CreateUser";
import { RoleType } from "../types";
import RoleService from "../services/RoleService";
import UserService from "../services/UserService";

type State = {
  roledata: RoleType[];
  reporting: [];
};

class CreateUserMain extends React.Component {
  state: State = {
    roledata: [],
    reporting: [],
  };

  realRole: any = [];

  componentDidMount() {
    this.getRole();
  }
  async getRole() {
    try {
      const { data } = await RoleService.getRoles();
      this.realRole.push(data);
      this.realRole.forEach((data: any) => {
        if (data.id !== 1) {
          this.setState({ roledata: data });
        }
      });
    } catch (e) {}
  }

  roleClick = async (val: any) => {
    const emp = await UserService.getEmployee(val);
    this.setState({
      reporting: emp.data,
    });
  };
  render() {
    return (
      <div>
        <CreateUser
          rolelist={this.state.roledata}
          click={this.roleClick}
          reports={this.state.reporting}
        />
      </div>
    );
  }
}

export default CreateUserMain;
