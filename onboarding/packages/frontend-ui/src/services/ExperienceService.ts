import axios from "axios";
import { constants, storage } from "../constants";

const addExperienceDetail = (data: any, id: string | null) => {
  const url = `${constants.BASE_URL}/experience/upload-experience-doc-to-${storage}/${id}`;
  return axios.post(url, data).catch((e) => {
    Promise.reject(e);
  });
};

const getExperienceDetail = (userId: string) => {
  const url = `${constants.BASE_URL}/experience/docByuserId/${userId}`;
  return axios.get(url);
};

const deleteExperienceDetail = (id: number) => {
  const url = `${constants.BASE_URL}/experience/${id}`;
  return axios.delete(url).catch((e) => {
    Promise.reject(e);
  });
};

const updateRemarks = (documentId: number, remarks: any) => {
  const url = `${constants.BASE_URL}/document/remarks/${documentId}`;
  return axios.patch(url, remarks).catch((e) => {
    Promise.reject(e);
  });
};

const uploadExperienceDocument = (docId: number, data: any) => {
  const userId = localStorage.getItem("userId");
  const url = `${constants.BASE_URL}/experience/update-experience-doc-in-${storage}/${userId}/${docId}`;
  return axios.patch(url, data).catch((e) => {
    Promise.reject(e);
  });
};

export default {
  addExperienceDetail,
  getExperienceDetail,
  deleteExperienceDetail,
  uploadExperienceDocument,
  updateRemarks,
};
