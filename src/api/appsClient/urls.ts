export const APPS_BASE_URL =
  "http://ductape-ecs-848753313.us-east-2.elb.amazonaws.com/apps";
export const APPS_CREATE_URL = "/apps/v1/create";
export const APPS_FETCH_URL = "/apps/v1/workspace";
export const APP_FETCH_URL = "/apps/v1/:app_id";
export const APP_FETCH_TAGS = "/apps/v1/fetch/tag";
export const APP_SETUP_FETCH = "/apps/v1/setup/:app_id";
export const APP_SETUP_ENV_FETCH = "/apps/v1/setup/:app_id/:env_id";
export const APP_CREATE_CONSTANTS = "/apps/v1/:app_id";
export const APP_FETCH_CONSTANTS = "/apps/v1/constants/:app_id";
export const APP_UPDATE_CONSTANTS = "/apps/v1/:constant_id";
export const APP_DELETE_CONSTANTS = "/apps/v1/constants/:constant_id";
export const APP_CREATE_VARIABLES = "/apps/v1/variables";
export const APP_FETCH_VARIABLES = "/apps/v1/variables/:app_id";
export const APP_UPDATE_VARIABLES = "/apps/v1/variables/:variable_id";
export const APP_DELETE_VARIABLES = "/apps/v1/variables/:variable_id";
export const APP_FETCH_DOMAINS = "/apps/v1/domains";
