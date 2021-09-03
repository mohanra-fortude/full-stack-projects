import axios from "axios";
import { AssetType, OfferType } from "../types";
import { constants } from "../constants";

const createOffer = (data: any) => {
  const url = `${constants.BASE_URL}/offer`;
  return axios
    .post<OfferType>(url, data)
    .catch((e) => Promise.reject(e.response.data));
};

const document = (data: any, userid: any, offerid: any) => {
  const url = `${constants.BASE_URL}/offer/upload-education-doc-to-aws?userid=${userid}&offerid=${offerid}`;
  return axios
    .post<OfferType>(url, data)
    .catch((e) => Promise.reject(e.response.data));
};

const createAsset = (data1: any) => {
  const url = `${constants.BASE_URL}/asset`;
  return axios
    .post<AssetType>(url, data1)
    .catch((e) => Promise.reject(e.response.data));
};

const getOfferByUserId = (uid: string) => {
  const url = `${constants.BASE_URL}/offer/offer/${uid}`;
  return axios.get(url);
};

const updateOfferByUserId = (data: any, uid: string) => {
  const url = `${constants.BASE_URL}/offer/offer/${uid}`;
  return axios.patch(url, data);
};
const sendEmailAndChangeStatus = (
  userId: any,
  statusCode: any,

  subject: any,
  description: any,
  emailTo: any,
  emailFrom: any,
  cc: any
) => {
  let data = {
    statusCode: statusCode,
    subject: subject,
    description: description,
    emailTo: emailTo,
    emailFrom: emailFrom,
    cc: cc,
  };
  const url = `${constants.BASE_URL}/candidate/sendEmailAndChangeStatus/${userId}`;
  return axios.patch(url, data).catch((e) => {
    Promise.reject(e);
  });
};

const getManagerEmailID = (Userid: string) => {
  const url = `${constants.BASE_URL}/offer/user?userid=${Userid}`;
  return axios.get(url);
};

const getOfferForAssetToAdmin = (Userid: string) => {
  const url = `${constants.BASE_URL}/offer/assetToAdmin/${Userid}`;
  return axios.get(url);
};

const getAssetForAssetToAdmin = (Userid: any) => {
  const url = `${constants.BASE_URL}/asset/assetToAdmin/${Userid}`;
  return axios.get(url);
};
function getAssetDetails(userId: string) {
  const url = `${constants.BASE_URL}/asset/asset-details/${userId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
}

export default {
  createOffer,
  getOfferByUserId,
  createAsset,
  updateOfferByUserId,
  sendEmailAndChangeStatus,
  getManagerEmailID,
  document,
  getOfferForAssetToAdmin,
  getAssetForAssetToAdmin,
  getAssetDetails,
};
