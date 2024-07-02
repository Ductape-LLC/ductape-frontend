import * as Yup from 'yup';

export const addEnvSchema = Yup.object().shape({
    env_name: Yup.string().required('Name is required'),
    slug: Yup.string().required('Slug is required'),
    description: Yup.string(),
  });