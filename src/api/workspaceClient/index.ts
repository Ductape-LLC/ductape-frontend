import axios from "axios";
import {
  WORKSPACES_BASE_URL,
  WORKSPACE_CREATE_URL,
  WORKSPACE_FETCH_URL,
  WORKSPACE_DEFAULT_CHANGE,
  WORKSPACE_UPDATE_ENVS,
  WORKSPACE_STATS,
  WORKSPACE_CREATE_UPLOAD_URL,
} from "./urls";
import { Parameterize } from "../../utils";

const source = axios.CancelToken.source();
const requestInterceptor = async (config: any) => {
  config.cancelToken = source.token;
  return config;
};
let instance: any;

const workspaceClient = (auth: string, contentType: string) => {
  if (instance) return instance;
  instance = axios.create({
    baseURL: WORKSPACES_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": contentType,
      Authorization: auth,
    },
    withCredentials: false,
  });

  // @ts-ignore
  instance.interceptors.request.use(requestInterceptor);
  return instance;
};

type CREATE_WORKSPACE = {
  public_key: string;
  user_id: string;
  name: string;
};

export const createWorkspace = async (
  token: string,
  payload: CREATE_WORKSPACE
) => {
  try {
    return await workspaceClient(token, "application/json").post(
      WORKSPACE_CREATE_URL + `/?public_key=${payload.public_key}`,
      payload
    );
  } catch (e) {
    throw e;
  }
};

export const fetchWorkspaces = async (
  token: string,
  user_id: string,
  public_key: string
) => {
  try {
    const URL = Parameterize(WORKSPACE_FETCH_URL, ":user_id", user_id);
    return await workspaceClient(token, "application/json").get(
      URL + `/?public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const fetchWorkspaceStats = async (
  token: string,
  workspace_id: string,
  public_key: string
) => {
  try {
    const URL = Parameterize(WORKSPACE_STATS, ":workspace_id", workspace_id);
    return await workspaceClient(token, "application/json").get(
      URL + `/?public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const changeDefaultWorkspace = async (
  token: string,
  user_id: string,
  workspace_id: string,
  public_key: string
) => {
  try {
    const URL = Parameterize(WORKSPACE_DEFAULT_CHANGE, ":user_id", user_id);
    return await workspaceClient(token, "application/json").put(URL, {
      workspace_id,
      public_key,
    });
  } catch (e) {
    throw e;
  }
};

export const updateWorkspaceEnvs = async (
  token: string,
  workspace_id: string,
  data: {
    envs: { env_name: string; slug: string; description: string }[];
    user_id: string;
    public_key: string;
  }
) => {
  try {
    const URL = Parameterize(
      WORKSPACE_UPDATE_ENVS,
      ":workspace_id",
      workspace_id
    );
    return await workspaceClient(token, "application/json").put(URL, data);
  } catch (e) {
    throw e;
  }
};

export const createUploadUrl = async ({
  token,
  fileType,
  visibility,
  id,
}: {
  file: File;
  token: string;
  fileType: string;
  visibility: string;
  id: string;
}) => {
  try {
    return await workspaceClient(token, "application/json").post(
      WORKSPACE_CREATE_UPLOAD_URL,
      {
        fileType,
        visibility,
        id,
      }
    );
  } catch (e) {
    throw e;
  }
};

export const uploadFileToUrl = async (url: string, file: { type: string }) => {
  try {
    const response = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
