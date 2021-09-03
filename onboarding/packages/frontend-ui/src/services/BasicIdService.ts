import axios from "axios";
import { constants, storage } from "../constants";

const createBasicId = (file: any, userid: any) => {
  const url = `${constants.BASE_URL}/iddoc/upload-id-doc-to-${storage}/${userid}`;
  return axios.post(url, file).catch((e) => Promise.reject(e.response.data));
};

const getBasicId = () => {
  const url = `${constants.BASE_URL}/iddoc`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const getBasicIdByUserId = (userId: any) => {
  const url = `${constants.BASE_URL}/iddoc/DocsByUserId/${userId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const deactivateBasicId = (data: boolean, id: number) => {
  const url = `${constants.BASE_URL}/iddoc/deactivate/${id}`;
  return axios.patch(url, data).catch((e) => Promise.reject(e.response.data));
};

const getDocumentByUserId = (usrId: any, fileId: any) => {
  const url = `${constants.BASE_URL}/document/doc-file-from-${storage}/${usrId}/${fileId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const uploadUpdatedDocument = (file: any, id: any) => {
  const userid = localStorage.getItem("userId");
  const url = `${constants.BASE_URL}/iddoc/update-id-doc-in-${storage}/${userid}/${id}`;
  return axios.patch(url, file).catch((e) => Promise.reject(e.response.data));
};

export default {
  createBasicId,
  getBasicId,
  deactivateBasicId,
  getBasicIdByUserId,
  getDocumentByUserId,
  uploadUpdatedDocument,
};
