import React, { useEffect, useState } from "react";
import "./PageNavBar.css";
import { Avatar, Dropdown, Badge, Menu } from "antd";
import UserInfo from "./UserInfo";
import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import getUserData from "../../../utils/UserData";
import Notifications from "./Notifications";
import CandidateService from "../../../services/CandidateService";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import GetActions from "../../../store/actions/GetAction";
import { AppType } from "../../../types";

type Props = {
  toggle: () => void;
  toggleAllowed: boolean;
};

const PageNavBar: React.FC<Props> = ({ toggle, toggleAllowed }) => {
  const [count, setCount] = useState(0);
  const [vissible, setVissible] = useState(false);
  const userId: any = localStorage.getItem("userId");
  const email: any = localStorage.getItem("email");
  var { firstName } = getUserData();
  const dispatch = useDispatch();
  const apistate = useSelector<AppType>((store) => store.getapi);
  const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi1 = bindActionCreators(GetActions.dontGet, dispatch);

  const notifiy = async () => {
    const getNotifications = await CandidateService.getNotifications(email);
    setCount(getNotifications.data.length);
  };
  const change = () => {
    setVissible(true);
    setTimeout(() => {
      setVissible(false);
    }, 2000);
  };
  const notifi = () => {
    return (
      <div>
        <Notifications />
      </div>
    );
  };
  useEffect(() => {
    notifiy();
    notifi();
  }, []);
  useEffect(() => {
    notifiy();
    notifi();
  }, [apistate]);

  return (
    <div className="navbar">
      <div
        className="navbar__item icon"
        onClick={() => {
          if (toggleAllowed) toggle();
        }}
      >
        <MenuOutlined />
      </div>
      <div className="navbar__item icon spacer"></div>

      {count === 0 ? (
        <Dropdown
          visible={vissible}
          overlay={
            <Menu className="menunotifiy1">
              <Menu.Item
                onClick={() => setVissible(false)}
                className="menuitem1"
              >
                You are all caught up..!
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
        >
          <div className="navbar__item icon">
            <Badge
              count={count}
              size="default"
              className="badgecount"
              style={{ marginTop: 10 }}
            >
              <span className="bellnotifi">
                <BellOutlined sizes="large" onClick={() => change()} />
              </span>
            </Badge>
          </div>
        </Dropdown>
      ) : (
        <Dropdown overlay={<Notifications />} placement="bottomRight">
          <div className="navbar__item icon">
            <Badge
              count={count}
              size="default"
              className="badgecount"
              style={{ marginTop: 10 }}
            >
              <span className="bellnotifi">
                <BellOutlined sizes="large" />
              </span>
            </Badge>
          </div>
        </Dropdown>
      )}

      <Dropdown overlay={UserInfo} placement="bottomRight" arrow>
        <div className="navbar__item icon end-icon">
          <Avatar className="avatar" size="large">
            {firstName.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      </Dropdown>
    </div>
  );
};

export default PageNavBar;
