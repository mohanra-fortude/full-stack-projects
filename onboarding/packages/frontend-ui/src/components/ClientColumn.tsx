import { Space, Switch, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import ManageClientService from "../services/ManageClientService";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import GetActions from "../store/actions/GetAction";

type Props = {
  clientdata: [];
  click: (value1: any, value2: any) => void;
  render: any;
  tablechange: any;
  pagination: any;
  reset: any;
};

const ClientColumn: React.FC<Props> = ({
  clientdata,
  click,
  tablechange,
  pagination,
}) => {
  const [jobId, setJobId] = useState();
  const [clientId, setClientId] = useState();
  const dispatch = useDispatch();
  const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi1 = bindActionCreators(GetActions.dontGet, dispatch);
  const onChangeSwitch = (checked: any, recJob: any) => {
    ManageClientService.deleteClient(checked, recJob);

    getapi();
    setTimeout(() => {
      getapi1();
    }, 500);
  };
  const clientColumn = [
    {
      title: "S/No",
      dataIndex: "id",
      // key: "jcode",
      render: (id: any) => `${id.sno}`,
    },
    {
      title: "Client",
      dataIndex: "cname",
      // key: "jcode",
      render: (cname: any) => (!cname ? "No Client" : `${cname}`),
      sorter: true,
    },
    {
      title: "Job",
      dataIndex: "jcode",
      // key: "jcode",
      render: (jcode: any) => `${jcode}`,
      sorter: true,
    },

    {
      title: "Action",
      dataIndex: "Action",
      // key: "jcode",
      render: (id: any, record: any) => (
        <>
          <Space align="center" size="large">
            <EditOutlined
              onClick={() => {
                click(record.id.jobc, record.id.clientc);
              }}
              style={{ fontSize: "25px", color: "#40A9FF", cursor: "pointer" }}
            />
            <Switch
              checkedChildren="Active"
              unCheckedChildren="InActive"
              checked={record.id.isactive === 1 ? true : false}
              onChange={(checked: any) => {
                setJobId(record.id.jobc);
                setClientId(record.id.clientc);

                onChangeSwitch(checked, record.id.jobc);
              }}
            />
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={clientColumn}
        dataSource={clientdata}
        pagination={pagination}
        onChange={tablechange}
        scroll={{ x: 1000 }}
        rowKey="jcode"
      />
    </>
  );
};

export default ClientColumn;
