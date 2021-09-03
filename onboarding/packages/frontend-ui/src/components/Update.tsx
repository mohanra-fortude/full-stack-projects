import {
  message,
  Form,
  Input,
  Select,
  Button,
  Space,
  Col,
  Row,
  Card,
  Breadcrumb,
  Popconfirm,
  Modal,
  Divider,
} from "antd";
import Layout from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Typography } from "antd";
import { RoleType } from "../types";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import { admin_breadcrumbs } from "../components/Breadcrumb/allBreadCrumbs";
import Text from "antd/lib/typography/Text";
import EmployeeService from "../services/EmployeeService";
import CandidateService from "../services/CandidateService";
import styles from "../styles/style";
import {
  handleExistingEmail,
  handleExistingMobile,
  handleExistingPhone,
} from "../components/FormValidationFunctions";

const { Title } = Typography;
const { Option } = Select;

type LayoutType = Parameters<typeof Form>[0]["layout"];

type Props = {
  rolelist: RoleType[];
  data: any;
  emails: string;
  mobiles: number;
  managers: number;
  click: (value: any) => void;
  reports: [];
  usersId: string;
  managersName: string;
  designations: string;
  empDataUpdate: any;
  tempfname: string;
  templname: string;
  tempemail: string;
  tempdesig: string;
  tempmobile: string;
  temphome: string;
  mainrole: number;
  changeFname: (value: any) => void;
  changeLname: (value: any) => void;
  changeDesig: (value: any) => void;
  changeEmail: (value: any) => void;
  changeMobile: any;
  changeHomephone: any;
  // managerData: any;
};
let employee: any = [];
const Update: React.FC<Props> = ({
  rolelist,
  data,
  click,
  reports,
  usersId,
  designations,
  empDataUpdate,
  tempfname,
  templname,
  tempdesig,
  tempmobile,
  tempemail,
  temphome,
  mainrole,
  changeFname,
  changeLname,
  changeDesig,
  changeEmail,
  changeMobile,
  changeHomephone,
}) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const [formmodal] = Form.useForm();
  const [empData, changeEmp] = useState();
  const [userData, changeUser] = useState({ mobile: 0 });
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [tempData, setTempData] = useState(data);
  const [role, setRole] = useState();
  const [existMobile, setExistMobile] = useState("");
  const [existPhone, setExistPhone] = useState("");
  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    setTempData(data);
    setRole(data.roleId);
    form.setFieldsValue({ prefix: "+91", phonehome: "+91" });
  }, []);

  const noRerender = () => {
    if (data !== empData) {
      changeEmp(data);
      changeUser(data.userId);

      const getData = async (role: any) => {
        try {
          const employeeData = await EmployeeService.getEmployeesByRole(role);
          filterEmploye(employeeData);
        } catch (error) {
          console.log(error);
        }
      };

      getData(data.roleId);

      form.setFieldsValue({
        fname: data.firstName,
        lname: data.lastName,
        designation: data.designation,
        mobnumber: data.mobile,
        home: data.homePhone,
        email: data.email,
        role: data.userRole,
        manageId: data.managerId,
      });
    }
  };

  noRerender();
  const filterEmploye = (employeeData: any) => {
    employee = employeeData.data.filter(
      (value: any) => value.email !== data.email
    );
  };

  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 12 },
          wrapperCol: { span: 6 },
        }
      : null;

  const onFinish = async (values: any) => {
    const {
      fname,
      lname,
      mobnumber,
      home,
      manageId,
      email,
      designation,
      role,
    } = values;

    let temprole;
    if (role === "Leadership") {
      temprole = 2;
    } else if (role === "Account Manager") {
      temprole = 3;
    } else if (role === "Human Resource") {
      temprole = 4;
    } else if (role === "Recruiter") {
      temprole = 5;
    } else {
      temprole = role;
    }

    const data = {
      firstName: fname,
      lastName: lname,
      mobile: mobnumber,
      email: email,
      roleId: temprole,
      managerId: manageId,
      designation: designation,
      homePhone: home,
      userId: usersId,
    };
    await handleExistingEmail(changeEmail);
    await handleExistingMobile(existMobile);
    await handleExistingPhone(existPhone);
    const userData = await UserService.updateEmployee(data);
    if (userData.status === 200) {
      message.success("Employee updated successfully");
      history.push("/admin/manage-employees");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    history.push("/admin/manage-employees");
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );
  const phoneHome = (
    <Form.Item name="phonehome" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  const onFinishModal = async (values: any) => {
    const { assignto, modalrole, modalmanageId } = values;
    let temprole1;
    if (modalrole === "Leadership") {
      temprole1 = 2;
    } else if (modalrole === "Account Manager") {
      temprole1 = 3;
    } else if (modalrole === "Human Resource") {
      temprole1 = 4;
    } else if (modalrole === "Recruiter") {
      temprole1 = 5;
    } else {
      temprole1 = modalrole;
    }

    const data = {
      firstName: tempfname,
      lastName: templname,
      mobile: tempmobile,
      email: tempemail,
      roleId: temprole1,
      managerId: modalmanageId,
      designation: tempdesig,
      homePhone: temphome,
      userId: usersId,
    };
    const recdata = {
      newrec: assignto,
    };
    if (mainrole === 5) {
      const updateStatus =
        await CandidateService.updateCandidatesToNewRecruiter(usersId, recdata);
    } else {
      const updateStatus = await EmployeeService.assignEmployee(
        usersId,
        assignto
      );
    }

    await UserService.updateEmployee(data);
    history.push("/admin/manage-employees");
  };
  return (
    <Layout style={{ maxWidth: "92%", marginLeft: "2rem" }}>
      <Breadcrumb className="breadcrumbs" style={{ marginLeft: "1rem" }}>
        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={admin_breadcrumbs[0].path}>
            {admin_breadcrumbs[0].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={admin_breadcrumbs[2].path}>
            {admin_breadcrumbs[2].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update Employee</Breadcrumb.Item>
      </Breadcrumb>

      {employee.length !== 0 ? (
        <Modal
          width={1000}
          title="Role Reassignement and Updation"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            {...formItemLayout}
            layout={formLayout}
            name="basicmodal"
            initialValues={{
              remember: true,
              // fname: empData.firstName,
            }}
            onFinish={onFinishModal}
            onFinishFailed={onFinishFailed}
            form={formmodal}
          >
            <Row>
              <Col xs={24} xl={12}>
                <Form.Item label="Assign From" name="fullName">
                  <Text
                    style={{
                      width: 400,
                    }}
                  >
                    {data.fullName}
                  </Text>
                </Form.Item>
              </Col>

              <Col xs={24} xl={12}>
                <Form.Item
                  label="Assign To"
                  name="assignto"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Name"
                    style={{
                      width: 400,
                    }}
                    // onChange={(value: any) => DropdownChange(value)}
                  >
                    {employee.map((val: any, index: number) => (
                      <Select.Option value={val.userId} key={index}>
                        {val.firstName + " " + val.lastName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item
                  label="Role"
                  name="modalrole"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Please Select"
                    style={{
                      width: 400,
                    }}
                    onSelect={(value) => {
                      click(value);
                    }}
                  >
                    {rolelist.map((val: any, index: number) => (
                      <Select.Option value={val.id} key={index}>
                        {val.description}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} xl={12}>
                {/* {/ <label>Reporting Manager</label> /} */}
                <Form.Item
                  className="formfiled"
                  name="modalmanageId"
                  rules={[{ required: true }]}
                  label="Reporting Manager"
                >
                  <Select
                    placeholder="Please Select"
                    style={{
                      width: 400,
                    }}
                  >
                    {reports.map((val: any, index: number) => (
                      <Select.Option value={val.userId} key={index}>
                        {val.firstName + " " + val.lastName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Form.Item>
              <Space align="center">
                <Button type="primary" htmlType="submit">
                  Update and reassign
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <Modal
          width={1000}
          title="Role Reassignement and Updation"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <h2>
            No reassignement possible. Cannot change roles at the moment!!
          </h2>
        </Modal>
      )}
      <Card title="" bordered={true} style={{ width: "100%", margin: 10 }}>
        <Title level={2}>Update Employee</Title>
        <Form
          {...formItemLayout}
          layout={formLayout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row>
            <Col xs={24} xl={12}>
              <Form.Item
                className="formfiled"
                label="First Name"
                name="fname"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                  {
                    pattern: /^[A-Za-z ]+$/,
                    message: "Only Alphabets are allowed",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Name"
                  style={{
                    width: 400,
                  }}
                  onBlur={(value) => changeFname(value.currentTarget)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                className="formfiled"
                label="Last Name"
                name="lname"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                  {
                    pattern: /^[A-Za-z ]+$/,
                    message: "Only Alphabets are allowed",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Name"
                  style={{
                    width: 400,
                  }}
                  onBlur={(value) => changeLname(value.currentTarget)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} xl={12}>
              <Form.Item
                className="formfiled"
                label="Designation"
                name="designation"
                rules={[
                  {
                    required: true,
                    message: "Please input Designation!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Designation"
                  style={{
                    width: 400,
                  }}
                  onBlur={(value) => changeDesig(value.currentTarget)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                className="formfiled"
                name="email"
                label="Email ID"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter Email"
                  style={{
                    width: 400,
                  }}
                  onChange={(e) => {
                    changeEmail(e.target.value);
                  }}
                  // value={email}
                  // onBlur={(value) => changeEmail(value.currentTarget)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                className="formfiled"
                label="Mobile Number"
                name="mobnumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    min: 10,
                    message: "Minimum 10 digits are required",
                  },
                  {
                    max: 10,
                    message: "Maximum 10 digits are required",
                  },
                ]}
              >
                <Input
                  type="number"
                  addonBefore={prefixSelector}
                  style={{ width: 400 }}
                  placeholder="Enter Phone number"
                  onChange={(e) => {
                    setExistMobile(e.target.value);
                  }}
                  value={existMobile}
                />
              </Form.Item>
            </Col>

            <Col xs={24} xl={12}>
              <Form.Item
                name="home"
                label={<b style={{ fontWeight: 600 }}>Phone Number</b>}
                dependencies={["mobnumber"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("mobnumber") !== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Phone should be different")
                      );
                    },
                  }),
                  {
                    min: 10,
                    message: "Minimum 10 digits required",
                  },
                  {
                    max: 10,
                    message: "Maximum 10 digits required",
                  },
                ]}
              >
                <Input
                  type="number"
                  addonBefore={phoneHome}
                  style={{ width: 400 }}
                  placeholder="Enter Phone number"
                  onChange={(e) => {
                    setExistPhone(e.target.value);
                  }}
                  value={existPhone}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Popconfirm
                placement="top"
                title={`Are you sure you want to update role?`}
                onConfirm={() => {
                  setVisible(true);
                  formmodal.setFieldsValue({
                    modalrole: data.userRole,
                    modalmanageId: data.managerId,
                  });
                }}
                okText="Yes"
                cancelText="No"
              >
                <Form.Item
                  className="formfiled"
                  label="Role"
                  name="role"
                  rules={[{ required: true }]}
                >
                  <Input
                    readOnly
                    // addonBefore={phoneHome}
                    style={{ width: 400 }}
                    // placeholder="Enter Phone number"
                  />
                </Form.Item>
              </Popconfirm>
            </Col>

            <Col xs={24} xl={12}>
              <Form.Item
                className="formfiled"
                label="Reporting Manager"
                name="manageId"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    width: 400,
                  }}
                >
                  {reports.map((val: any, index: number) => (
                    <Select.Option value={val.userId} key={index}>
                      {val.firstName + " " + val.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space align="center">
              <Button
                htmlType="button"
                onClick={onReset}
                type="primary"
                danger
                style={styles.borderRadius}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={styles.borderRadius}
              >
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default Update;
