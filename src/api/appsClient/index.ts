import axios from "axios";
import { APPS_BASE_URL, APPS_CREATE_URL, APPS_FETCH_URL, APP_FETCH_URL, APP_SETUP_FETCH, APP_SETUP_ENV_FETCH } from "./urls";
import { Parameterize } from "../../utils";

const source = axios.CancelToken.source();
const requestInterceptor = async (config: any) => {
  config.cancelToken = source.token;
  return config;
};
let instance: any;

const appsClient = (auth: string, contentType: string) => {
  if (instance) return instance;
  instance = axios.create({
    baseURL: APPS_BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': contentType,
      Authorization: auth
    },
    withCredentials: false
  });

  // @ts-ignore
  instance.interceptors.request.use(requestInterceptor);
  return instance;
};

type CREATE_APP = {
  public_key: string,
  user_id: string,
  app_name: string
}

export const createApp = async (token: string, payload: CREATE_APP) => {
  try{
      return await appsClient(token, "application/json").post(APPS_CREATE_URL+`/?public_key=${payload.public_key}`, payload)
  } catch(e) {
      throw e;
  }
}

export const fetchApps = async (token: string, data: {workspace_id: string, status: string}, public_key: string) => {
  try {
      return await appsClient(token, "application/json").get(APPS_FETCH_URL+`/${data.workspace_id}/${data.status}/?public_key=${public_key}`)
  } catch(e) {
      throw e;
  }
}
