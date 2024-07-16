"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from "react";
import { Modal, Input, Select, Drawer, Empty, Spin } from "antd";
import CustomInput from "../../components/common/Input";
import Dashboard_layout from "../../components/layouts/dashboard-layout";
import Button from "../../components/common/Button";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { createApp, fetchApps } from "@/api/appsClient";
import { useSelector } from "react-redux";
import {
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  EditOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { createAppSchema } from "@/schemas/app.schemas";
import { ENV } from "@/types/env.types";
import { PublicStates } from "ductape-sdk/dist/types/enums";
import {
  IApp,
  ICreateAppBuilder,
} from "ductape-sdk/dist/types/appBuilder.types";
import ListItems from "@/components/listItems";
import { Components } from "@/types";
import WorkspaceEnvsModal from "@/components/workspaceEnvs";

const { TextArea } = Input;

export default function Apps() {
  const { defaultWorkspace } = useWorkspaces();
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);
  // const { defaultWorkspace } = useSelector((state: any) => state.workspace);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [apps, setApps] = useState<IApp[]>([]);
  const [envs, setEnvs] = useState<ENV[]>(defaultWorkspace?.defaultEnvs || []);
  const [filterName, setFilterName] = useState("");
  const [appsStatus, setAppsStatus] = useState<PublicStates>(PublicStates.ALL);
  const [view, setView] = useState("grid");

  const fetchAllApps = async () => {
    try {
      setLoadingData(true);
      console.log("DEAFULT WORKSPACE =======>>>>>", defaultWorkspace);
      const auth = {
        workspace_id: defaultWorkspace.workspace_id,
        user_id: user._id,
        public_key,
        token,
      };

      // const response = await fetchApps(auth, appsStatus);
      // setLoadingData(false);
      // if (response) {
      //   setApps(response);
      // }
    } catch (error: any) {
      setLoadingData(false);
      toast.error(error);
    }
  };

  const handleSubmit = async (values: any, submitProps: any) => {
    try {
      submitProps.setSubmitting(false);
      setLoading(true);
      toast.loading("Loading...");
      const auth = {
        token,
        public_key,
        user_id: user._id,
        workspace_id: defaultWorkspace._id,
      };

      const response = await createApp(auth.token, values);
      if (response) {
        setLoading(false);
        fetchAllApps();
        toast.success("Workspace created successful");
      }
      setLoading(false);
      submitProps.resetForm();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const formik = useFormik<ICreateAppBuilder>({
    initialValues: {
      app_name: "",
      description: "",
    },
    validationSchema: createAppSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!defaultWorkspace) return;
    fetchAllApps();
  }, [defaultWorkspace, appsStatus]);

  return (
    <Dashboard_layout activeTab="App">
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
              className="bg-white  border rounded w-full px-3 h-11 text-sm text-[#232830] outline-none"
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

          {!loadingData && apps.length > 0 ? (
            <div
              className={`mt-[51px] ${
                view === "grid" && "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {apps
                .filter((app) =>
                  app.app_name.toLowerCase().includes(filterName.toLowerCase())
                )
                .map((app) => (
                  <ListItems
                    key={app._id}
                    data={app}
                    view="grid"
                    type={Components.APP}
                  />
                ))}
            </div>
          ) : apps.length === 0 && !loadingData ? (
            <div className="mt-[51px]">
              <Empty />
            </div>
          ) : loadingData ? (
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
                  onBlur={formik.handleBlur("app_description")}
                  value={formik.values.description}
                  onChange={formik.handleChange("app_description")}
                />{" "}
                {formik.touched.description && formik.errors.description ? (
                  <p className="text-xs mt-1 text-error">
                    {formik.errors.description}
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
                  ? "bg-[#D9D9D9]"
                  : "bg-primary"
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
