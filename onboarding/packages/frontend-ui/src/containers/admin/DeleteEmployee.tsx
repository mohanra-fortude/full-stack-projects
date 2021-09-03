import {
  Button,
  Breadcrumb,
  Col,
  message,
  Popconfirm,
  Row,
  Select,
  Form,
  Divider,
  notification,
} from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import Text from "antd/lib/typography/Text";
import { admin_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";
import CandidateService from "../../services/CandidateService";
import mailService from "../../services/mailService";
import getUserData from "../../utils/UserData";
import NotificationService from "../../services/NotificationService";
import { host } from "../../constants";

function DeleteEmployee() {
  // loggedin admin details, used in notification and email sending
  const { userId, firstName, lastName, email } = getUserData();
  let employeeData: any = useLocation();
  const history = useHistory();
  const role: number = employeeData.state.record.id.rid;
  const roleName: string = employeeData.state.record.role[0];
  const selectedUid: string = employeeData.state.record.id.userId;
  const selectedEmail: number = employeeData.state.record.email;
  const nameOfSelected: string = `${employeeData.state.record.fullName.firstname} ${employeeData.state.record.fullName.lastname}`;
  const selectedEmployeeMid: string = employeeData.state.record.id.mid;
  let [employees, setEmployees] = useState([]);

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 6 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  useEffect(() => {
    const getData = async (role: number) => {
      try {
        const { data } = await EmployeeService.getEmployeesByRole(role);
        let listData: any = [];
        const excludeOtherManagers = (value: any) =>
          value.managerId === selectedEmployeeMid;
        data.forEach((value: any) => {
          const listRow: {} = {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            userId: value.userId,
            userRole: value.userRole,
            employeeId: value.employeeId,
          };
          const pushRowToTable = () => {
            listData.push(listRow);
          };
          pushRowToTable();
        });
        await setEmployees(listData);
      } catch (error) {
        console.log(error);
      }
    };
    getData(role);
  }, []);

  const excludeSelectedEmployeeFromDropdown = (value: any) =>
    value.email !== selectedEmail;

  const filteredEmployees = employees.filter(
    excludeSelectedEmployeeFromDropdown
  );

  filteredEmployees.forEach((val: any, key: number) => {});

  let assignedUid: string = "";
  let assignedEmail: string = "";
  let fullName: string = "";
  let DropdownSelected: boolean = false;

  const DropdownChange = (uid: string) => {
    const getSelectedUidData = (value: any) => value.userId === uid;
    const selectedUserDetails: any =
      filteredEmployees.filter(getSelectedUidData);
    assignedUid = uid;
    assignedEmail = selectedUserDetails[0].email;
    fullName = `${selectedUserDetails[0].firstName} ${selectedUserDetails[0].lastName}`;
    DropdownSelected = true;
  };

  const deleteEmployee = async (sid: string) => {
    await EmployeeService.deleteEmployee(sid);
  };

  const AssignEmployee = async (suid: string, auid: string) => {
    const { data } = await EmployeeService.assignEmployee(suid, auid);
  };
  const updateRecruiter = async (suid: string, auid: string) => {
    const { data } = await CandidateService.updateRecruiter(suid, auid);
  };

  const sendEmail = async (link: string) => {
    let emailToAssigne = {
      sendTo: assignedEmail,
      temp: "CandidateReassigned",
      data: { fullName: `${fullName}`, link: `${link}` },
      subject: "New Candidates assigned",
    };
    const { data } = await mailService.sendMail(emailToAssigne);
  };

  const sendNotification = async () => {
    let notificationData = {
      fromEmail: email,
      subject: `New candidates assigned to ${fullName}`,
      createdBy: userId,
      updatedBy: userId,
      userId: userId,
      toEmail: assignedEmail,
    };
    const { data } = await NotificationService.addNotification(
      notificationData
    );
  };

  const handleDelete = async () => {
    const candidateCount =
      await CandidateService.getNoOfCandidatesUnderRecruiter(selectedUid);
    try {
      if (DropdownSelected === false) {
        message.info("Please select the new Employee");
      } else {
        if (roleName === "Recruiter") {
          await deleteEmployee(selectedUid).catch((e) => console.log(e));
          await updateRecruiter(selectedUid, assignedUid).catch((e) =>
            console.log(e)
          );
          let link: string = `http://${host}/recruiter/manage-candidates`;
          message.loading("Loading");
          if (candidateCount.data.candCount !== "0") {
            await sendEmail(link).catch((e) => console.log(e));
            await sendNotification().catch((e) => console.log(e));
          }
          message.success("Success");
          notification.info({
            message: `Notification `,
            description: "Employee deleted and reassigned sucessfully.!",
          });
          history.push("/admin/manage-employees");
        } else {
          await deleteEmployee(selectedUid).catch((e) => console.log(e));
          await AssignEmployee(selectedUid, assignedUid).catch((e) =>
            console.log(e)
          );
          let link: string =
            roleName === "Human Resource"
              ? `http://${host}/hr/manage-candidates`
              : `http://${host}/account-manager/manage-candidates`;
          message.loading("Loading");
          await sendEmail(link).catch((e) => console.log(e));
          await sendNotification().catch((e) => console.log(e));
          message.success("Success");
          notification.info({
            message: `Notification `,
            description: "Employee deleted and reassigned sucessfully.!",
          });
          history.push("/admin/manage-employees");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (filteredEmployees.length === 0) {
    return (
      <>
        <Breadcrumb
          className="breadcrumbs"
          style={{ marginTop: "1rem", marginLeft: "3rem" }}
        >
          <Breadcrumb.Item className="breadcrumbs_items">
            <Link to={admin_breadcrumbs[0].path}>
              {admin_breadcrumbs[0].name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Delete Employee</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{ marginLeft: "3.2rem", maxWidth: "90%" }}
          className="site-layout-background"
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 450,
              backgroundColor: "white",
              color: "black",
              fontSize: "50px",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            <Row justify="center" align="middle" gutter={16}>
              <Col span={12}>
                <Title level={2}>
                  No {roleName} exists to reassign. Please add one {roleName}.
                </Title>
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        {/* {arr[0]} */}
        <Layout
          style={{ marginTop: "4rem" }}
          className="site-layout-background"
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 450,
              backgroundColor: "white",
              color: "black",
              fontSize: "50px",
              textAlign: "center",
            }}
          >
            <Row justify="start" align="middle" gutter={16}>
              <Col span={24}>
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item label="Assign From" name="username">
                    <Text>{nameOfSelected}</Text>
                  </Form.Item>

                  <Form.Item label="Assign To" name="password">
                    <Select
                      placeholder="Select one"
                      onSelect={(value: any) => DropdownChange(value)}
                    >
                      {filteredEmployees.map((value: any, key: number) => {
                        return (
                          <Select.Option key={key} value={value.userId}>
                            {value.firstName} {value.lastName} (Role-
                            {value.userRole})
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Divider />

                  <Form.Item {...tailLayout}>
                    <Popconfirm
                      title="Are you sure you want to delete and reassign"
                      onConfirm={() => handleDelete()}
                    >
                      <Button type="primary">Delete and reassign</Button>
                    </Popconfirm>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
}

export default DeleteEmployee;
