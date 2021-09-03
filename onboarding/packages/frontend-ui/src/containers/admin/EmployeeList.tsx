import {
  Row,
  Table,
  Col,
  Space,
  Button,
  Typography,
  Layout,
  Breadcrumb,
} from "antd";
import React from "react";
import "antd/dist/antd.css";
import { PlusOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import Search from "antd/lib/input/Search";
import EmployeeColumn from "../../components/EmployeeColumn";
import "../../styles/EmployeeList.css";
import { admin_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";

const { Title } = Typography;

const { Content } = Layout;
type State = {
  employeelist: [];
  pagination: {
    current: number;
    pageSize: number;
  };
  loading: boolean;
  order: string;
  field: string;
  query: string;
  role: string;
  inDashboard: boolean;
};

interface Props extends RouteComponentProps<any> {}

class EmployeeList extends React.Component<Props, State> {
  state: State = {
    employeelist: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: true,
    order: "DESC",
    field: "u.updatedAt",
    query: "",
    role: "''",
    inDashboard: false,
  };

  // roleFromLink: any = useLocation();
  // roleData: string = this.roleFromLink.state.record.name;

  componentDidMount() {
    this.checkRoleFromDashboard();
    this.getData(
      this.state.pagination,
      this.state.field,
      this.state.order,
      this.state.query,
      this.state.role
    );
  }

  async checkRoleFromDashboard() {
    if (this.props.history.location.state) {
      const roleID: any = this.props.history.location.state;

      await this.setState({
        role: roleID.roleFromDashboard,
        inDashboard: true,
      });
      await this.getData(
        this.state.pagination,
        this.state.field,
        this.state.order,
        this.state.query,
        this.state.role
      );
    }
  }

  async getData(
    pagination: object,
    field: string,
    order: string,
    query: string,
    role: string
  ) {
    try {
      let tabledata: any = [];
      //pagination added
      Object.values(pagination);

      const { data } = await EmployeeService.getEmployees(
        field,
        order,
        query,
        role
      );

      const excludeSelected = (value: any) =>
        value.userRole !== "Administrator";
      data.filter(excludeSelected).forEach((value: any, key: any) => {
        const tabledatarow: any = {
          fullName: { firstname: value.firstName, lastname: value.lastName },
          email: value.email,
          id: {
            sno: key + 1,
            eid: value.employeeId,
            userId: value.userId,
            mid: value.managerId,
            rid: value.roleId,
          },
          managerName: value.managerName,
          role: [value.userRole],
        };

        const pushRowToTable = () => {
          tabledata.push(tabledatarow);
        };

        pushRowToTable();
      });

      this.setState({
        employeelist: tabledata,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    const sorterCaps = sorter.order === "ascend" ? "ASC" : "DESC";
    //pagination added
    let pagingdata: any = [];

    pagingdata = Object.values(pagination);
    this.state.pagination.current = pagingdata[0];

    if (filters.role == null) {
      if (this.state.inDashboard === true) {
        if (sorter.field === "fullName" || "managerName") {
          const roleID: any = this.props.history.location.state;
          filters.role = roleID.roleFromDashboard;
        }
      } else {
        filters.role = "''";
      }
    } else {
      let RoleValue: string;

      RoleValue = "'";

      filters.role.forEach(function (value: any) {
        RoleValue += "" + value + ",";
      });
      RoleValue += "0'";
      filters.role = RoleValue;
    }

    if (sorter.field === "fullName") {
      sorter.field = "firstName";
    }

    await this.setState({
      field: sorter.field,
      order: sorterCaps,
    });

    this.getData(
      pagination,
      this.state.field,
      this.state.order,
      this.state.query,
      filters.role
    );
  };

  onSearch = async (value: any) => {
    await this.setState({ query: value });
    await this.setState({ loading: true });
    this.getData(
      this.state.pagination,
      this.state.field,
      this.state.order,
      this.state.query,
      this.state.role
    );
    await this.setState({ loading: false });
  };

  render() {
    const { employeelist, pagination, loading } = this.state;

    return (
      <>
        <Layout>
          <Content style={{ padding: "0 50px"}}>
            <Breadcrumb className="breadcrumbs">
              <Breadcrumb.Item className="breadcrumbs_items">
                <Link to={admin_breadcrumbs[0].path}>
                  {admin_breadcrumbs[0].name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{admin_breadcrumbs[2].name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="employee-list">
              <Row align="middle" justify="space-between">
                <Col span={8}>
                  <Title level={2}>Employees</Title>
                </Col>
                <Col>
                  <Space>
                    <Search
                      placeholder=" search"
                      onSearch={this.onSearch}
                      enterButton
                    />
                    <Space>
                      <Link to="/createuser">
                        <Button type="primary">
                          <PlusOutlined />
                          Add Employee
                        </Button>
                      </Link>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    dataSource={employeelist}
                    columns={EmployeeColumn}
                    pagination={pagination}
                    onChange={this.handleTableChange}
                    loading={loading}
                    scroll={{ x: 1000 }}
                    rowKey="email"
                  />
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}

export default EmployeeList;
