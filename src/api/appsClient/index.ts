import { connectDuctape } from "../sdk";
import { AppComponents, PublicStates } from "ductape-sdk/dist/types/enums";
import { IBuilderInit } from "ductape-sdk/dist/types/index.types";
import { ICreateAppBuilder } from "ductape-sdk/dist/types/appBuilder.types";

export const createApp = async (
  payload: IBuilderInit,
  data: ICreateAppBuilder
) => {
  try {
    const app = await connectDuctape(payload).getAppBuilder();

    await app.createApp(data);

    return app; // return builder instance
  } catch (e) {
    throw e;
  }
};

export const fetchApps = async (
  payload: IBuilderInit,
  status: PublicStates
) => {
  try {
    return await connectDuctape(payload).fetchWorkspaceApps(status);
  } catch (e) {
    throw e;
  }
};

export const fetchApp = async (payload: IBuilderInit, app_id: string) => {
  try {
    const app = await connectDuctape(payload).getAppBuilder();
    await app.initializeApp(app_id);
    return app; // return builder instance
  } catch (e) {
    throw e;
  }
};

export const fetchAppConstant = async (
  token: string,
  app: string,
  user: string,
  public_key: string
) => {
  return {
    data: {
      data: null,
    },
    status: 200,
  };
};

export const createAppConstant = async (token: string, data: any) => {
  return {
    status: 200,
  };
};

export const updateAppConstant = async (token: string, data: any) => {
  return {
    status: 200,
  };
};

export const deleteAppConstant = async (token: string, data: any) => {
  return {
    status: 200,
  };
};

export const fetchAppVariable = async (
  token: string,
  app: string,
  user: string,
  public_key: string
) => {
  return {
    data: {
      data: null,
    },
    status: 200,
  };
};

export const createAppVariable = async (token: string, data: any) => {
  return {
    status: 200,
  };
};

export const updateAppVariable = async (token: string, data: any) => {
  return {
    status: 200,
  };
};

export const deleteAppVariable = async (token: string, data: any) => {
  return {
    status: 200,
  };
};
