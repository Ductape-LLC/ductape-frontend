import axios from "axios";
import { INTEGRATIONS_BASE_URL, INTEGRATION_SUMMARY } from "./urls";

const source = axios.CancelToken.source();
const requestInterceptor = async (config: any) => {
  config.cancelToken = source.token;
  return config;
};
let instance: any;

const integrationClient = (auth: string, contentType: string) => {
  if (instance) return instance;
  instance = axios.create({
    baseURL: INTEGRATIONS_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": contentType,
      Authorization: auth,
    },
    withCredentials: false,
  });

  instance.interceptors.request.use(requestInterceptor);
  return instance;
};

export const createProject = async (payload: any, data: any) => {
  try {
    const response = await integrationClient("", "application/json").post(
      "/integrationBuilder/createIntegration",
      {
        payload,
        data,
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const fetchProjects = async (payload: any, status: string) => {
  try {
    const response = await integrationClient("", "application/json").get(
      INTEGRATION_SUMMARY,
      {
        params: { ...payload, status },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const fetchIntegration = async (payload: any, app_id: string) => {
  try {
    const response = await integrationClient("", "application/json").post(
      `/integrationBuilder/initializeIntegration`,
      {
        payload,
        app_id,
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};
