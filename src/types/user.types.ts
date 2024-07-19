import { AxiosError, AxiosResponse } from "axios";

export interface UserData {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  active: boolean;
  auth_token: string;
  public_key: string;
  workspaces: Workspace[];
}

export interface Workspace {
  default: boolean;
  // Add other properties if necessary
}

export interface AuthResponse extends AxiosResponse {
  data: {
    data: UserData;
    errors?: string[];
  };
}

export interface ApiError extends AxiosError {
  response: AxiosResponse<{ errors: string }>;
}
