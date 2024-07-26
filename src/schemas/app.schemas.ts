import * as Yup from "yup";

export const createAppSchema = Yup.object().shape({
  app_name: Yup.string().required("App name is required"),
  description: Yup.string(),
});
