import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { BASE_URL, INDIVIDUAL } from "./Backend_URL";

const setInterceptors = (): AxiosRequestHeaders => {
  const headers = {
    "Content-Type": "application/json"
  };
  return headers;
};

export const registerIndividualService = (params): Promise<AxiosResponse> => {
  const url = `${BASE_URL}${INDIVIDUAL}`;
  return runPostAPI(url, params);
};

const runPostAPI = (url, params): Promise<AxiosResponse> => {
  const headers = setInterceptors();
  return axios.post(url, params, headers);
};
