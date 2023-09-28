import axios from "axios";
import { APPS_BASE_URL, APPS_CREATE_URL, APPS_FETCH_URL, APP_FETCH_URL, APP_SETUP_FETCH, APP_SETUP_ENV_FETCH, APP_CREATE_CONSTANTS, APP_FETCH_CONSTANTS, APP_CREATE_VARIABLES, APP_FETCH_VARIABLES } from "./urls";
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

export const fetchApp = async (token: string, app_id: string, user_id: string, public_key: string) => {
  const URL = Parameterize(
    APP_FETCH_URL,
    ":app_id",
    app_id
  );
  try {
      return await appsClient(token, "application/json").get(URL+`/?user_id=${user_id}&public_key=${public_key}`)
  } catch(e) {
      throw e;
  }
}

export const createAppConstant = async (token: string, payload: any) => {
  try{
      return await appsClient(token, "application/json").post(APP_CREATE_CONSTANTS, payload)
  } catch(e) {
      throw e;
  }
}

export const fetchAppConstant = async (token: string, app_id: string, user_id: string, public_key: string) => {
  const URL = Parameterize(
    APP_FETCH_CONSTANTS,
    ":app_id",
    app_id
  );

  console.log(URL, 'url')
  try {
      return await appsClient(token, "application/json").get(URL+`/?user_id=${user_id}&public_key=${public_key}`)
  } catch(e) {
      throw e;
  }
}

export const createAppVariable = async (token: string, payload: any) => {
  try{
      return await appsClient(token, "application/json").post(APP_CREATE_VARIABLES, payload)
  } catch(e) {
      throw e;
  }
}

export const fetchAppVariable = async (token: string, app_id: string, user_id: string, public_key: string) => {
  const URL = Parameterize(
    APP_FETCH_VARIABLES,
    ":app_id",
    app_id
  );

  console.log(URL, 'url')
  try {
      return await appsClient(token, "application/json").get(URL+`/?user_id=${user_id}&public_key=${public_key}`)
  } catch(e) {
      throw e;
  }
}

