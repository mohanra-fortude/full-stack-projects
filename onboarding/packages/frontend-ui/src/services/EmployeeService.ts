import axios from "axios";
import { constants } from "../constants";
import StorageServices from "./StorageService";


const getEmployees = (
  field: string = "u.updatedAt",
  order: string = "DESC",
  query: string,
  role: string
) => {
  const url = `${constants.BASE_URL}/employee?q=${query}&f=${field}&o=${order}&r=${role}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getEmployeeById = (id: string) => {
  const url = `${constants.BASE_URL}/employee/findOne/${id}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const getEmployeeNameById = (id: number) => {
  const url = `${constants.BASE_URL}/employee/employeename/${id}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

const deleteEmployee = (id: string) => {
  const url = `${constants.BASE_URL}/employee/deleteEmployee?id=${id}`;
  return StorageServices.getData("token")
    .then((token) => {
      axios({
        method:'patch',
        url:url,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    )
    .catch((e) => Promise.reject(e.response.data));
};

const assignEmployee = (suid: string, auid: string) => {
  const url = `${constants.BASE_URL}/employee/changeManager?suid=${suid}&auid=${auid}`;
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

const getEmployeesByRole = (role: number) => {
  const url = `${constants.BASE_URL}/employee?r='${role}'`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};



export default {
  getEmployees,
  getEmployeeById,
  getEmployeesByRole,
  getEmployeeNameById,
  deleteEmployee,
  assignEmployee,
};
