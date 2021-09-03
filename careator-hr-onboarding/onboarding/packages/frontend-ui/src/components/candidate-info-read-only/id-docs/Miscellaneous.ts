import { message } from "antd";
import CandidateService from "../../../services/CandidateService";
import DocumentService from "../../../services/DocumentService";
import EmployeeService from "../../../services/EmployeeService";
import UserService from "../../../services/UserService";
import mailService from "../../../services/mailService";
import { host } from "../../../constants";

async function actionsAfterDocRejection(
  candUserId: string,
  userId: string,
  role: string
) {
  let usersData = getCandAndRecruiterOrCandAndHrDetails(candUserId, userId);
  let { candData, authorityData } = await usersData;
  let statusCode: string = "CC";
  await CandidateService.updateCandStatusByUserId(candUserId, statusCode);
  let workflowDescription: string = `${authorityData.data[0].fullName} rejected documents`;
  let subject: string = "";
  if (role === "Recruiter") subject = `${authorityData.data[0].fullName}`;
  else if (role === "HR") subject = `${authorityData.data[0].fullName}`;
  let rejDocDetails = await getRejectedDocsWithRemarks(candUserId);
  let recruiterDetails = await CandidateService.getCandidateDetailsById(candUserId);
  const recruiterUid = recruiterDetails.data[0].recruiterId;
  let recruiterEmail = await EmployeeService.getEmployeeById(recruiterUid);
  const recruiterEmailID = recruiterEmail.data[0].email;
  let dataAboutMailWorkflowAndNotification = {
    emailData: {
      sendTo: candData.data[0].email,
      temp: "CandidateDocRejection",
      data: {
        candFullName: candData.data[0].fullName,
        rejDocs: rejDocDetails,
        authorityFullName: authorityData.data[0].fullName,
        authorityEmail: authorityData.data[0].email,
        link: `http://${host}/candidate/manage-documents`,
      },
      subject: "Request for reuploading of documents",
      cc:recruiterEmailID
    },
    workflowData: {
      description: workflowDescription,
      userId: candUserId,
    },
    notificationData: {
      fromEmail: authorityData.data[0].email,
      subject: `${subject} rejected documents`,
      createdBy: userId,
      updatedBy: userId,
      userId: candUserId,
      toEmail: candData.data[0].email,
    },
    roleName:role
  };
  await sendMailToCand(dataAboutMailWorkflowAndNotification);
}

async function actionsAfterDocApproval(
  candUserId: string,
  userId: string,
  role: string
) {
  const empAndManagerData = await EmployeeService.getEmployeeById(userId);
  let statusCode: string = "";
  if (role === "Recruiter") statusCode = "RRD";
  else if (role === "HR") statusCode = "HRD";
  await CandidateService.updateCandStatusByUserId(candUserId, statusCode);
  let candData = await UserService.getCandidateDetailsByUserId(candUserId);
  let workflowDescription: string = `${empAndManagerData.data[0].fullName} approved documents`;
  let link: string = "";
  if (role === "Recruiter")
    link = `http://${host}/hr/candidate-details/${candUserId}`;
  else if (role === "HR")
    link = `http://${host}/account-manager/manage-candidates`;
  let subject: string = "";
  if (role === "Recruiter")
    subject = `${empAndManagerData.data[0].fullName} approved documents`;
  else if (role === "HR")
    subject = `${empAndManagerData.data[0].fullName} approved documents`;

  let dataAboutMailWorkflowAndNotification = {
    emailData: {
      sendTo: empAndManagerData.data[0].managerEmail,
      temp: "CandidateDocApproval",
      data: {
        authorityFullName: empAndManagerData.data[0].fullName,
        candFullName: candData.data[0].fullName,
        higherAuthorityFullName: empAndManagerData.data[0].managerName,
        authorityEmail: empAndManagerData.data[0].email,
        link: link,
      },
      subject: "Request for verification of candidate details",
    },
    workflowData: {
      description: workflowDescription,
      userId: candUserId,
    },
    notificationData: {
      fromEmail: empAndManagerData.data[0].email,
      subject: `${subject} of ${candData.data[0].fullName}`,
      createdBy: userId,
      updatedBy: userId,
      userId: candUserId,
      toEmail: empAndManagerData.data[0].managerEmail,
    },
  };
  await sendMailToHigherAuthority(
    dataAboutMailWorkflowAndNotification,
    empAndManagerData.data[0].managerRole
  );
}

async function getCandAndRecruiterOrCandAndHrDetails(
  candUserId: string,
  userId: string
) {
  let authorityData = await UserService.getEmployeeDetailsByUserId(userId);
  let candData = await UserService.getCandidateDetailsByUserId(candUserId);
  return { candData, authorityData };
}

async function getRejectedDocsWithRemarks(candUserId: string) {
  const docGot = await DocumentService.getRejectedDocsByUserId(candUserId);
  var rejectedDoc: string[] = new Array();
  var statusRemarksStr: string = "";
  for (let i: number = 0; i < docGot.data.length; i++) {
    rejectedDoc[i] = "";
  }

  docGot.data.map(function (item: any, index: any, arr: any) {
    rejectedDoc[index] = `${index + 1}) ${item.documentName} - ${
      item.remarks
    } \n`;
    statusRemarksStr = statusRemarksStr.concat(rejectedDoc[index]);
  });
  return statusRemarksStr;
}

async function sendMailToCand(dataAboutMailWorkflowAndNotification: any) {
  const mailSent =
    await mailService.sendMailAndCaptureInNotificationAndWorkflowTables(
      dataAboutMailWorkflowAndNotification
    );
  if (mailSent.status === 201) {
    message.success("Mail sent to candidate successfully");
  }
}

async function sendMailToHigherAuthority(
  dataAboutMailWorkflowAndNotification: any,
  higherRole: string
) {
  const mailSent =
    await mailService.sendMailAndCaptureInNotificationAndWorkflowTables(
      dataAboutMailWorkflowAndNotification
    );
  if (mailSent.status === 201) {
    // message.success("Mail is sent to " + higherRole + " successfully");
  }
}

export { actionsAfterDocRejection, actionsAfterDocApproval };
