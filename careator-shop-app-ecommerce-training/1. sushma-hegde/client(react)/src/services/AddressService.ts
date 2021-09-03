import axios from "axios";
import constants from "../constants";
import StorageService from "./StorageService";
import { LoginResponseType } from "../types";
import { AddressResponseType, CustomerResponseType } from "../types";

const postAddress = (
  line1: string,
  line2: string,
  city: string,
  state: string,
  pincode: number
) => {
  const url = `${constants.BASE_URL}/address`;
  return StorageService.getData("token").then((token) => {
    axios
      .post<AddressResponseType>(
        url,
        { line1, line2, city, state, pincode },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((e) => Promise.reject(e.response.data));
  });
};

const getAddress = () => {
  const url = `${constants.BASE_URL}/address`;
  return StorageService.getData("token").then((token) =>
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};

export default { postAddress, getAddress };
