import * as Yup from 'yup';

export const createIntegrationSchema = Yup.object().shape({
    name: Yup.string().required("Integration name is required"),
    description: Yup.string(),
  });