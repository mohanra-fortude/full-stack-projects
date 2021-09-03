import axios from "axios";
import { constants } from "../constants";

const getDashContents = () => {
  const url = `${constants.BASE_URL}/userrole/test`;
  return axios.get(url);
};

export default { getDashContents };
