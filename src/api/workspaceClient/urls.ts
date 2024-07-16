export const WORKSPACES_BASE_URL =
  "http://ductape-ecs-848753313.us-east-2.elb.amazonaws.com/workspaces";
export const WORKSPACE_CREATE_URL = "/workspaces/v1/create";
export const WORKSPACE_FETCH_URL = "/workspaces/v1/fetch/:user_id";
export const WORKSPACE_DEFAULT_CHANGE = "/workspaces/v1/update/:user_id";
export const WORKSPACE_UPDATE_ENVS =
  "/workspaces/v1/update/:workspace_id/defaults/envs";
export const WORKSPACE_STATS = "/workspaces/v1/stats/:workspace_id";
