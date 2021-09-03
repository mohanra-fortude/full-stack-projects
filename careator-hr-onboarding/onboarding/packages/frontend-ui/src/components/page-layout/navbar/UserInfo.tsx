import { Menu } from "antd";
import { Link } from "react-router-dom";
import UserService from "../../../services/UserService";
import getUserData from "../../../utils/UserData";
import "./UserInfo.css";

function UserInfo() {
  var { userId } = getUserData();

  //changing LastLogin
  const changeLastLogin = async () => {
    await UserService.changeLastLogin(userId);
  };
  //clearing All cookies
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
  // function deleteAllCookie() {
  //   document.cookie = name + cookie_version_control + "=; Max-Age=-99999999;";
  // }

  return (
    <Menu className="userinfo">
      <Menu.Item key="view-profile" className="userinfo__item">
        <Link to="/view-profile">View Profile</Link>
      </Menu.Item>
      <Menu.Item
        className="userinfo__item"
        key="sign-out"
        onClick={() => {
          deleteAllCookies(); //clearing cookies
          localStorage.clear(); //clearing localStorage
          sessionStorage.clear(); //clearing SessionStorage
          changeLastLogin(); //changeing lastLogin time
          window.location.href = "/";
        }}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );
}

export default UserInfo;
