import { Space, Table, Tag } from "antd";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styles from "../styles/RecuriterManageCandidatesStyle";
import Search from "antd/lib/input/Search";
import CandidateService from "../services/CandidateService";
import getUserData from "../utils/UserData";

type Props = {
  action: {};
} & RouteComponentProps;

type State = {
  candidateList: [];
  page: number;
  status: string;
  order: string;
  field: string;
  query: string;
  ruid: string;
  loading: boolean;
  statusList: string[];
  list: any[];
};

class CandidateTableForAll extends Component<Props, State> {
  state: State = {
    page: 1,
    candidateList: [],
    status: "",
    order: "ASC",
    field: "id",
    query: "",
    ruid: "",
    loading: true,
    statusList: [],
    list: [],
  };

  componentDidMount() {
    this.filterFromDashboard();
    this.getCandidate(this.state.status);
  }

  async filterFromDashboard() {
    if (this.props.history.location.state) {
      const status: any = this.props.history.location.state;
      await this.setState({
        status: status.status,
      });
      await this.getCandidate(this.state.status);
      status.status = "";
    }
  }

  getCandidate = async (status: string) => {
    const getRecruiters = async () => {
      const { userId } = getUserData();
      const { data } = await CandidateService.getRecruitersByUid(userId);
      let ruid: string = "";
      data.map((val: any) => {
        ruid += `${val.userId},`;
        return ruid;
      });
      ruid = ruid.substring(0, ruid.length - 1);
      this.setState({ ruid: ruid });
    };

    await getRecruiters();
    const { data } = await CandidateService.getCandidate(
      this.state.query,
      this.state.field,
      this.state.order,
      this.state.status,
      this.state.ruid
    );

    this.setState({ candidateList: data, loading: false });

    data.forEach((status: any) => {
      if (!this.state.statusList.includes(status.status)) {
        this.state.statusList.push(status.status);
      }
    });
    this.state.statusList.forEach((data) => {
      this.state.list.push({
        text: data,
        value: data,
      });
    });
  };

  onSearch = async (value: any) => {
    await this.setState({ query: value });
    await this.setState({ loading: true });
    this.getCandidate(this.state.status);
    await this.setState({ loading: false });
  };

  columns = [
    {
      title: "S/No",
      dataIndex: "dataIndex",
      // fixed: "left",
      width: "70px",

      render: (value: any, item: any, index: number) =>
        (this.state.page - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      // fixed: "left",

      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile",
    },
    {
      title: "Client",
      dataIndex: "clientName",

      sorter: (a: any, b: any) => a.clientName.localeCompare(b.clientName),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: this.state.list,
      onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,
      width: "170px",

      render: (status: any) => (
        <>
          {status === "Documents Uploaded" ? (
            <Tag color={"geekblue"} key={status}>
              {status}
            </Tag>
          ) : status === "Offer Request Rejected" ? (
            <Tag color={"red"} key={status}>
              {status}
            </Tag>
          ) : status === "Candidate Rejected Offer" ? (
            <Tag color={"red"} key={status}>
              {status}
            </Tag>
          ) : (
            <Tag color={"green"} key={status}>
              {status}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Recruiter",
      dataIndex: "recruitername",

      sorter: (a: any, b: any) =>
        a.recruitername.localeCompare(b.recruitername),
    },
    this.props.action,
  ];

  render() {
    return (
      <>
        <div style={styles.searchaAndAddButton}>
          <h5>Candidate</h5>
          <Space style={styles.space}>
            <Search placeholder="Search" onSearch={this.onSearch} enterButton />
          </Space>
          <Table
            dataSource={this.state.candidateList}
            columns={this.columns}
            loading={this.state.loading}
            pagination={{
              onChange: (current: number) => {
                this.setState({ page: current });
              },
            }}
            rowKey="id"
            scroll={{ x: 1000 }}
          />
        </div>
      </>
    );
  }
}

export default withRouter(CandidateTableForAll);
