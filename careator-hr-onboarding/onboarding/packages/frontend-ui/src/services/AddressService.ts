import axios from "axios";
import { constants } from "../constants";
import StorageServices from "./StorageService";

const getAddressInfo = (uid: any) => {
  const url = `${constants.BASE_URL}/address/addressByUserId/${uid}`;
  return StorageServices.getData("token")
    .then((token) =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    .catch((e) => Promise.reject(e.response.data));
};

export default getAddressInfo;
