import {
  Row,
  Col,
  Space,
  Button,
  Typography,
  Breadcrumb,
  Card,
  Form,
  Input,
  Layout,
  FormInstance,
  message,
  Popconfirm,
} from "antd";
import React from "react";
import { Dispatch } from "redux";
import "antd/dist/antd.css";
import Search from "antd/lib/input/Search";
import "../../styles/Form.css";
import ClientColumn from "../../components/ClientColumn";
import ManageClientService from "../../services/ManageClientService";
import { Link } from "react-router-dom";
import { AppType } from "../../types";
import { connect } from "react-redux";
import GetActions from "../../store/actions/GetAction";
import styles from "../../styles/style";
import {
  handleExistingClient,
  handleExistingJob,
  handleExistingJobCode,
} from "../../components/FormValidationFunctions";
const { Title } = Typography;

type State = {
  clientlist: [];
  pagination: {
    current: number;
    pageSize: number;
  };
  loading: boolean;
  order: string;
  field: string;
  query: string;
  job: string;
  name: string;
  createupdate: string;
  clientid: number;
  jobid: number;
  buttonReset: boolean;
  count: number;
};
type Props = {
  apistate: boolean;
  getState: () => void;
  getOffState: () => void;
};

const usersId: any = localStorage.getItem("userId");
class ManageClient extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();

  state: State = {
    clientlist: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    order: "DESC",
    field: "cl.updatedAt",
    query: "",
    job: "",
    name: "",
    createupdate: "create",
    clientid: 0,
    jobid: 0,
    buttonReset: false,
    count: 0,
  };

  componentDidMount() {
    this.getData(
      this.state.pagination,
      this.state.field,
      this.state.order,
      this.state.query
    );
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.apistate !== prevProps.apistate) {
      this.getData(
        this.state.pagination,
        this.state.field,
        this.state.order,
        this.state.query
      );
    }
  }

  async getData(
    pagination: object,
    field: string,
    order: string,
    query: string
  ) {
    try {
      let tabledata: any = [];
      const { data } = await ManageClientService.getClientJob(
        query,
        field,
        order,
        usersId
      );
      data.forEach((value: any, key: any) => {
        if (value.clientName !== null && value.jobCode !== null) {
          const tabledatarow: any = {
            id: {
              sno: key + 1,
              jobc: value.jobId,
              clientc: value.clientId,
              namec: value.clientName,
              isactive: value.isActive,
            },
            cname: value.clientName,
            jcode: value.jobCode,
          };

          const pushRowToTable = () => {
            tabledata.push(tabledatarow);
          };

          pushRowToTable();
        }
      });

      const settable = () => {
        this.setState({
          clientlist: tabledata,
        });
      };
      settable();
    } catch (error) {
      console.log(error);
    }
  }

  onFinish = async (values: any) => {
    const { cname, jcode } = values;
    const ClientData = await handleExistingClient(cname);
    const JobData = await handleExistingJobCode(ClientData.id, jcode);
    const JobCode = await handleExistingJob(jcode);
    if (this.state.createupdate === "create") {
      const data1 = {
        Name: cname,
        Jcode: jcode,
        createdBy: usersId,
      };
      if (ClientData != "No Client Name Found") {
        if (JobData != "No Job Found") {
          message.error("This Jobcode already exists!");
        } else if (JobCode != "No Job Found") {
          message.error("This Jobcode already exists!");
        } else {
          const result = await ManageClientService.createClientJob(data1);
          if (result.status === 201) {
            this.props.getState();
            message.success("Job for Selected Client created successfully!");
            setTimeout(() => {
              this.props.getOffState();
            }, 500);
          }
        }
      } else if (JobCode != "No Job Found") {
        message.error("This Jobcode already exists!");
      } else {
        const result = await ManageClientService.createClientJob(data1);
        if (result.status === 201) {
          this.props.getState();
          message.success("Job for Selected Client created successfully!");
          setTimeout(() => {
            this.props.getOffState();
          }, 500);
        }
      }
    } else {
      const data1 = {
        Name: cname,
        Jcode: jcode,
        cId: this.state.clientid,
        jId: this.state.jobid,
      };
      if (ClientData != "No Client Name Found" || JobData != "No Job Found") {
        message.error("You can't update to existing Client/Job!");
      } else {
        const result = await ManageClientService.UpdateClientAndJob(data1);
        if (result.status === 200) {
          this.props.getState();
          message.success("Client updated successfully!");
          setTimeout(() => {
            this.props.getOffState();
          }, 500);
        }
      }
    }
    this.onReset();
    this.setState({ createupdate: "create" });
  };
  onReset = () => {
    this.formRef.current!.resetFields();
  };

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    const sorterCaps = sorter.order === "ascend" ? "ASC" : "DESC";

    let pagingdata: any = [];

    pagingdata = Object.values(pagination);
    this.state.pagination.current = pagingdata[0];

    if (sorter.field === "cname") {
      sorter.field = "clientName";
    } else if (sorter.field === "jcode") {
      sorter.field = "jobCode";
    }

    await this.setState({
      field: sorter.field,
      order: sorterCaps,
    });

    this.getData(
      this.state.pagination,
      this.state.field,
      this.state.order,
      this.state.query
    );
  };

  onSearch = async (value: any) => {
    await this.setState({ query: value });
    await this.setState({ loading: true });
    this.getData(
      this.state.pagination,
      this.state.field,
      this.state.order,
      this.state.query
    );
    await this.setState({ loading: false });
  };

  getDefaultValues = async (value1: number, value2: number) => {
    this.getData(
      this.state.pagination,
      this.state.field,
      this.state.order,
      this.state.query
    );
    const testdata = await ManageClientService.getClientAndJobById(value1);

    const delta: any = () => {
      this.setState({
        job: testdata.data.jobCode,
        name: testdata.data.client.clientName,
        createupdate: "update",
        clientid: value2,
        jobid: value1,
      });
    };
    delta();
    this.formRef.current!.setFieldsValue({ cname: `${this.state.name}` });
    this.formRef.current!.setFieldsValue({ jcode: `${this.state.job}` });
  };

  render() {
    return (
      <>
        <Layout style={{ maxWidth: "91%", marginLeft: "2.2rem" }}>
          <Breadcrumb
            style={{
              marginLeft: "0.7rem",
              marginTop: "1rem",
              marginBottom: "0.3rem",
            }}
          >
            <Breadcrumb.Item>
              <Link to="/recruiter/workspace">My Workspace</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Manage Client-Jobs</Breadcrumb.Item>
          </Breadcrumb>
          <Card title="" bordered={true} style={{ width: "100%", margin: 10,borderRadius:"10px" }}>
            <Title level={2}>Manage Clients-Jobs</Title>

            <Form
              ref={this.formRef}
              name="control-ref"
              onFinish={this.onFinish}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    className="formfiled"
                    label="Client Name"
                    name="cname"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Client Name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Client Name"
                      className="formfiled"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    className="formfiled"
                    label="Job"
                    name="jcode"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Job Code",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Job Code" className="formfiled" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space align="center">
                  <Button
                    htmlType="button"
                    onClick={this.onReset}
                    type="primary"
                    danger
                    style={styles.borderRadius}
                  >
                    Clear
                  </Button>
                  {/* {this.state.count == 0 ? (
                    <Popconfirm
                      placement="top"
                      title={`Make sure Client Name is Correct, Later You can't Edit the Client Name`}
                      okText="okay, got it!"
                      onConfirm={() => {
                        this.setState({ count: 1 });
                        this.props.getState();
                        setTimeout(() => {
                          this.props.getOffState();
                        }, 500);
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={styles.borderRadius}
                      >
                        Save
                      </Button>
                    </Popconfirm>
                  ) : ( */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={styles.borderRadius}
                  >
                    Save
                  </Button>
                  {/* )} */}
                </Space>
              </Form.Item>
            </Form>

            <Row align="middle" justify="space-between">
              <Col span={8}>{/* <Title level={4}>Client</Title> */}</Col>
              <Col offset={2}>
                <Space>
                  <Search
                    placeholder=" search"
                    onSearch={this.onSearch}
                    enterButton
                  />
                </Space>
              </Col>
            </Row>
            <ClientColumn
              clientdata={this.state.clientlist}
              click={this.getDefaultValues}
              render={this.getData}
              tablechange={this.handleTableChange}
              pagination={this.state.pagination}
              reset={this.onReset}
            />
          </Card>
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
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getState: () => dispatch(GetActions.doGet()),
    getOffState: () => dispatch(GetActions.dontGet()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClient);
