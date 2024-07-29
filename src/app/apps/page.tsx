"use client";

import React, { useState } from "react";
import { Modal, Input, Select, Empty, Spin } from "antd";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import {
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import { createApp, fetchAppByTag, fetchApps } from "@/api/appsClient";
import CustomInput from "../../components/common/Input";
import Dashboard_layout from "../../components/layouts/dashboard-layout";
import Button from "../../components/common/Button";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { createAppSchema } from "@/schemas/app.schemas";
import { ENV } from "@/types/env.types";
import { PublicStates } from "ductape-sdk/dist/types/enums";
import { ICreateAppBuilder } from "ductape-sdk/dist/types/appBuilder.types";
import ListItems from "@/components/listItems";
import { Components } from "@/types";
import WorkspaceEnvsModal from "@/components/workspaceEnvs";
import { ApiError } from "@/types/user.types";

const { TextArea } = Input;

export default function Apps() {
  const { defaultWorkspace } = useWorkspaces();
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [envs, setEnvs] = useState<ENV[]>(defaultWorkspace?.defaultEnvs || []);
  const [filterName, setFilterName] = useState("");
  const [appsStatus, setAppsStatus] = useState<PublicStates>(PublicStates.ALL);
  const [view, setView] = useState("grid");
  const queryClient = useQueryClient();

  const { data, status: appsLoadingStatus } = useQuery({
    queryKey: ["apps", defaultWorkspace?.workspace_id, appsStatus],
    queryFn: () =>
      fetchApps(
        token,
        {
          workspace_id: defaultWorkspace.workspace_id,
          status: appsStatus,
          user_id: user._id,
        },
        public_key
      ),
    enabled: !!defaultWorkspace,
  });

  const apps = data?.data?.data;

  const tagify = (str: string) => {
    return str?.replace(/[^A-Z0-9]/gi, "_").toLowerCase();
  };

  const handleFormSubmit = async () => {
    const tagExists = tags !== null;
    if (tagExists) {
      toast.error("App name already exists. Please choose a different name.");
      return;
    }
    mutate();
  };

  const formik = useFormik<ICreateAppBuilder>({
    initialValues: {
      app_name: "",
      description: "",
    },
    validationSchema: createAppSchema,
    onSubmit: handleFormSubmit,
  });

  const appName = formik.values.app_name;
  const description = formik.values.description;

  const tag = `${tagify(defaultWorkspace?.workspace_name)}:${tagify(appName)}`;

  const payload = {
    user_id: user?._id,
    app_name: appName,
    ...(description && { description }),
    public_key,
    tag,
    workspace_id: defaultWorkspace?.workspace_id,
  };

  const { mutate, status: creatingApp } = useMutation({
    mutationFn: () => createApp(token, payload),
    onSuccess: () => {
      toast.success("App created successfully");
      formik.resetForm();
      queryClient.invalidateQueries({
        queryKey: ["apps"],
      });
      setShowCreateAppModal(false);
    },
    onError: (error: ApiError) => {
      toast.error(error.response.data.errors || "An error occurred");
    },
  });

  const [debouncedTag] = useDebounceValue(tag, 500);

  const { data: tags, status: loadingTags } = useQuery({
    queryKey: ["tags", debouncedTag],
    queryFn: () => fetchAppByTag(token, debouncedTag),
    enabled: !!debouncedTag.split(":")[1] && !!formik.values.app_name,
  });

  return (
    <Dashboard_layout activeTab="Apps">
      <div className="w-screen h-screen">
        <div className="px-20 border-b h-[115px] flex flex-col justify-center  bg-white">
          <div className="flex justify-between utems-center">
            <p className="text-[28px] text-[#232830] font-semibold">Apps</p>
            <div className="flex gap-7">
              <Button
                onClick={() => setShowEnvModal(true)}
                disabled={!defaultWorkspace}
                className="font-semibold flex items-center text-sm border border-[#DC3444] text-[#DC3444] outline-none h-[40px] rounded px-[10px] gap-2"
              >
                <SettingOutlined className="text-[#DC3444]" size={16} />
                Environments
              </Button>
              <Button
                onClick={() => setShowCreateAppModal(true)}
                className="bg-[#0846A6] text-white font-semibold text-sm flex items-center outline-none  h-[40px] rounded px-[10px] gap-2"
                disabled={!defaultWorkspace}
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
              className="bg-white  border rounded w-full px-3 h-11 text-sm text-grey outline-none"
              prefix={<SearchOutlined />}
              onChange={(e) => setFilterName(e.target.value)}
            />

            <div className="h-11 flex">
              <div
                onClick={() => setView("grid")}
                className={`bg-white rounded-l border w-[50px] h-11 flex items-center justify-center cursor-pointer ${
                  view === "grid" && "border-[#0846A6]"
                }`}
              >
                <AppstoreOutlined
                  className={`${
                    view === "grid" ? "text-[#0846A6]" : "#232830"
                  }`}
                />
              </div>
              <div
                onClick={() => setView("list")}
                className={`bg-white rounded-r border w-[50px] h-11 flex items-center justify-center cursor-pointer ${
                  view === "list" && "border-[#0846A6]"
                }`}
              >
                <UnorderedListOutlined
                  className={`${
                    view === "list" ? "text-[#0846A6]" : "#232830"
                  }`}
                />
              </div>
            </div>
            <Select
              defaultValue={PublicStates.ALL}
              size="large"
              style={{ width: 173, height: 44 }}
              className="text-sm text-[#232830] outline-none"
              options={[
                { label: "All", value: PublicStates.ALL },
                { label: "Draft", value: PublicStates.DRAFT },
                { label: "Private", value: PublicStates.PRIVATE },
                { label: "Published", value: PublicStates.PUBLIC },
              ]}
              onChange={(value: PublicStates) => setAppsStatus(value)}
            />
          </div>

          {appsLoadingStatus === "success" && apps?.length > 0 ? (
            <div
              className={`mt-12 ${
                view === "grid"
                  ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-6"
              }`}
            >
              {apps
                ?.filter((app: { app_name: string }) =>
                  app.app_name.toLowerCase().includes(filterName.toLowerCase())
                )
                .map((app: { _id: React.Key }) => (
                  <ListItems
                    key={app._id}
                    data={app}
                    view="grid"
                    type={Components.APP}
                  />
                ))}
            </div>
          ) : apps?.length === 0 && appsLoadingStatus === "success" ? (
            <div className="mt-[51px]">
              <Empty />
            </div>
          ) : appsLoadingStatus === "pending" ? (
            <div className="mt-[51px]">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />{" "}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Modal
        open={showCreateAppModal}
        width="730px"
        className="rounded-none"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => setShowCreateAppModal(false)}
        style={{ paddingInline: 0 }}
      >
        <div className="px-3">
          <h1 className="text-grey text-2xl font-bold py-6 border-b">
            Create App
          </h1>
          <div className="mt-4">
            <p className="mt-3 text-sm font-medium">
              Each app defines its own environments, workflows and rules for
              authorization, authentication and integration. Allowing for secure
              communication between your webservices and integration partners.
            </p>

            <form className="mt-8" onSubmit={formik.handleSubmit}>
              <div>
                <CustomInput
                  placeholder="App Name"
                  onBlur={formik.handleBlur("app_name")}
                  value={formik.values.app_name}
                  onChange={formik.handleChange("app_name")}
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
                  onBlur={formik.handleBlur("description")}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                />{" "}
                {formik.touched.description && formik.errors.description ? (
                  <p className="text-xs mt-1 text-error">
                    {formik.errors.description}
                  </p>
                ) : null}
              </div>
              <div className="mt-7 pt-6 flex justify-end gap-5 border-t">
                <Button
                  type="button"
                  onClick={() => setShowCreateAppModal(false)}
                  className="font-semibold text-xs border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2"
                >
                  Cancel
                </Button>
                <Button
                  className={`${
                    creatingApp === "pending" ? "bg-[#D9D9D9]" : "bg-primary"
                  } text-white font-semibold text-xs outline-none rounded h-[33px] px-6`}
                  disabled={
                    creatingApp === "pending" || loadingTags === "pending"
                  }
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {showEnvModal ? (
        <WorkspaceEnvsModal
          setShowEnvModal={setShowEnvModal}
          showEnvModal={showEnvModal}
          envs={envs}
          setEnvs={setEnvs}
        />
      ) : (
        <></>
      )}
    </Dashboard_layout>
  );
}
