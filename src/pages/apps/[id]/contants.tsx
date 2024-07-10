/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dashboard_layout from "@/components/layouts/dashboard_layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import CustomInput from "@/components/common/Input";
import CustomSelect from "@/components/common/Select";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  createAppConstant,
  deleteAppConstant,
  fetchAppConstant,
  updateAppConstant,
} from "@/api/appsClient";
import toast from "react-hot-toast";

const { TextArea } = Input;

interface ConstantProps {
  key: string;
  value: string;
  type: string;
  description: string;
}

const applicationConstantSchema = Yup.object().shape({
  key: Yup.string().required("Required"),
  value: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
});

const ApplicationContants = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [constants, setConstants] = useState([]);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const { app } = useSelector((state: any) => state.app);
  const [actionType, setActionType] = useState("create");
  const [constantId, setConstantId] = useState("");

  const handleSubmit = async (values: ConstantProps, submitProps: any) => {
    const { key, value, description, type } = values;
    try {
      submitProps.setSubmitting(false);
      setLoading(true);
      toast.loading("Loading...");
      const data = {
        user_id: user._id,
        app_id: app._id,
        public_key: public_key,
        key,
        value,
        description,
        type,
      };
      if (actionType === "create") {
        const response = await createAppConstant(token, data);
        if (response.status === 200) {
          toast.success("Application constant created successfully");
          submitProps.resetForm();
          setShowModal(false);
          fetchContants();
        }
      } else {
        const response = await updateAppConstant(token, {
          ...data,
          constant_id: constantId,
        });
        if (response.status === 200) {
          toast.success("Application constant updated successfully");
          submitProps.resetForm();
          setShowModal(false);
          fetchContants();
        }
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      toast.loading("Loading...");
      const response = await deleteAppConstant(token, {
        user_id: user._id,
        app_id: app._id,
        public_key: public_key,
        constant_id: constantId,
      });
      if (response.status === 200) {
        toast.success("Application constant deleted successfully");
        setShowModal(false);
        fetchContants();
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setShowModal(true);
    setActionType("create");
    formik.resetForm();
  };

  const openUpdateModal = (constant: any) => {
    setShowModal(true);
    formik.setValues(constant);
    setActionType("update");
    setConstantId(constant._id);
  };

  const formik = useFormik<ConstantProps>({
    initialValues: {
      key: "",
      value: "",
      description: "",
      type: "",
    },
    validationSchema: applicationConstantSchema,
    onSubmit: handleSubmit,
  });

  const fetchContants = async () => {
    try {
      const response = await fetchAppConstant(
        token,
        app._id,
        user._id,
        public_key
      );
      if (response.status === 200) {
        setConstants(response.data.data || []);
      }
    } catch (error: any) {
      toast.error(error.response.data.errors);
    }
  };

  useEffect(() => {
    fetchContants();
  }, []);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Application Constants">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between">
            <h1 className="text-[#232830] font-bold text-3xl">
              Application Constants
            </h1>
            {constants.length > 0 && (
              <Button
                onClick={openCreateModal}
                className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
              >
                <PlusOutlined />
                New Application Contant
              </Button>
            )}
          </div>

          <div className="px-16 p-10">
            {constants.length === 0 && (
              <div className="mt-20">
                <h1 className="text-4xl font-bold leading-[42px] max-w-4xl">
                  You do not have any application constants. Create an
                  application constant to get started.
                </h1>
                <Button
                  onClick={openCreateModal}
                  className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
                >
                  <PlusOutlined />
                  New Application Constant
                </Button>
              </div>
            )}

            <div>
              {constants.map((constant: any) => (
                <div
                  key={constant._id}
                  className="border rounded bg-white h-[110px] flex items-center px-7 justify-between mt-7 cursor-pointer"
                  onClick={() => openUpdateModal(constant)}
                >
                  <div>
                    <p className="font-bold text-lg">{constant.key}</p>
                    <p className="text-xs text-[#979797]">
                      {constant.description}
                    </p>
                  </div>
                  <div className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm uppercase">
                    {constant.type}
                  </div>
                  <p className="text-xs font-semibold">{constant.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal
          open={showModal}
          width="730px"
          className="rounded-none"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => setShowModal(false)}
          style={{ padding: 0 }}
        >
          <div>
            <h1 className="text-[#232830] text-xl font-bold border-b px-[30px] py-6">
              Create Application Contants
            </h1>
            <div className="px-[30px] mt-4 pb-7 border-b">
              <form className="mt-[31px]">
                <div>
                  <CustomInput
                    placeholder="Key"
                    onBlur={formik.handleBlur("key")}
                    value={formik.values.key}
                    onChange={formik.handleChange("key")}
                  />
                  {formik.touched.key && formik.errors.key ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.key}
                    </p>
                  ) : null}
                </div>
                <div className="mt-[26px]">
                  <CustomInput
                    placeholder="Value"
                    onBlur={formik.handleBlur("value")}
                    value={formik.values.value}
                    onChange={formik.handleChange("value")}
                  />
                  {formik.touched.value && formik.errors.value ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.value}
                    </p>
                  ) : null}
                </div>
                <div className="mt-[26px]">
                  <CustomSelect
                    placeholder="Type"
                    value={formik.values.type}
                    onChange={(value: string) =>
                      formik.setFieldValue("type", value)
                    }
                    options={[
                      {
                        value: "string",
                        label: "String",
                      },
                    ]}
                  />

                  {formik.touched.value && formik.errors.type ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.type}
                    </p>
                  ) : null}
                </div>
                <div className="mt-[26px]">
                  <TextArea
                    className="bg-white border rounded w-full p-3 text-sm text-[#232830]"
                    placeholder="Description"
                    rows={5}
                    onBlur={formik.handleBlur("description")}
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                  />
                  {formik.touched.value && formik.errors.description ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.description}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>

            <div className="py-6 flex justify-between items-center px-[30px]">
              {actionType === "update" && (
                <Button
                  onClick={handleDelete}
                  className="font-semibold text-sm border  text-white bg-[#DC3444] outline-none h-[33px] rounded px-6 gap-2"
                >
                  Delete Application Constant
                </Button>
              )}

              <div className="flex justify-end w-full gap-5">
                <Button
                  onClick={() => setShowModal(false)}
                  className="font-semibold text-sm border  text-[#232830] outline-none h-[33px] rounded px-6"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-[33px] px-6"
                  disabled={!formik.isValid || !formik.dirty || loading}
                  onClick={() => formik.handleSubmit()}
                >
                  {actionType === "create" ? "Create" : "Update"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default ApplicationContants;
