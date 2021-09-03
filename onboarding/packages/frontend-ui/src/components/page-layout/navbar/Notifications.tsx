import { Menu } from "antd";
import "./UserInfo.css";
import CandidateService from "../../../services/CandidateService";
import { useEffect, useState } from "react";
import moment from "moment";
import NotificationService from "../../../services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import GetActions from "../../../store/actions/GetAction";
import { AppType } from "../../../types";

const Notifications: React.FC = () => {
  const [notifications, setNotification] = useState([]);
  const [Count, setCount] = useState(0);
  const [unRead, setUnRead] = useState(false);
  const [status, setStatus] = useState(0);
  const userId: any = localStorage.getItem("userId");
  const userEmail: any = localStorage.getItem("email");
  const dispatch = useDispatch();
  const apistate = useSelector<AppType>((store) => store.getapi);
  const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi1 = bindActionCreators(GetActions.dontGet, dispatch);

  const updateNotification = async () => {
    await NotificationService.updateNotification(status, unRead);
  };
  console.log(Count)
  console.log(userId)

  const notifi = async () => {
    const getNotifications = await CandidateService.getNotifications(userEmail);
    setNotification(getNotifications.data);
  };

  useEffect(() => {
    notifi();
    setCount(notifications.length);
  }, []);
  useEffect(() => {
    notifi();
    setCount(notifications.length);
  }, [apistate]);

  let nitfi = (key: any) => {
    setUnRead(true);
    setStatus(key.key);
    updateNotification();
    getapi();
    setTimeout(() => {
      getapi1();
    }, 100);
  };

  const index = 10;
  var removed = notifications.splice(index);
  console.log("indexing", removed);

  return (
    <Menu className="menunotifiy">
      {notifications.map((data: any) => (
        <Menu.Item
          onClick={nitfi}
          key={data.id}
          style={{
            whiteSpace: "normal",
            height: "10vh",
            lineHeight: "1rem",
            color: "black",
          }}
          className="menuitem"
        >
          {data.subject} <br />
          <span
            style={{
              fontSize: "0.6rem",
              color: "grey",
              fontWeight: 900,
              fontStyle: "italic",
            }}
            className="time"
          >
            &nbsp;&nbsp;&nbsp;
            {moment(data.updatedAt).fromNow()} <hr />
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Notifications;
