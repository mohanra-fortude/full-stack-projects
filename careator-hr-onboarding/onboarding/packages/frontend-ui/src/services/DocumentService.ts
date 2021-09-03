import axios from "axios";
import { constants, storage } from "../constants";

const createOfferletter = (file: any, userId1: any) => {
  const url = `${constants.BASE_URL}/document/upload-offer-letter-to-aws/${userId1}`;
  return axios.post(url, file).catch((e) => Promise.reject(e.response.data));
};

const getfileName = (userId: any) => {
  const url = `${constants.BASE_URL}/document/fileNameDocument/${userId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const getDocument = (fileName: string, userId: string) => {
  const url = `${constants.BASE_URL}/document/doc-file-from-${storage}/${userId}/${fileName}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};



const getOfferLetter = (userId: any, docInfo:any) => {
  const url =
  "${constants.BASE_URL}/document/file-name/:userId/${userId}";
  return axios.get(url, docInfo).catch((e) => Promise.reject(e.response.data));
  };

function updateDocStatus(documentId: number, dataAboutStatus: any) {
  const url = `${constants.BASE_URL}/document/update-doc-status/${documentId}`;
  return axios
    .patch(url, dataAboutStatus)
    .catch((e) => Promise.reject(e.response.data));
}

function getRejectedDocsByUserId(userId: string) {
  const url = `${constants.BASE_URL}/document/rejected-docs/${userId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
}

const getAllDocumentsByCandIdforrec = (userId: string) => {
  const url = `${constants.BASE_URL}/document/all-docs/${userId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const getAllDocumentsByCandIdforhr = (userId: string) => {
  const url = `${constants.BASE_URL}/document/all-docshr/${userId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

const getUDocs = (userId: string) => {
  const url = `${constants.BASE_URL}/document/u-docs/${userId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
};

export default {
  getDocument,
  updateDocStatus,
  getRejectedDocsByUserId,
  createOfferletter,
  getfileName,
  getOfferLetter,
  getAllDocumentsByCandIdforrec,
  getAllDocumentsByCandIdforhr,
  getUDocs,
};
