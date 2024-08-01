"use client";

import React, { useState } from "react";
import { Modal, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import CustomInput from "@/components/common/Input";
import CustomSelect from "@/components/common/Select";
import { PlusOutlined } from "@ant-design/icons";
import {
  createAppConstant,
  deleteAppConstant,
  fetchApp,
  updateAppConstant,
} from "@/api/appsClient";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/types/user.types";
import Button from "@/components/common/Button";

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

export default function Constants({
  params: { id },
}: {
  params: { id: string };
}) {
  const [showModal, setShowModal] = useState(false);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [actionType, setActionType] = useState("create");
  const queryClient = useQueryClient();

  const payload = {
    token,
    app_id: id,
    user_id: user?._id,
    public_key,
  };

  const { data, status: appLoadingStatus } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  const app = data?.data?.data;
  const constants = app?.constants || [];

  const submitData = async (data: any, actionType: string, token: string) => {
    if (actionType === "create") {
      return await createAppConstant(token, data, app._id);
    } else {
      return await updateAppConstant(token, data, app._id);
    }
  };

  const deleteData = async (data: any, token: string) => {
    return await deleteAppConstant(token, data, app._id);
  };

  const handleSubmit = (values: ConstantProps) => {
    const { key, value, description, type } = values;
    const data = {
      user_id: user._id,
      public_key: public_key,
      key,
      value,
      description,
      type,
      action: actionType,
      component: "constants",
      workspace_id: app.workspace_id,
    };

    mutate({ data, actionType, token });
  };

  const { mutate, status: appMutationStatus } = useMutation({
    mutationFn: ({
      data,
      actionType,
      token,
    }: {
      data: any;
      actionType: string;
      token: string;
    }) => submitData(data, actionType, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app", id],
      });
      toast.success("Application constant updated successfully");
      setShowModal(false);
    },
    onError: (error: ApiError) => {
      toast.error(error.response.data.errors || "An error occurred");
    },
  });

  const { mutate: deleteAppConstantMutation, status: deleteStatus } =
    useMutation({
      mutationFn: async (payload: any) => {
        return await deleteData(payload, token);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["app", id],
        });
        toast.success("Application constant deleted successfully");
        setShowModal(false);
      },
      onError: (error: ApiError) => {
        toast.error(error.response.data.errors || "An error occurred");
      },
    });

  const openCreateModal = () => {
    setShowModal(true);
    setActionType("create");
    formik.resetForm();
  };

  const openUpdateModal = (constant: any) => {
    setShowModal(true);
    formik.setValues(constant);
    setActionType("update");
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

  if (appLoadingStatus === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Application Constants" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between">
            <h1 className="text-grey font-bold text-3xl">
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
                  key={constant.key}
                  className="border rounded bg-white h-[110px] grid grid-cols-3 items-center pl-7 pr-20 justify-between mt-7 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => openUpdateModal(constant)}
                >
                  <div>
                    <p className="font-bold text-lg">{constant.key}</p>
                    <p className="text-xs text-[#979797]">
                      {constant.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm uppercase w-fit flex items-center">
                      {constant.type}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="text-xs font-semibold">{constant.value}</p>
                  </div>
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
            <h1 className="text-grey text-xl font-bold border-b px-7 py-6">
              Create Application Contants
            </h1>
            <div className="px-7 mt-4">
              <form
                className="mt-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
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
                <div className="mt-6">
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
                <div className="mt-6">
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
                <div className="mt-6">
                  <TextArea
                    className="bg-white border rounded w-full p-3 text-sm text-grey"
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
                <div className="mt-7 pt-6 flex justify-between items-center border-t">
                  {actionType === "update" && (
                    <Button
                      onClick={() => {
                        deleteAppConstantMutation({
                          key: formik.values.key,
                          user_id: user._id,
                          public_key,
                        });
                      }}
                      disabled={deleteStatus === "pending"}
                      className="font-semibold text-xs border text-white bg-[#DC3444] outline-none h-8 rounded px-6 gap-2 whitespace-nowrap"
                    >
                      Delete Application Constant
                    </Button>
                  )}

                  <div className="flex justify-end w-full gap-5">
                    <Button
                      onClick={() => setShowModal(false)}
                      className="font-semibold text-sm border  text-grey outline-none h-8 rounded px-6"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-8 px-6"
                      disabled={appMutationStatus === "pending"}
                    >
                      {actionType === "create" ? "Create" : "Update"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
