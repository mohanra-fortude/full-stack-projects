import axios from "axios";
import { constants } from "../constants";
import { ClientType } from "../types";

const createClientJob = (data: any) => {
  const url = `${constants.BASE_URL}/client`;
  return axios
    .post<ClientType>(url, data)
    .catch((e) => Promise.reject(e.response.data));
};

const getClientJob = (
  query: string,
  field: string = "cl.updatedAt",
  order: string = "DESC",
  usersId: string
) => {
  const url = `${constants.BASE_URL}/client?q=${query}&f=${field}&o=${order}&userId=${usersId}`;
  return axios.get(url);
};

const getClientAndJobById = (id: any) => {
  const url = `${constants.BASE_URL}/job/${id}`;
  return axios.get(url);
};

const getClientByClientName = (client: any) => {
  const url = `${constants.BASE_URL}/client/Name/${client}`;
  return axios.get(url);
};

const getClientAndJobByIdAndJobName = (id: any, jobcode: any) => {
  const url = `${constants.BASE_URL}/job/findJobsByClientIdAndJobName?cid=${id}&jcode=${jobcode}`;
  return axios.get(url);
};

const getJobName = (jobcode: any) => {
  const url = `${constants.BASE_URL}/job/findJobsByJobName?jcode=${jobcode}`;
  return axios.get(url);
};

const UpdateClientAndJob = (data: any) => {
  const url = `${constants.BASE_URL}/client`;
  return axios.patch(url, data);
};

const deleteClient = (activeState: boolean, id: string) => {
  let data = {
    isActive: activeState,
  };
  const url = `${constants.BASE_URL}/job/deActivation/${id}`;
  return axios.patch(url, data).catch((e) => {
    Promise.reject(e);
  });
};

export default {
  createClientJob,
  getClientJob,
  UpdateClientAndJob,
  getClientAndJobById,
  deleteClient,
  getClientAndJobByIdAndJobName,
  getClientByClientName,
  getJobName,
};
