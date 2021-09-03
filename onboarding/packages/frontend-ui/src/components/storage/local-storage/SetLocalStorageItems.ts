import { UserDataResponseType } from "../../../types";

function SetItemsInLocalStorage(data: UserDataResponseType) {
  let date: any = "";
  if (
    data.lastLogin === "" ||
    data.lastLogin === null ||
    data.lastLogin === undefined
  ) {
    date = "";
  } else {
    date = new Date(data.lastLogin);
  }
  var dateString = String(date);
  window.localStorage.setItem("lastLogin", dateString);
  window.localStorage.setItem("firstName", data.firstName);
  window.localStorage.setItem("lastName", data.lastName);
  window.localStorage.setItem("mobile", data.mobile);
  window.localStorage.setItem("role", data.userRole);
  window.localStorage.setItem("userEmail", data.email);
  window.localStorage.setItem("userId", data.userId);
  window.localStorage.setItem("profilePicture", data.profilePicture);
  window.localStorage.setItem("firstTimeLogin", data.firstTimeLogin);
}

export default SetItemsInLocalStorage;
