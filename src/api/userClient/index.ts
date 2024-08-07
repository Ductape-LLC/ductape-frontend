import axios from "axios";
import {
  USER_BASE_URL,
  USER_CREATE_URL,
  USER_LOGIN_URL,
  USER_FORGOT_URL,
  USER_CHANGE_PASSWORD,
  USER_OTP_LOGIN,
  USER_REQUEST_OTP,
  USER_VERIFY_OTP,
} from "./urls";
import { Parameterize } from "../../utils";
import { AuthResponse } from "@/types/user.types";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface ChangePasswordPayload {
  token: string;
  password: string;
  email: string;
}

interface OtpLoginPayload {
  email: string;
  otp: string;
}

interface VerifyLoginPayload {
  user_id: string;
  token: string;
}

const source = axios.CancelToken.source();
const requestInterceptor = async (config: any) => {
  config.cancelToken = source.token;
  return config;
};
let instance: any;

const userClient = (auth: string, contentType: string) => {
  if (instance) return instance;
  instance = axios.create({
    baseURL: USER_BASE_URL,
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

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  try {
    return await userClient("", "application/json").post(
      USER_CREATE_URL,
      payload
    );
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  try {
    return await userClient("", "application/json").post(
      USER_LOGIN_URL,
      payload
    );
  } catch (e) {
    throw e;
  }
};

export const forgotUser = async (payload: { email: string }) => {
  return await userClient("", "application/json").post(
    USER_FORGOT_URL,
    payload
  );
};

export const changePasswordUser = async (payload: ChangePasswordPayload) => {
  return await userClient("", "application/json").put(
    USER_CHANGE_PASSWORD,
    payload
  );
};

export const otpLogin = async (payload: OtpLoginPayload) => {
  return await userClient("", "application/json").post(USER_OTP_LOGIN, payload);
};

export const verifyLogin = async (payload: VerifyLoginPayload) => {
  return await userClient("", "application/json").post(
    USER_VERIFY_OTP + "/" + payload.user_id,
    { token: payload.token }
  );
};

export const requestOtp = async (payload: { user_id: string }) => {
  const { user_id } = payload;
  const URL = Parameterize(USER_REQUEST_OTP, ":user_id", user_id);
  return await userClient("", "application/json").post(URL);
};
