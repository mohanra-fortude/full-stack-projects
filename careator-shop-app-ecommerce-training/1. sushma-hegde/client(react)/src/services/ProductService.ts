import axios from "axios";
import constants from "../constants";
import { ProductResponseType, ProductType } from "../types";

const getProducts = (page = 1) => {
  const url = `${constants.BASE_URL}/product?page=${page}`;
  return axios.get<ProductResponseType>(url);
};

const getProductById = (id: string) => {
  const url = `${constants.BASE_URL}/product/${id}`;
  return axios.get<ProductType>(url);
};

const sortByParameter = (
  field: string,
  order: string,
  page: number,
  size: number
) => {
  const url = `${constants.BASE_URL}/product/sort?field=${field}&order=${order}&page=${page}&size=${size}`;
  return axios.get<ProductResponseType>(url);
};

const filterByPrice = (
  min: number,
  max: number,
  page: number,
  size: number
) => {
  const url = `${constants.BASE_URL}/product/filter?min=${min}&max=${max}&page=${page}&size=${size}`;
  return axios.get<ProductResponseType>(url);
};

const searchByProductName = (prodname: string, page: number, size: number) => {
  const url = `${constants.BASE_URL}/product/search?prodname=${prodname}&page=${page}&size=${size}`;
  return axios.get<ProductResponseType>(url);
};

export default {
  getProducts,
  getProductById,
  sortByParameter,
  filterByPrice,
  searchByProductName,
};
