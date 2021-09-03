import axios from "axios";
import { RoleType } from "./../types";
import { constants } from "../constants";

const getRoles = () => {
  const url = `${constants.BASE_URL}/role`;
  return axios.get<RoleType>(url).catch((e) => Promise.reject(e.response.data));
};

export default { getRoles };
