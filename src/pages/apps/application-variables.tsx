/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dashboard_layout from '@/components/layouts/dashboard_layout';
import Apps_Layout from '@/components/layouts/apps_layout';
import CustomInput from '@/components/common/Input';
import CustomSelect from '@/components/common/Select';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { createAppVariable, fetchAppVariable } from '@/api/appsClient';
import toast from 'react-hot-toast';

const { TextArea } = Input;

interface VariableProps {
  key: string;
  type: string;
  description: string;
  min_length: number;
  max_length: number;
}

const applicationVariableSchema = Yup.object().shape({
  key: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  min_length: Yup.number().required('Required'),
  max_length: Yup.number().required('Required'),
});

const ApplicationVariables = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [variables, setVariables] = useState([]);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const { app } = useSelector((state: any) => state.app);

  const handleSubmit = async (values: VariableProps, submitProps: any) => {
    try {
      submitProps.setSubmitting(false);
      setLoading(true);
      toast.loading('Loading...');
      const data = {
        user_id: user._id,
        app_id: app._id,
        public_key: public_key,
        ...values,
      };
      const response = await createAppVariable(token, data);
      if (response.status === 200) {
        toast.success('Application variable created successfully');
        submitProps.resetForm();
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik<VariableProps>({
    initialValues: {
      key: '',
      description: '',
      type: '',
      min_length: 0,
      max_length: 0,
    },
    validationSchema: applicationVariableSchema,
    onSubmit: handleSubmit,
  });

  const fetchVariables = async () => {
    try {
      const response = await fetchAppVariable(
        token,
        app._id,
        user._id,
        public_key
      );
      if (response.status === 200) {
        setVariables(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.errors);
    }
  };

  useEffect(() => {
    fetchVariables();
  }, []);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Application Variable">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between">
            <h1 className="text-[#232830] font-bold text-3xl">
              Application Variables
            </h1>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
            >
              <PlusOutlined />
              New Application Variable
            </Button>
          </div>

          <div className="px-16 p-10">
            {/* <div className="mt-20">
              <h1 className="text-4xl font-bold">
                You do not have any application variables. Create an application
                variable to get started.
              </h1>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
              >
                <PlusOutlined />
                New Application Variable
              </Button>
            </div> */}

            <div>
              <div className="border rounded bg-white h-[110px] flex items-center px-7 justify-between">
                <p className="font-bold text-lg">Production</p>
                <button className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm">
                  Inactive
                </button>
                <p className="underline text-xs font-semibold">
                  Production Environment
                </p>
              </div>

              <div className="border rounded bg-white h-[110px] flex items-center px-7 justify-between mt-7">
                <p className="font-bold text-lg">Sandbox</p>
                <button className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm">
                  Inactive
                </button>
                <p className="underline text-xs font-semibold">
                  Sandbox Environment
                </p>
              </div>

              <div className="border rounded bg-white h-[110px] flex items-center px-7 justify-between mt-7">
                <p className="font-bold text-lg">Test</p>
                <button className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm">
                  Inactive
                </button>
                <p className="underline text-xs font-semibold">
                  Test Environment
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={showModal}
          width="730px"
          className="rounded-none"
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={() => setShowModal(false)}
          style={{ padding: 0 }}
        >
          <div>
            <h1 className="text-[#232830] text-xl font-bold border-b px-[30px] py-6">
              Create Application Variable
            </h1>
            <div className="px-[30px] mt-4 pb-7 border-b">
              <form className="mt-[31px]">
                <div>
                  <CustomInput
                    placeholder="Key"
                    onBlur={formik.handleBlur('key')}
                    value={formik.values.key}
                    onChange={formik.handleChange('key')}
                  />
                  {formik.touched.key && formik.errors.key ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.key}
                    </p>
                  ) : null}
                </div>
                <div className="mt-[26px]">
                  <TextArea
                    className="bg-white border rounded w-full p-3 text-sm text-[#232830]"
                    placeholder="Description"
                    rows={5}
                    onBlur={formik.handleBlur('description')}
                    value={formik.values.description}
                    onChange={formik.handleChange('description')}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.description}
                    </p>
                  ) : null}
                </div>
                <div className="mt-[26px]">
                  <CustomInput
                    placeholder="Type"
                    onBlur={formik.handleBlur('type')}
                    value={formik.values.type}
                    onChange={formik.handleChange('type')}
                  />
                  {formik.touched.key && formik.errors.type ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.type}
                    </p>
                  ) : null}
                </div>
                <div className="mt-[26px]">
                  <CustomInput
                    placeholder="Minimum Length"
                    onBlur={formik.handleBlur('min_length')}
                    value={formik.values.min_length}
                    onChange={formik.handleChange('min_length')}
                  />
                  {formik.touched.key && formik.errors.min_length ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.min_length}
                    </p>
                  ) : null}
                </div>
                <div className="mt-[26px]">
                  <CustomInput
                    placeholder="Maximum Length"
                    onBlur={formik.handleBlur('max_length')}
                    value={formik.values.max_length}
                    onChange={formik.handleChange('max_length')}
                  />
                  {formik.touched.key && formik.errors.max_length ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.max_length}
                    </p>
                  ) : null}
                </div>

                <div>
                  <div className="flex items-center gap-1 mt-9">
                    <InfoCircleOutlined />
                    <p className="font-semibold tracking-[-0.4px] text-[#979797]">
                      Active and open to connections?
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </form>
            </div>

            <div className="px-[30px] py-6 flex justify-end gap-5">
              <Button
                onClick={() => setShowModal(false)}
                className="font-semibold text-sm border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-[33px] px-6"
                disabled={!formik.isValid || !formik.dirty || loading}
                onClick={() => formik.handleSubmit()}
              >
                Create
              </Button>
            </div>
          </div>
        </Modal>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default ApplicationVariables;
