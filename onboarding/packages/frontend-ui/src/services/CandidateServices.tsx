import { AmazonCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { constants } from "../constants";
import StorageServices from "./StorageService";

const getCandidateById = (id: number) => {
  const url = `${ constants.BASE_URL }/candidate/findOne/${ id }`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

export default {
  getCandidateById,
};
