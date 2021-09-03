import React, { Component } from "react";

import CandidateTable from "../../components/CandidateTable";
import Layout from "antd/lib/layout/layout";
import { Breadcrumb, Button, Space } from "antd";
import Search from "antd/lib/input/Search";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import CandidateService from "../../services/CandidateService";
import styles from "../../styles/RecuriterManageCandidatesStyle";
import { connect } from "react-redux";
import { AppType } from "../../types";
import getUserData from "../../utils/UserData";

type Props = {
  apistate: boolean;
} & RouteComponentProps;

type State = {
  candidayelist: [];
  pagination: {
    current: number;
    pageSize: number;
  };
  loading: boolean;
  order: string;
  field: string;
  query: string;
  rerender: boolean;
  status: string;
};

class RecruiterManageCandidates extends Component<Props, State> {
  state: State = {
    candidayelist: [],
    pagination: {
      current: 1,
      pageSize: 4,
    },
    loading: true,
    order: "DESC",
    field: "u.updatedAt",
    query: "",
    rerender: true,
    status: "",
  };

  statusList: string[] = [];

  list: any = [];

  componentDidMount() {
    this.filterFromDashboard();
    this.getCandidate(this.state.status);
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.apistate !== prevProps.apistate) {
      this.getCandidate(this.state.status);
      this.filterFromDashboard();
    }
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

  rerender = () => {
    this.setState({ rerender: !this.state.rerender });
  };

  getCandidate = async (status: string) => {
    this.list = [];
    const { userId } = getUserData();
    const { data } = await CandidateService.getCandidate(
      this.state.query,
      this.state.field,
      this.state.order,
      this.state.status,
      userId
    );
    this.setState({ candidayelist: data });
    data.forEach((status: any) => {
      if (!this.statusList.includes(status.status)) {
        this.statusList.push(status.status);
      }
    });
    this.statusList.forEach((data) => {
      this.list.push({
        text: data,
        value: data,
      });
    });
  };

  onSearch = async (value: any) => {
    await this.setState({ query: value });
    await this.setState({ loading: true });
    this.getCandidate(this.state.status);
  };

  render() {
    return (
      <>
        <Layout style={styles.layout}>
          <Breadcrumb style={styles.breadcrumb}>
            <Breadcrumb.Item>
              <Link to="/recruiter/workspace">My Workspace</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Manage Candidates</Breadcrumb.Item>
          </Breadcrumb>
          <div style={styles.searchaAndAddButton}>
            <h5>Candidate</h5>
            <Space style={styles.space}>
              <Search
                placeholder="Search"
                onSearch={this.onSearch}
                enterButton
              />

              <Link to="/recruiter/createcandidatemain">
                <Button type="primary" >
                  <PlusOutlined />
                  Add Candidate
                </Button>
              </Link>
            </Space>

            <CandidateTable
              candidateData={this.state.candidayelist}
              statusList={this.list}
              render={this.getCandidate}
            />
          </div>
        </Layout>
      </>
    );
  }
}
const mapStateToProps = (state: AppType) => {
  return {
    apistate: state.getapi,
  };
};
export default connect(mapStateToProps)(withRouter(RecruiterManageCandidates));
