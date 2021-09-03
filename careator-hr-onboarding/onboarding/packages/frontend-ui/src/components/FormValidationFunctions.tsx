import { message } from "antd";
import ManageClientService from "../services/ManageClientService";
import UserService from "../services/UserService";

export const handleExistingEmail = async (email: any) => {
  const { data } = await UserService.getEmail(email);
  if (data) {
    message.error("Sorry, this email-id is already exists in our database!!");
  }
};

export const handleExistingMobile = async (mobile: any) => {
  const { data } = await UserService.getMobile(mobile);
  if (data) {
    message.error(
      "Sorry, this mobile number is already exists in our database!!"
    );
  }
};

export const handleExistingPhone = async (phone: any) => {
  const { data } = await UserService.getMobile(phone);
  if (data) {
    message.error(
      "Sorry, this phone number is already exists in our database!!"
    );
  }
};

export const handleExistingClient = async (client: any) => {
  const { data } = await ManageClientService.getClientByClientName(client);
  return data;
};

export const handleExistingJobCode = async (cid: any, jobcode: any) => {
  const { data } = await ManageClientService.getClientAndJobByIdAndJobName(
    cid,
    jobcode
  );
  return data;
};

export const handleExistingJob = async (jobcode: any) => {
  const { data } = await ManageClientService.getJobName(jobcode);
  return data;
};
