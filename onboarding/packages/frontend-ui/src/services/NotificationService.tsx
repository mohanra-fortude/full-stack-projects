import axios from "axios";
import { constants } from "../constants";
import { notificationType } from "../types";

const addNotification = (row:any) => {
  const url = `${constants.BASE_URL}/notification/sendnotif`;
  return axios.post(url, row);
};
const updateNotification = (id: any, unRead: any) => {
  const url = `${constants.BASE_URL}/notification/${id}`;
  return axios.patch<notificationType>(url, {unRead});
};

export default {
  addNotification,
  updateNotification,
};