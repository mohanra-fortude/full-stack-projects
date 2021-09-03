import React, { useEffect, useState } from "react";
import AppRouter from "./route/AppRouter";
import LoginRouter from "./route/LoginRouter";
import ResetPassword from "./containers/ResetPassword";
import "./App.css";
import IdleTimeout from "./containers/IdleTimeout";
import StorageService from "./services/StorageService";
import UserService from "./services/UserService";
import * as CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import LoadingActions from "./store/actions/LoadingAction";
import { bindActionCreators } from "redux";
import { AppType } from "./types";
function App() {
  function loginAction() {
    sessionStorage.setItem("isLogged", "true");
  }
  let logged = sessionStorage.getItem("isLogged");
  useEffect(() => {
    if (logged === null || logged === "null") {
      logged = "false";
    }
  }, [logged]);
  const [cookiePassword, setCookiePassword] = useState(false);
  const [decPassword, setDecpassword] = useState("");
  const dispatch = useDispatch();
  const showLoader = bindActionCreators(LoadingActions.showLoader, dispatch);
  const hideLoader = bindActionCreators(LoadingActions.showLoader, dispatch);
  const loadder: any = useSelector<AppType>((store) => store.loading);
  function renderOnBasisOfLogin(logged: any) {
    if (logged === "true") {
      return (
        <>
          <IdleTimeout></IdleTimeout>
          <AppRouter />
        </>
      );
    } else {
      if (window.location.pathname.split("/")[1] === "resetPassword") {
        return <ResetPassword />;
      } else {
        return <LoginRouter loginAction={loginAction} />;
      }
    }
  }
  //function for getting cookies
  function getCookie(name: any) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  let email1: any = localStorage.getItem("email");

  let password1: any = getCookie("access_key");
  let key = CryptoJS.enc.Utf8.parse("4512631236589784");
  let iv = CryptoJS.enc.Utf8.parse("4512631236589784");

  // Method for the decrypt string  Using CryptoJs
  function decryptUsingAES256(decString: any) {
    var decrypted = CryptoJS.AES.decrypt(decString, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    setDecpassword(decrypted.toString(CryptoJS.enc.Utf8));
  }
  console.log("email____", email1);
  useEffect(() => {
    if (password1) {
      setCookiePassword(true);
      decryptUsingAES256(password1);
    }
    // if (email1 === null || email1 === "null") {
    //   window.location.pathname = "/";
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    try {
      const { data } = await UserService.login(email1, decPassword);

      await StorageService.storeData("token", data.access_token);

      loginAction();
      showLoader();

      setCookiePassword(false);
      //window.location.reload();
      hideLoader();
    } catch (e: any) {
      hideLoader();
    }
  };
  const login1 = () => {
    login();
  };

  useEffect(() => {
    const goBack = () => {
      if (email1 === null || email1 === "null") {
        sessionStorage.clear();
      }
    };
    goBack();
  }, []);

  return (
    <>
      {cookiePassword === true && email1
        ? login1()
        : renderOnBasisOfLogin(logged)}
    </>
  );
}

export default App;
