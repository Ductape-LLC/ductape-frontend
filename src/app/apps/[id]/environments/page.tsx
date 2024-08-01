"use client";

import { useState } from "react";
import { Modal, Input, Switch, Empty, Spin } from "antd";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import CustomInput from "@/components/common/Input";
import {
  PlusOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { IAppEnv } from "ductape-sdk/dist/types/appBuilder.types";
import { Capitalize } from "@/utils";
import {
  createAppConstant,
  deleteAppConstant,
  fetchApp,
  updateAppConstant,
} from "@/api/appsClient";
import toast from "react-hot-toast";
import { ApiError } from "@/types/user.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/components/common/Button";

const { TextArea } = Input;

interface EnvironmentProps {
  envName: string;
  envDescription: string;
  baseUrl: string;
}

const applicationConstantSchema = Yup.object().shape({
  envName: Yup.string().required("Environment name is required"),
  envDescription: Yup.string().required("Environment description is required"),
  baseUrl: Yup.string().required("Base URL is required"),
});

export default function Environments({
  params: { id },
}: {
  params: { id: string };
}) {
  const [showModal, setShowModal] = useState(false);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [actionType, setActionType] = useState("create");
  const [requireWhitelistedIPs, setRequireWhitelistedIPs] = useState(false);
  const [isActive, setIsActive] = useState(false);
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
  const envs = app?.envs || [];

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

  const handleSubmit = (values: EnvironmentProps) => {
    const { envName, envDescription, baseUrl } = values;
    const data = {
      user_id: user._id,
      public_key,
      env_name: envName,
      description: envDescription,
      base_url: baseUrl,
      action: actionType,
      component: "env",
      workspace_id: app.workspace_id,
      slug: envName.slice(0, 3),
      whitelist: requireWhitelistedIPs,
      active: isActive,
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
      toast.success("Application environment updated successfully");
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

  const formik = useFormik<EnvironmentProps>({
    initialValues: {
      envName: "",
      envDescription: "",
      baseUrl: "",
    },
    validationSchema: applicationConstantSchema,
    onSubmit: handleSubmit,
  });

  if (appLoadingStatus === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Environments" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between">
            <h1 className="text-[#232830] font-bold text-3xl">Environments</h1>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
            >
              <PlusOutlined />
              New Environment
            </Button>
          </div>

          <div className="px-16 p-10">
            {!app.envs?.length ? (
              <div className="mt-20">
                <h1 className="text-4xl font-bold">
                  You do not have any environments. Create an environment to get
                  started.
                </h1>
                <Button
                  onClick={() => setShowModal(true)}
                  className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
                >
                  <PlusOutlined />
                  New Environment
                </Button>
              </div>
            ) : (
              <div>
                {!app ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : envs && envs?.length ? (
                  <>
                    {envs.map((env: IAppEnv) => {
                      return (
                        <div
                          key={env?._id}
                          className="border rounded bg-white h-[110px] flex items-center px-7 justify-between mb-7 cursor-pointer hover:shadow-md transition-all"
                          onClick={() => openUpdateModal(env)}
                        >
                          <p className="font-bold text-lg">
                            {Capitalize(env?.env_name)}
                          </p>
                          <div
                            className={`${
                              env?.active
                                ? "text-[#00875A] bg-[#00875A] border-[#00875A] border-[0.5px]"
                                : "text-[#DC3444] bg-[#DC3444] border-[#DC3444] border-[0.5px]"
                            } bg-opacity-[15%] border text-xs px-[14px] py-1 rounded-sm`}
                          >
                            {env.active ? "Active" : "Inactive"}
                          </div>
                          <p className="underline text-xs font-semibold">
                            {Capitalize(env?.description || "")}
                          </p>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <Empty />
                )}
              </div>
            )}
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
              Create Environment
            </h1>
            <div className="px-7 mt-4 pb-7 border-b">
              <form className="mt-8" onSubmit={formik.handleSubmit}>
                <CustomInput
                  placeholder="Environment Name"
                  value={formik.values.envName}
                  onChange={formik.handleChange("envName")}
                  onBlur={formik.handleBlur("envName")}
                />
                <CustomInput
                  placeholder="Base URL"
                  className="mt-6"
                  value={formik.values.baseUrl}
                  onChange={formik.handleChange("baseUrl")}
                  onBlur={formik.handleBlur("baseUrl")}
                />
                <TextArea
                  className="bg-white border rounded w-full p-3 text-sm text-grey mt-6"
                  placeholder="Tell us about your app, what it does and how to use it"
                  rows={5}
                  value={formik.values.envDescription}
                  onChange={formik.handleChange("envDescription")}
                  onBlur={formik.handleBlur("envDescription")}
                />

                <div>
                  <div>
                    <div className="flex items-center gap-1 mt-9">
                      <InfoCircleOutlined />
                      <p className="font-semibold tracking-[-0.4px] text-[#979797]">
                        Require Whitelisted IPs
                      </p>
                    </div>
                    <Switch
                      checked={requireWhitelistedIPs}
                      onChange={() =>
                        setRequireWhitelistedIPs(!requireWhitelistedIPs)
                      }
                    />
                  </div>

                  <div className="flex items-center gap-1 mt-5">
                    <InfoCircleOutlined />
                    <p className="font-semibold tracking-[-0.4px] text-[#979797]">
                      Active and open to connections?
                    </p>
                  </div>
                  <Switch
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                </div>

                <div className="px-7 py-6 flex justify-end gap-5">
                  <Button
                    onClick={() => setShowModal(false)}
                    className="font-semibold text-sm border text-grey outline-none h-8 rounded px-6 gap-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-8 px-6"
                    disabled={appMutationStatus === "pending"}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
