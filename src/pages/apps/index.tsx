/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Input, Select } from 'antd';
import CustomInput from '../../components/common/Input';
import Image from 'next/image';
import Dashboard_layout from '../../components/layouts/dashboard_layout';
import Button from '../../components/common/Button';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { updateWorkspaceEnvs } from '@/api/workspaceClient';
import { createApp, fetchApps } from '@/api/appsClient';
import { useDispatch, useSelector } from 'react-redux';
import {
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { env } from 'process';

const { TextArea } = Input;

interface CreateAppFormValues {
  app_name: string;
  app_description: string;
}

interface ENV {
  env_name: string;
  slug: string;
  description: string;
}

const createAppSchema = Yup.object().shape({
  app_name: Yup.string().required('App name is required'),
  app_description: Yup.string(),
});

const addEnvSchema = Yup.object().shape({
  env_name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Slug is required'),
  description: Yup.string(),
});

interface AppInterface {
  _id: string;
  workspace_id: string;
  user_id: string;
  app_name: string;
  require_whitelist: boolean;
  active: boolean;
  __v: number;
  status: string;
  envs: any[];
  actions: any[];
}

const Dashboard = () => {
  const router = useRouter();
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);
  const { workspaces, defaultWorkspace } = useSelector(
    (state: any) => state.workspace
  );
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState<AppInterface[]>([]);
  const [envs, setEnvs] = useState<ENV[]>([]);

  const fetchAllApps = async () => {
    try {
      const response = await fetchApps(
        token,
        { workspace_id: defaultWorkspace._id, status: 'all' },
        public_key
      );
      if (response.status === 200) {
        console.log(response.data.data, 'apps');
        setApps(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.errors);
    }
  };

  const handleSubmit = async (
    values: CreateAppFormValues,
    submitProps: any
  ) => {
    try {
      submitProps.setSubmitting(false);
      setLoading(true);
      toast.loading('Loading...');
      const data = {
        app_name: values.app_name,
        public_key,
        user_id: user._id,
        workspace_id: defaultWorkspace._id,
      };
      const response = await createApp(token, data);
      if (response.status === 201) {
        setLoading(false);
        fetchAllApps();
        toast.success('Workspace created successful');
      }
      setLoading(false);
      submitProps.resetForm();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const handleAddEnv = (values: ENV, submitProps: any) => {
    submitProps.setSubmitting(false);
    setEnvs((prev) => [...prev, values]);
    submitProps.resetForm();
  };

  const saveEnvs = async () => {
    console.log('envs', envs);
    try {
      setLoading(true);
      toast.loading('Loading...');
      const response = await updateWorkspaceEnvs(token, defaultWorkspace._id, {
        envs,
        user_id: user._id,
        public_key,
      });

      if (response.status === 201) {
        toast.success('Environments Saved successfully');
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.errors);
    }
  };

  const formik = useFormik<CreateAppFormValues>({
    initialValues: {
      app_name: '',
      app_description: '',
    },
    validationSchema: createAppSchema,
    onSubmit: handleSubmit,
  });

  const envFormik = useFormik<ENV>({
    initialValues: {
      env_name: '',
      slug: '',
      description: '',
    },
    validationSchema: addEnvSchema,
    onSubmit: handleAddEnv,
  });

  const workspacesOptions = useMemo(() => {
    return workspaces.map((workspace: any) => ({
      value: workspace.workspace_id,
      label: workspace.workspace_name,
    }));
  }, [workspaces]);

  useEffect(() => {
  if (!defaultWorkspace) return;
    fetchAllApps();
  }, [defaultWorkspace]);

  return (
    <Dashboard_layout activeTab="App">
      <div className="w-screen h-screen">
        <div className="px-20 border-b h-[115px] flex flex-col justify-center  bg-white">
          <div className="flex justify-between utems-center">
            <p className="text-[28px] text-[#232830] font-semibold">Apps</p>
            <div className="flex gap-7">
              <Button
                onClick={() => setShowEnvModal(true)}
                className="font-semibold flex items-center text-sm border border-[#DC3444] text-[#DC3444] outline-none h-[40px] rounded px-[10px] gap-2"
              >
                <SettingOutlined className="text-[#DC3444]" size={16} />
                Environments
              </Button>
              <Button
                onClick={() => setShowCreateAppModal(true)}
                className="bg-[#0846A6] text-white font-semibold text-sm flex items-center outline-none  h-[40px] rounded px-[10px] gap-2"
              >
                <PlusOutlined className="text-white" size={16} />
                New App
              </Button>
            </div>
          </div>
        </div>

        <div className="px-20 pt-[61px]">
          <div className="flex items-center gap-[57px]">
            <Input
              size="large"
              placeholder="Search"
              className="bg-white  border rounded w-full p-3 text-sm text-[#232830] outline-none"
              prefix={<SearchOutlined />}
            />
            <Select
              defaultValue={defaultWorkspace?.workspace_name}
              size="large"
              style={{ width: 173 }}
              className="text-sm text-[#232830] outline-none"
              options={workspacesOptions}
            />
          </div>

          <div className="mt-[51px]">
            {apps.map((app) => (
              <div
                key={app._id}
                onClick={() => router.push('/apps/my-app')}
                className="flex px-[36px] h-[110px] bg-white border text-[#232830] justify-between items-center rounded-[5px] mb-[25px]"
              >
                <div className="flex items-center gap-[25px]">
                  <Image
                    src="/images/google.svg"
                    width={42}
                    height={42}
                    alt="google"
                  />
                  <div>
                    <p className="font-bold text-xl text-[#232830]">
                      {app.app_name}
                    </p>
                    <p className="text-sm text-[#979797] mt-1">{app.status}</p>
                  </div>
                </div>

                <div className="flex items-center gap-[37px]">
                  <p className="font-semibold text-[#232830]">
                    {app.actions.length} actions
                  </p>
                  <p className="font-semibold text-[#232830]">
                    {app.envs.length} environaments
                  </p>
                </div>

                <div
                  className={`${
                    app.active
                      ? 'text-[#00875A] bg-[#00875A] border-[#00875A] border-[0.5px]'
                      : 'text-[#DC3444] bg-[#DC3444] border-[#DC3444] border-[0.5px]'
                  } bg-opacity-[15%] border text-xs px-[14px] py-1 rounded-sm`}
                >
                  {app.active ? 'Active' : 'Inactive'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={showCreateAppModal}
        width="730px"
        className="rounded-none"
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setShowCreateAppModal(false)}
        style={{ padding: 0 }}
      >
        <div>
          <h1 className="text-[#232830] text-2xl font-bold border-b px-[30px] py-6">
            Create App
          </h1>
          <div className="px-[30px] mt-4 pb-7 border-b">
            <p className="mt-3 text-sm font-medium tracking-[-0.4px] opacity-90">
              Each app defines its own environments, workflows and rules for
              authorization, authentication and integration. Allowing for secure
              communication between your webservices and integration partners.
            </p>

            <form className="mt-[31px]">
              <div>
                <CustomInput
                  placeholder="App Name"
                  onBlur={formik.handleBlur('app_name')}
                  value={formik.values.app_name}
                  onChange={formik.handleChange('app_name')}
                />
                {formik.touched.app_name && formik.errors.app_name ? (
                  <p className="text-xs mt-1 text-error">
                    {formik.errors.app_name}
                  </p>
                ) : null}
              </div>
              <div>
                <TextArea
                  className="bg-white border rounded w-full p-3 text-sm text-[#232830] mt-6"
                  placeholder="App description"
                  rows={4}
                  onBlur={formik.handleBlur('app_description')}
                  value={formik.values.app_description}
                  onChange={formik.handleChange('app_description')}
                />{' '}
                {formik.touched.app_description &&
                formik.errors.app_description ? (
                  <p className="text-xs mt-1 text-error">
                    {formik.errors.app_description}
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          <div className="px-[30px] py-6 flex justify-end gap-5">
            <Button
              onClick={() => setShowCreateAppModal(false)}
              className="font-semibold text-xs border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2"
            >
              Cancel
            </Button>
            <Button
              className={`${
                !formik.isValid || !formik.dirty || loading
                  ? 'bg-[#D9D9D9]'
                  : 'bg-primary'
              } text-white font-semibold text-xs outline-none rounded h-[33px] px-6`}
              disabled={!formik.isValid || !formik.dirty || loading}
              type="submit"
              onClick={() => formik.handleSubmit()}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={showEnvModal}
        width="730px"
        className="rounded-none"
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setShowEnvModal(false)}
        style={{ padding: 0 }}
      >
        <div>
          <h1 className="text-[#232830] text-2xl font-bold border-b px-[30px] py-6">
            Default Environments
          </h1>
          <div className="px-[30px] mt-4 pb-7 border-b">
            <p className="text-[#232830] mt-3 text-sm font-medium">
              Configure which environments are created automatically for the new
              apps
            </p>

            <div className="mt-[31px]">
              {envs.map((env, i) => (
                <div
                  key={i}
                  className="flex gap-5 justify-between items-center mb-6"
                >
                  <div className="border flex-1 px-3 py-1 rounded">
                    <p className="text-[#979797] text-[10px] font-semibold rounded">
                      Environment Name
                    </p>
                    <p className="text-sm font-semibold">{env.env_name}</p>
                  </div>

                  <div className="border flex-1 px-3 py-1 rounded">
                    <p className="text-[#979797] text-[10px] font-semibold rounded">
                      Slug
                    </p>
                    <p className="text-sm font-semibold">{env.slug}</p>
                  </div>

                  <div className="border flex-1 px-3 py-1 rounded">
                    <p className="text-[#979797] text-[10px] font-semibold rounded">
                      Description
                    </p>
                    <p className="text-sm font-semibold">{env.description}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-5 justify-between items-center mb-6">
                <div>
                  <CustomInput
                    placeholder="Environment Name"
                    onBlur={envFormik.handleBlur('env_name')}
                    value={envFormik.values.env_name}
                    onChange={envFormik.handleChange('env_name')}
                  />
                </div>
                <div>
                  <CustomInput
                    placeholder="Slug"
                    onBlur={envFormik.handleBlur('slug')}
                    value={envFormik.values.slug}
                    onChange={envFormik.handleChange('slug')}
                  />
                </div>
                <div>
                  <CustomInput
                    placeholder="Description"
                    onBlur={envFormik.handleBlur('description')}
                    value={envFormik.values.description}
                    onChange={envFormik.handleChange('description')}
                  />
                </div>
              </div>

              <Button
                onClick={() => envFormik.handleSubmit()}
                className={`${
                  !envFormik.isValid || !envFormik.dirty || loading
                    ? 'bg-[#D9D9D9]'
                    : 'bg-primary'
                } bg-opacity-90 border text-white font-semibold text-xs outline-none rounded h-[33px] px-6`}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="px-[30px] py-6 flex justify-end gap-5">
            <Button
              onClick={saveEnvs}
              className="bg-[#0846A6] text-white font-semibold text-xs outline-none rounded h-[33px] px-6"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </Dashboard_layout>
  );
};

export default Dashboard;
