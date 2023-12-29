/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from "react";
import { Modal, Input, Select, Drawer, Empty, Spin } from "antd";
import CustomInput from "../../components/common/Input";
import Dashboard_layout from "../../components/layouts/dashboard_layout";
import Button from "../../components/common/Button";
import { useFormik } from "formik";

import toast from "react-hot-toast";
import { createProject, fetchProjects } from "@/api/integrationsClient";
import { useSelector } from "react-redux";
import {
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { createAppSchema } from "@/schemas/app.schemas";
import { addEnvSchema } from "@/schemas/env.schemas";
import { ENV } from "@/types/env.types";
import { PublicStates } from "ductape-sdk/dist/types/enums";
import {
  ICreateIntegrationsBuilder,
  IIntegration,
} from "ductape-sdk/dist/types/integrationsBuilder.types";
import ListItems from "@/components/listItems";
import { Components } from "@/types";
import WorkspaceEnvsModal from "@/components/workspaceEnvs";

const { TextArea } = Input;

const Dashboard = () => {
  const { defaultWorkspace } = useWorkspaces();
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [showCreateIntegrationModal, setShowCreateIntegrationModal] =
    useState(false);
  // const { defaultWorkspace } = useSelector((state: any) => state.workspace);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [integrations, setIntegrations] = useState<IIntegration[]>([]);
  const [envs, setEnvs] = useState<ENV[]>(defaultWorkspace?.defaultEnvs || []);
  const [filterName, setFilterName] = useState("");
  const [integrationsStatus, setIntegrationsStatus] = useState<PublicStates>(
    PublicStates.ALL
  );
  const [view, setView] = useState("grid");

  const fetchAllIntegrations = async () => {
    try {
      console.log("DEAFULT WORKSPACE =======>>>>>", defaultWorkspace);
      setLoadingData(true);
      const auth = {
        workspace_id: defaultWorkspace.workspace_id,
        user_id: user._id,
        public_key,
        token,
      };
      const response = await fetchProjects(auth, integrationsStatus);
      setLoadingData(false);
      if (response) {
        console.log(response, "projects");
        setIntegrations(response);
      }
    } catch (error: any) {
      setLoadingData(false);
      toast.error(error);
    }
  };

  const handleSubmit = async (
    values: ICreateIntegrationsBuilder,
    submitProps: any
  ) => {
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
      await createProject(auth, values);
      fetchAllIntegrations();
      toast.success("Project created successful");
      setLoading(false);
      submitProps.resetForm();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const formik = useFormik<ICreateIntegrationsBuilder>({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: createAppSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!defaultWorkspace) return;
    fetchAllIntegrations();
  }, [defaultWorkspace, integrationsStatus]);

  return (
    <Dashboard_layout activeTab="Integrations">
      <div className="w-screen h-screen">
        <div className="px-20 border-b h-[115px] flex flex-col justify-center  bg-white">
          <div className="flex justify-between utems-center">
            <p className="text-[28px] text-[#232830] font-semibold">
              Integrations
            </p>
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
                onClick={() => setShowCreateIntegrationModal(true)}
                className="bg-[#0846A6] text-white font-semibold text-sm flex items-center outline-none  h-[40px] rounded px-[10px] gap-2"
                disabled={!defaultWorkspace}
              >
                <PlusOutlined className="text-white" size={16} />
                New Project
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
              onChange={(value) => setIntegrationsStatus(value)}
            />
          </div>

          {!loadingData && integrations.length > 0 ? (
            <div
              className={`mt-[51px] ${
                view === "grid" && "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {integrations
                .filter((integration) =>
                  integration.name
                    .toLowerCase()
                    .includes(filterName.toLowerCase())
                )
                .map((integration) => (
                  <ListItems
                    key={integration._id}
                    data={integration}
                    type={Components.INTEGRATION}
                    view="grid"
                  />
                ))}
            </div>
          ) : integrations.length === 0 && !loadingData ? (
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
        open={showCreateIntegrationModal}
        width="730px"
        className="rounded-none"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => setShowCreateIntegrationModal(false)}
        style={{ padding: 0 }}
      >
        <div>
          <h1 className="text-[#232830] text-2xl font-bold border-b px-[30px] py-6">
            Create Integration
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
                  placeholder="Project Name"
                  onBlur={formik.handleBlur("app_name")}
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-xs mt-1 text-error">
                    {formik.errors.name}
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
              onClick={() => setShowCreateIntegrationModal(false)}
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

      {showEnvModal? <WorkspaceEnvsModal setShowEnvModal={setShowEnvModal} showEnvModal={showEnvModal} envs={envs} setEnvs={setEnvs} />: <></>}
    </Dashboard_layout>
  );
};

export default Dashboard;
