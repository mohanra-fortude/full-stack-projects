import axios from "axios";
import { constants, storage } from "../constants";

const addEducationDetail = (data: any, id: string | null) => {
  const url = `${constants.BASE_URL}/education/upload-education-doc-to-${storage}/${id}`;
  return axios.post(url, data).catch((e) => {
    Promise.reject(e);
  });
};

const getEducationDetail = (userId: string) => {
  const url = `${constants.BASE_URL}/education/educationDetails/${userId}`;
  return axios.get(url);
};

const deleteEducationDetail = (id: number) => {
  const url = `${constants.BASE_URL}/education/${id}`;
  return axios.delete(url).catch((e) => {
    Promise.reject(e);
  });
};

const uploadEducationDocument = (id: number, data: any) => {
  const userId = localStorage.getItem("userId");
  const url = `${constants.BASE_URL}/education/update-education-doc-in-${storage}/${userId}/${id}`;
  return axios.patch(url, data).catch((e) => {
    Promise.reject(e);
  });
};

export default {
  addEducationDetail,
  getEducationDetail,
  deleteEducationDetail,
  uploadEducationDocument,
};
