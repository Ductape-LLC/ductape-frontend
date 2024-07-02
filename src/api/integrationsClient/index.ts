import { connectDuctape } from "../sdk";
import { AppComponents, PublicStates } from "ductape-sdk/dist/types/enums";
import { IBuilderInit } from "ductape-sdk/dist/types/index.types";
import { ICreateIntegrationsBuilder } from "ductape-sdk/dist/types/integrationsBuilder.types";

export const createProject = async (payload: IBuilderInit, data: ICreateIntegrationsBuilder) => {
  try {
    const project = await connectDuctape(payload).getIntegrationBuilder();

    return project.createIntegration(data);
  } catch (e) {
    throw e;
  }
};

export const fetchProjects = async (
  payload: IBuilderInit,
  status: PublicStates,
) => {
  try {
    return await connectDuctape(payload).fetchWorkspaceProjects(status);
  } catch (e) {
    throw e;
  }
};

export const fetchIntegration = async (
  payload: IBuilderInit,
  app_id: string,
) => {
  try {
    const project= (await connectDuctape(payload).getIntegrationBuilder())
    await project.initializeIntegration(app_id);
    return project; // return builder instance
  } catch (e) {
    throw e;
  }
};