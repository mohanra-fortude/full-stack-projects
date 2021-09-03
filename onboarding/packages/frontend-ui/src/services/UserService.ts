import { UserDataResponseType } from "./../types";
import axios from "axios";
import {
  CandidateType,
  ForgotPasswordResType,
  LoginResponseType,
} from "../types";
import { EmployeeType, UserType } from "../types";
import { constants } from "../constants";
import StorageServices from "./StorageService";

const login = async (email: string, password: string) => {
  const url = `${constants.BASE_URL}/auth/login`;
  return axios
    .post<LoginResponseType>(url, { email, password })
    .catch((e: any) => Promise.reject(e.response.data));
};
const forgotPassword = async (email: string, host1: any) => {
  const url = `${constants.BASE_URL}/auth/forgot`;
  return axios
    .post<ForgotPasswordResType>(url, { email, host1 })
    .catch((e: any) => Promise.reject(e.response.data));
};

const createUser = (data: any) => {
  const url = `${constants.BASE_URL}/auth/register`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.post<UserType>(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const createEmployee = async (data: any) => {
  const url = `${constants.BASE_URL}/auth/employee_userrole`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.post<EmployeeType>(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response));
};

const getEmployee = (id: any) => {
  const url = `${constants.BASE_URL}/employee/managers/${id}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getEmployeeDetailsByUserId = (id: any) => {
  const url = `${constants.BASE_URL}/employee/employee-by-userId/${id}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const getCandidateDetailsByUserId = (id: any) => {
  const url = `${constants.BASE_URL}/candidate/candidate-by-userId/${id}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const getNameByEUserId = (id: any) => {
  const url = `${constants.BASE_URL}/auth/gcByuserId/${id}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const firstTimeLogin = (id: any) => {
  const url = `${constants.BASE_URL}/auth/firstTimeLogin/${id}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};
const getNameByCUserId = (id: any) => {
  const url = `${constants.BASE_URL}/auth/NameByuserId/${id}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const passchange = (userId: any, firstTimeLogin: any) => {
  const url = `${constants.BASE_URL}/auth/passChanged/${userId}`;
  return axios
    .patch<UserDataResponseType>(url, { firstTimeLogin })
    .catch((e) => Promise.reject(e.response.data));
};

const updateToken = (userId: any, userToken: string) => {
  const url = `${constants.BASE_URL}/auth/updateToken/${userId}`;
  return axios
    .patch<UserDataResponseType>(url, { userToken })
    .catch((e) => Promise.reject(e.response.data));
};

const updateEmployee = (data: any) => {
  const url = `${constants.BASE_URL}/auth/register`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const createCandidate = async (
  fname: string,
  lname: string,
  mobile: string,
  email: string,
  jobId: any,
  recruiterId: any,
  roleId: any,
  statusCode: any,
  status: string
) => {
  const url = `${constants.BASE_URL}/candidate`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.post<CandidateType>(
        url,
        {
          fname,
          lname,
          mobile,
          email,
          jobId,
          recruiterId,
          roleId,
          statusCode,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getClient = async () => {
  const url = `${constants.BASE_URL}/client/getAllClients`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const getJob = async (cid: number) => {
  const url = `${constants.BASE_URL}/job/findByClientId?cid=${cid}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getMobile = async (mob: string) => {
  const url = `${constants.BASE_URL}/auth/mobile/${mob}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const getEmail = async (mail: string) => {
  const url = `${constants.BASE_URL}/auth/email/${mail}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const patchCandidate = async (
  fname: string,
  lname: string,
  mobile: number,
  email: string,
  // jobId: any,
  userId: any
) => {
  let data = {
    fname: fname,
    lname: lname,
    mobile: mobile,
    email: email,
    // jobId: jobId,
  };
  console.log("data...", data);
  const url = `${constants.BASE_URL}/candidate/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const changePassword = (data: any) => {
  const url = `${constants.BASE_URL}/auth/changepassword`;
  return axios.patch(url, data).catch((e) => Promise.reject(e));
};
const changeLastLogin = async (userId: any) => {
  const url = `${constants.BASE_URL}/auth/lastLogin/${userId}`;
  return axios.patch(url).catch((e) => Promise.reject(e));
};

const uploadProfileImage = (data: any, userId: any) => {
  const url = `${constants.BASE_URL}/auth/upload-profile-image-to-aws/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getUploadedProfileImage = async () => {
  const picture = await window.localStorage.getItem("profilePicture");
  const url = `${constants.BASE_URL}/auth/profile-image-from-aws/${picture}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const postNotification = async (
  emailFrom: string,
  emailTo: string,
  description: string,
  userId: any
) => {
  const url = `${constants.BASE_URL}/notification`;
  return axios
    .post(url, { emailFrom, emailTo, description, userId })
    .catch((e) => Promise.reject(e));
};
export default {
  createUser,
  createEmployee,
  updateEmployee,
  getEmployee,
  login,
  forgotPassword,
  getEmployeeDetailsByUserId,
  getCandidateDetailsByUserId,
  createCandidate,
  getClient,
  getJob,
  patchCandidate,
  changePassword,
  uploadProfileImage,
  getUploadedProfileImage,
  changeLastLogin,
  getNameByEUserId,
  getNameByCUserId,
  passchange,
  updateToken,
  firstTimeLogin,
  getMobile,
  getEmail,
  postNotification,
};
