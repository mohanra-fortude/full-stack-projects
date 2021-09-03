import axios from "axios";
import { constants } from "../constants";
import { addressType, CandidateBasicInfoType } from "../types";
import StorageServices from "./StorageService";

const getCandidate = (
  query: string,
  field: string = "Id",
  order: string = "DESC",
  status: string = "",
  rid: string = ""
) => {
  const url = `${constants.BASE_URL}/candidate?q=${query}&f=${field}&o=${order}&status=${status}&rid=${rid}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const getCandidateDetailsById = (id: string) => {
  const url = `${constants.BASE_URL}/candidate/findOneCandidate/${id}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};


const getFileNameOfOfferLetter = (userId: any, mailData:any) => {
  const url =`${constants.BASE_URL}/candidate/send-offer-email/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.post(url, mailData, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response));
};

const getCandidateBasicInfo = (userId: any) => {
  const url = `${constants.BASE_URL}/candidate/findCandidate/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const getWorkflowDetailsByUserId = (userId: any) => {
  const url = "${constants.BASE_URL}/workflow/findWorkflowByUserId/${userId}";
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const getCandidateById = (id: string) => {
  const url = `${constants.BASE_URL}/candidate/${id}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const deleteCandidate = (activeState: boolean, id: string) => {
  let data = {
    isActive: activeState,
  };
  const url = `${constants.BASE_URL}/candidate/activestate/${id}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const getByRecruiterId = (userId: string) => {
  const url = `${constants.BASE_URL}/candidate/recruiter/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const updateCandidateInfo = async (
  fname: any,
  lname: any,
  parentFirstName: any,
  parentLastName: any,
  aadhaarCard: any,
  emergencyPhone: any,
  emergencyContactName: any,
  emergencyEmail: any,
  gender: any,
  panCard: any,
  dateBirth: any,
  passport: any,
  homePhone: any,
  bloodGroup: any,
  allergies: any,
  userId: any
) => {
  const url = `${constants.BASE_URL}/candidate/update`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.put<CandidateBasicInfoType>(
        url,
        {
          fname,
          lname,
          parentFirstName,
          parentLastName,
          aadhaarCard,
          emergencyPhone,
          emergencyContactName,
          emergencyEmail,
          gender,
          panCard,
          dateBirth,
          passport,
          homePhone,
          bloodGroup,
          allergies,
          userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
    )
    .catch((e) => Promise.reject(e.response.data));
};
const updateAddressInfo = async (
  addressId: number,
  addressType: string,
  address: string,
  address2: string,
  address3: string,
  city: string,
  state: string,
  zip: string,
  userId: any
) => {
  let data = {
    addressType: addressType,
    address: address,
    address2: address2,
    address3: address3,
    city: city,
    state: state,
    zip: zip,
    userId: userId,
  };
  const url = `${constants.BASE_URL}/address/updateAddress/${addressId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.put(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const updateCandidateStatusCode = (
  statusCode: string,
  userId: string,
  description: any,
  emailTo: string,
  emailFrom: string
) => {
  let data = {
    statusCode: statusCode,
    description: description,
    emailTo: emailTo,
    emailFrom: emailFrom,
  };
  const url = `${constants.BASE_URL}/candidate/updatestatuscode/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const CandidateStatusCodeWithSendingMail = (
  userId: string,
  statusCode: string,
  subject: string,
  description: any,
  emailTo: string,
  emailFrom: string,
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
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const updateCandidateStatusCodeWithSendingMail = (
  userId: string,
  statusCode: string,
  subject: string,
  description: any,
  emailTo: string,
  emailFrom: string,
  cc: any,
  emailData: any
) => {
  const leader = localStorage.getItem("userId");

  let data = {
    statusCode: statusCode,
    subject: subject,
    description: description,
    emailTo: emailTo,
    emailFrom: emailFrom,
    cc: cc,
    leaderId: leader,
    emailDataToSent: emailData,
  };
  const url = `${constants.BASE_URL}/candidate/sendEmailAndChangeStatus/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const sendEmailOffer = (
  userId1: any,
  userId: any,
  statusCode: string,
  subject: string,
  description: any,
  emailTo: string,
  emailFrom: string,
  maildata: any
) => {
  let data = {
    userId1: userId1,
    userId: userId,
    statusCode: statusCode,
    subject: subject,
    description: description,
    emailTo: emailTo,
    emailFrom: emailFrom,
    mailData: maildata,
  };

  const url = `${constants.BASE_URL}/candidate/sendEmailOffer/${userId1}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getCandidateInfo = (userId: string) => {
  const url = `${constants.BASE_URL}/candidate/candidateInfo/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const getEmailByuserId = (userId: string) => {
  const url = `${constants.BASE_URL}/candidate/getEmailByuserId/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getCandidateAndRecuriter = (userId: string) => {
  const url = `${constants.BASE_URL}/candidate/candidateAndRecuiter/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const updateRecruiter = (suid: string, auid: string) => {
  const url = `${constants.BASE_URL}/candidate/changeRecruiter?suid=${suid}&auid=${auid}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios({
        method: "patch",
        url: url,
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getCandidateAndRecuriterRemarks = (userId: string) => {
  const url = `${constants.BASE_URL}/candidate/getEmailForRemarks/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

function updateCandStatusByUserId(userId: string, statusCode: string) {
  const url = `${constants.BASE_URL}/candidate/change-status/${userId}/${statusCode}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, statusCode, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
}

const updateCandidateStatusCodeWithSendingMailAndLeader = (
  userId: string,
  statusCode: string,
  subject: string,
  description: any,
  emailTo: string,
  emailFrom: any,
  leaderId: any
) => {
  const leader = localStorage.getItem("userId");
  console.log(leader);
  let data = {
    statusCode: statusCode,
    subject: subject,
    description: description,
    emailTo: emailTo,
    emailFrom: emailFrom,
    leaderId: leaderId,
  };
  const url = `${constants.BASE_URL}/candidate/updatestatuscodeandleader/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const getStatusByCandidateuserId = (userId: string) => {
  const url = `${constants.BASE_URL}/candidate/getStatusByCandidateuserId/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getNotifications = (userId: string) => {
  const url = `${constants.BASE_URL}/auth/notification/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

// const updateCandidatesToNewRecruiter = (data:any) => {
const getRecruitersByUid = (userId: string) => {
  const url = `${constants.BASE_URL}/candidate/findRecruiters/${userId}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};
const updateCandidatesToNewRecruiter = (oldrec: any, data: any) => {
  const url = `${constants.BASE_URL}/candidate/updateRecruiters/${oldrec}`;
  //return axios.patch( url, data )
  return StorageServices.getData("token")
    .then((token) =>
      axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

function getNoOfCandidatesUnderRecruiter(recId: string) {
  const url = `${constants.BASE_URL}/candidate/count-of-candidates-under-recruiter/${recId}`;
  return axios.get(url).catch((e) => Promise.reject(e.response.data));
}

export default {
  getNotifications,
  getCandidate,
  deleteCandidate,
  getCandidateById,
  getByRecruiterId,
  getCandidateDetailsById,
  getCandidateBasicInfo,
  updateCandidateInfo,
  updateAddressInfo,
  updateCandidateStatusCode,
  getCandidateInfo,
  getWorkflowDetailsByUserId,
  getCandidateAndRecuriter,
  updateRecruiter,
  updateCandidateStatusCodeWithSendingMail,
  getEmailByuserId,
  updateCandStatusByUserId,
  CandidateStatusCodeWithSendingMail,
  updateCandidateStatusCodeWithSendingMailAndLeader,
  getCandidateAndRecuriterRemarks,
  getStatusByCandidateuserId,
  sendEmailOffer,
  getFileNameOfOfferLetter,
  updateCandidatesToNewRecruiter,
  getRecruitersByUid,
  getNoOfCandidatesUnderRecruiter,
};
