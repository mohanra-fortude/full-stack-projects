import React from "react";
import Update from "../components/Update";
import { RoleType } from "../types";
import RoleService from "../services/RoleService";
import EmployeeService from "../services/EmployeeService";
import UserService from "../services/UserService";

type State = {
  roledata: RoleType[];
  empData: [];
  email: string;
  mobile: number;
  manager: number;
  reporting: [];
  userId: string;
  managerName: string;
  designation: string;
  empDataUpdate: [];
  managerData: [];
  tempfname: string;
  templname: string;
  tempemail: string;
  tempdesig: string;
  tempmobile: string;
  temphome: string;
  mainrole: number;
};

class UpdateMain extends React.Component {
  userId = window.location.pathname.split("/")[2];
  state: State = {
    roledata: [],
    empData: [],
    email: "",
    mobile: 0,
    manager: 0,
    reporting: [],
    userId: "",
    managerName: "",
    designation: "",
    empDataUpdate: [],
    managerData: [],
    tempfname: "",
    templname: "",
    tempemail: "",
    tempdesig: "",
    tempmobile: "",
    temphome: "",
    mainrole: 0,
  };
  componentDidMount() {
    this.getRoles();
    this.getEmployee();
  }
  async getRoles() {
    try {
      const { data } = await RoleService.getRoles();
      this.setState({
        roledata: data,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async getEmployee() {
    try {
      const { data } = await EmployeeService.getEmployeeById(this.userId);
      this.setState({ empDataUpdate: data[0] });
      this.setState({ userId: this.userId });
      this.setState({
        tempfname: data[0].firstName,
        templname: data[0].lastName,
        tempemail: data[0].email,
        tempdesig: data[0].designation,
        tempmobile: data[0].mobile,
        temphome: data[0].homePhone,
        mainrole: data[0].roleId,
      });

      await this.getManager(data[0].managerId);
      await this.roleClick(data[0].roleId);
    } catch (e) {
      console.log(e);
    }
  }

  async getManager(managerUserId: string) {
    try {
      const { data } = await EmployeeService.getEmployeeById(managerUserId);
      this.setState({ reporting: data });
    } catch (e) {
      console.log(e);
    }
  }

  roleClick = async (val: any) => {
    const emp = await UserService.getEmployee(val);
    this.setState({
      reporting: emp.data,
    });
  };

  changeFname = async (val: any) => {
    this.setState({ tempfname: val.value });
  };

  changeLname = async (val: any) => {
    this.setState({ templname: val.value });
  };

  changeDesig = async (val: any) => {
    this.setState({ tempdesig: val.value });
  };

  changeEmail = async (val: any) => {
    this.setState({ tempemail: val.value });
  };

  changeMobile = async (val: any) => {
    this.setState({ tempmobile: val.value });
  };

  changeHomephone = async (val: any) => {
    this.setState({ temphome: val.value });
  };

  render() {
    return (
      <div>
        <Update
          rolelist={this.state.roledata}
          click={this.roleClick}
          reports={this.state.reporting}
          data={this.state.empDataUpdate}
          emails={this.state.email}
          mobiles={this.state.mobile}
          managers={this.state.manager}
          usersId={this.state.userId}
          managersName={this.state.managerName}
          designations={this.state.designation}
          empDataUpdate={this.state.empDataUpdate}
          tempfname={this.state.tempfname}
          templname={this.state.templname}
          tempemail={this.state.tempemail}
          tempdesig={this.state.tempdesig}
          tempmobile={this.state.tempmobile}
          temphome={this.state.temphome}
          mainrole={this.state.mainrole}
          changeFname={this.changeFname}
          changeLname={this.changeLname}
          changeDesig={this.changeDesig}
          changeEmail={this.changeEmail}
          changeMobile={this.changeMobile}
          changeHomephone={this.changeHomephone}
          // managerData={this.state.managerData}
        />
      </div>
    );
  }
}

export default UpdateMain;
