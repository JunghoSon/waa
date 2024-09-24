import axios, { AxiosResponse, AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { GATEWAY_URL } from "@/env";
import { stringify } from "qs";

const defaultConfig = {
  baseURL: GATEWAY_URL,
  timeout: 10000,
};

export const api = axios.create({ ...defaultConfig });

api.interceptors.request.use((config) => {
  const accessToken = getCookie("access_token");

  if (!accessToken) {
    return Promise.reject({
      message: "Not Authorized",
      status: 401,
    });
  }

  config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
});

const success = (response: AxiosResponse) => response;
const failure = (error: AxiosError) => {
  if (error.status === 401) {
    const { origin, pathname } = window.location;
    window.location.href = `${GATEWAY_URL}/dummy/login?returnUrl=${origin}${pathname}`;
    return;
  }

  return Promise.reject(error);
};

api.interceptors.response.use(success, failure);
