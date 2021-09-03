import { Modal } from "antd";
import React, { useRef } from "react";
import IdleTimer from "react-idle-timer";
import UserService from "../services/UserService";

function IdleTimeout(props: any) {
  const idleTimerRef: any = useRef(null);
  const sessionTimeoutRef: any = useRef(null);
  const userId = localStorage.getItem("userId");
  //changing LastLogin time
  const changeLastLogin = async () => {
    await UserService.changeLastLogin(userId);
  };
  //logout function
  const logout = () => {
    deleteAllCookies(); //deleting cookies
    sessionStorage.setItem("isLogged", "false");
    changeLastLogin(); // changing lastLogin time
    window.location.reload(); //added reload instead of giving window.location.pathname='/'
  };
  function warning() {
    Modal.warning({
      title: "Session has been idle over its time limit",
      content:
        "You have been disconnected.\nPress ok to log in back and continue session.",
      onOk() {
        deleteAllCookies(); //deleting cookies
        logout();
      },
    });
  }
  //function for deleting cookies
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  const onIdle = () => {
    deleteAllCookies();
    warning();
    //automatic login after 5 min still user is idel after idel time out popup
    sessionTimeoutRef.current = setTimeout(logout, 5 * 60 * 1000);
  };
  return (
    <div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={15 * 60 * 1000}
        onIdle={onIdle}
      ></IdleTimer>
    </div>
  );
}

export default IdleTimeout;
