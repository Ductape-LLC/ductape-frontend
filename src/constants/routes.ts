const HOME = "/";
const LOGIN = "/auth/login";
const DASHBOARD = "/dashboard";
const FORGOT_PASSWORD = "/auth/forgot-password";
const RESET_PASSWORD = "/auth/reset-password";
const SIGNUP = "/auth/signup";

const PUBLIC_ROUTES = [HOME, LOGIN, FORGOT_PASSWORD, RESET_PASSWORD, SIGNUP];
const WHITELISTED_ROUTES = [DASHBOARD];

export const routes = {
  PUBLIC_ROUTES,
  WHITELISTED_ROUTES,
  HOME,
  DASHBOARD,
  SIGNUP,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  LOGIN,
};
