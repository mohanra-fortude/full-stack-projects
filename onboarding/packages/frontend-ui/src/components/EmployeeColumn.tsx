import { Space, Tag } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

const EmployeeColumn = [
  {
    title: "S/No",
    dataIndex: "id",
    // key: "email",
    render: (id: any) => `${id.sno}`,
  },
  {
    title: "Name",
    dataIndex: "fullName",
    // key: "email",
    sorter: true,
    render: (fullName: any) => `${fullName.firstname} ${fullName.lastname}`,
  },
  {
    title: "Email Id",
    dataIndex: "email",
    // key: "email",
  },
  {
    title: "Rept.Manager",
    dataIndex: "managerName",
    // key: "email",
    sorter: true,
    render: (fullName: any) => (!fullName ? "-" : `${fullName}`),
  },
  {
    title: "Role",
    dataIndex: "role",
    // key: "email",
    render: (roles: any) => (
      <>
        {roles.map((role: any, key: number) => {
          let color = role.length > 5 ? "geekblue" : "green";
          if (role === "Recruiter") {
            color = "volcano";
          }
          if (role === "Leadership") {
            color = "purple";
          }
          if (role === "Account Manager") {
            color = "green";
          }
          if (role === "Human Resource") {
            color = "cyan";
          }
          if (role === "Candidate") {
            color = "geekblue";
          }
          return (
            <Tag color={color} key={key}>
              {role.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
    filters: [
      { text: "Leader", value: "2" },
      { text: "AM", value: "3" },
      { text: "HR", value: "4" },
      { text: "Recruiter", value: "5" },
    ],
  },

  {
    title: "Actions",
    dataIndex: "action",
    // key: "email",
    render: (id: any, record: any) => (
      <>
        <Space align="center" size="large">
          <Link to={`/update/${record.id.userId}`}>
            <EditOutlined style={{ fontSize: "25px" }} />
          </Link>

          <Link
            to={{
              pathname: "/admin/delete-employee",
              state: { record: record },
            }}
          >
            <DeleteOutlined style={{ fontSize: "25px" }} />
          </Link>
        </Space>
      </>
    ),
  },
];

export default EmployeeColumn;
