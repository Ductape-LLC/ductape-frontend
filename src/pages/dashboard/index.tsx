/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Dashboard_layout from '@/components/layouts/dashboard_layout';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { createWorkspace } from '@/api/workspaceClient';
import {
  setShowCreateWorkspaceModal,
} from '@/redux/slice/workspaceSlice';
import { useWorkspaces } from '@/hooks/useWorkspaces';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface FormValues {
  name: string;
}

const createWorkSpaceSchema = Yup.object().shape({
  name: Yup.string().required('Workspace name is required'),
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const { fetchAndSaveWorkSacpes } = useWorkspaces();
  const {
    workspaces,
    defaultWorkspace,
    workspaceStats,
    showCreateWorkspaceModal,
  } = useSelector((state: any) => state.workspace);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues, submitProps: any) => {
    try {
      submitProps.setSubmitting(false);
      setLoading(true);
      toast.loading('Loading...');
      const data = {
        name: values.name,
        public_key,
        user_id: user._id,
      };
      const response = await createWorkspace(token, data);
      if (response.status === 201) {
        setLoading(false);
        toast.success('Workspace created successful');
        fetchAndSaveWorkSacpes();
        dispatch(setShowCreateWorkspaceModal(false));
      }
      setLoading(false);
      submitProps.resetForm();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
    },
    validationSchema: createWorkSpaceSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!defaultWorkspace) {
      dispatch(setShowCreateWorkspaceModal(true));
    }
  }, []);

  return (
    <Dashboard_layout activeTab="Dashboard">
      <div className="w-screen">
        <div className="px-20 pt-[47px] border-b flex flex-col justify-between h-[237px] bg-white">
          <div>
            <p className="font-semibold text-[#979797]">
              Dashboard /{' '}
              <span className="text-[#232830]">
                {moment().format('dddd D MMMM, YYYY')}
              </span>
            </p>
            <p className="text-[28px] text-[#232830]">
              Welcome Back,{' '}
              <span className="font-semibold">{user?.firstname}</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-[68px] gap-4">
            <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
              <p className="text-[#78797A] text-sm">APPS</p>
              <h1 className="text-[#232830] font-bold text-3xl mt-2">
                {workspaceStats.apps.toLocaleString()}
              </h1>
            </div>

            <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
              <p className="text-[#78797A] text-sm">INTEGRATIONS</p>
              <h1 className="text-[#232830] font-bold text-3xl mt-2">
                {workspaceStats.integrations.toLocaleString()}
              </h1>
            </div>

            <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
              <p className="text-[#78797A] text-sm">Inbound Requests</p>
              <h1 className="text-[#232830] font-bold text-3xl mt-2">
                {workspaceStats.inbound_requests.toLocaleString()}
              </h1>
            </div>

            <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
              <p className="text-[#78797A] text-sm">Outbount Request</p>
              <h1 className="text-[#232830] font-bold text-3xl mt-2">
                {workspaceStats.outbound_requests.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>

        <div className="px-20 pt-[106px]">
          <div className="flex items-center gap-[57px]">
            <div className="flex-1 border bg-white rounded">
              <div className="px-[30px] py-6 border-b">
                <h2 className="text-[#232830] text-2xl font-bold">
                  Request Overtime
                </h2>
                <p className="text-[#979797]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Some
                  text content here
                </p>
              </div>

              <div className="h-96 py-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    {/* <Tooltip />
                    <Legend /> */}
                    <Line
                      type="monotone"
                      dataKey="pv"
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                      stroke="#5243AA"
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke="#00875A"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="w-[35%] border bg-white rounded">
              <div className="px-[30px] py-6 border-b">
                <h2 className="text-[#232830] text-2xl font-bold">
                  Integrations
                </h2>
                <p className="text-[#979797]">
                  Lorem ipsum dolor sit amet, consectetur.
                </p>
              </div>

              <div className="h-96 py-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#5243AA"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={showCreateWorkspaceModal}
          width="50%"
          className="rounded-none"
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={() => dispatch(setShowCreateWorkspaceModal(false))}
        >
          <div className="py-14 px-12">
            <h1 className="text-[#232830] text-2xl font-bold">
              Welcome to Ductape
            </h1>
            <p className="text-[#232830] mt-3 max-w-[482px] text-base">
              To get started, you need to create a workspace or join an existing
              workspace.
            </p>
            <form className="mt-[49px]">
              <div>
                <Input
                  placeholder="Workspace Name"
                  onBlur={formik.handleBlur('name')}
                  value={formik.values.name}
                  onChange={formik.handleChange('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-xs mt-1 text-error">
                    {formik.errors.name}
                  </p>
                ) : null}
              </div>
              <div className="mt-[35px]">
                <Button
                  disabled={!formik.isValid || !formik.dirty || loading}
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                >
                  Create Workspace
                </Button>
              </div>
            </form>
            <div className="mt-20 w-full text-center">
              <Link
                href="#"
                className=" text-primary text-center font-base font-bold"
              >
                Or join an existing workspace
              </Link>
            </div>
          </div>
        </Modal>
        <div className="h-20" />
      </div>
    </Dashboard_layout>
  );
};

export default Dashboard;
