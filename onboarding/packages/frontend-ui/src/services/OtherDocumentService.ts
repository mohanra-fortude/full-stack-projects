import axios from "axios";
import { constants, storage } from "../constants";

const createOtherdoxId = (file: any, userid: any) => {
  const url = `${constants.BASE_URL}/otherdoc/upload-other-doc-to-${storage}/${userid}`;
  return axios.post(url, file).catch((e) => Promise.reject(e.response.data));
};

const getOtherdoxIdByUserId = (userId: any) => {
  const url = `${constants.BASE_URL}/iddoc/DocsByUserId/${userId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const deactivateOtherdoxId = (data: boolean, id: number) => {
  const url = `${constants.BASE_URL}/otherdoc/deactivate/${id}`;
  return axios.patch(url, data).catch((e) => Promise.reject(e.response.data));
};

const getDocumentByUserId = (usrId: any, fileId: any) => {
  const url = `${constants.BASE_URL}/document/doc-file-from-${storage}/${usrId}/${fileId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const uploadUpdatedDocument = (file: any, id: any) => {
  const userid = localStorage.getItem("userId");
  const url = `${constants.BASE_URL}/otherdoc/update-other-doc-in-${storage}/${userid}/${id}`;
  return axios.patch(url, file).catch((e) => Promise.reject(e.response.data));
};

export default {
  createOtherdoxId,
  deactivateOtherdoxId,
  getOtherdoxIdByUserId,
  getDocumentByUserId,
  uploadUpdatedDocument,
};
