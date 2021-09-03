import axios from "axios";
import { constants } from "../constants";

const sendMail = (data: any) => {
  const url = `${constants.BASE_URL}/sendmail`;
  return axios.post(url, data).catch((e) => Promise.reject(e.response.data));
};

const sendMailWithCC = (data: any) => {
  const url = `${constants.BASE_URL}/sendmailwithcc`;
  return axios.post(url, data).catch((e) => Promise.reject(e.response.data));
};

function sendMailAndCaptureInNotificationAndWorkflowTables(data: any) {
  const url = `${constants.BASE_URL}/workflow/sendmail-and-capture-in-notification-and-workflow-tables`;
  return axios.post(url, data).catch((e) => Promise.reject(e.response.data));
}

const sendAssetMailToAdmin = (data: any) => {
  const url = `${constants.BASE_URL}/sendAssetEmailToAdmin`;
  return axios.post(url, data).catch((e) => Promise.reject(e.response.data));
};

export default {
  sendMail,
  sendMailWithCC,
  sendMailAndCaptureInNotificationAndWorkflowTables,
  sendAssetMailToAdmin,
};
