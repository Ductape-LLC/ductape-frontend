"use client";

import { useState } from "react";
import { Modal, Input, Switch } from "antd";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import CustomInput from "@/components/common/Input";
import CustomSelect from "@/components/common/Select";
import {
  deleteAppVariable,
  fetchApp,
  createAppConstant,
  updateAppConstant,
} from "@/api/appsClient";
import { ApiError } from "@/types/user.types";
import { Button } from "@/components/ui/button";

const { TextArea } = Input;

interface VariableProps {
  key: string;
  type: string;
  description: string;
  min_length: number;
  max_length: number;
  required: boolean;
}

const applicationVariableSchema = Yup.object().shape({
  key: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  min_length: Yup.number().required("Required"),
  max_length: Yup.number().required("Required"),
  required: Yup.boolean().required("Required"),
});

export default function Variables({
  params: { id },
}: {
  params: { id: string };
}) {
  const [showModal, setShowModal] = useState(false);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [actionType, setActionType] = useState("create");
  const [requiredStatus, setRequiredStatus] = useState(false);
  const [variableId, setVariableId] = useState("");
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
  const variables = app?.variables || [];

  const submitData = async (data: any, actionType: string, token: string) => {
    if (actionType === "create") {
      return await createAppConstant(token, data, app._id);
    } else {
      return await updateAppConstant(token, data, app._id);
    }
  };

  const handleSubmit = (values: VariableProps) => {
    const { key, type, description, min_length, max_length } = values;
    const data = {
      user_id: user._id,
      public_key,
      key,
      type,
      description,
      minlength: min_length,
      maxlength: max_length,
      required: requiredStatus,
      action: actionType,
      component: "variables",
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
      toast.success("Application variable updated successfully");
      setShowModal(false);
    },
    onError: (error: ApiError) => {
      toast.error(error.response.data.errors || "An error occurred");
    },
  });

  const handleDelete = async () => {
    try {
      const response = await deleteAppVariable(token, {
        user_id: user._id,
        app_id: app._id,
        public_key: public_key,
        variable_id: variableId,
      });
      if (response.status === 200) {
        setShowModal(false);
        toast.success("Application variable deleted successfully");
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.errors);
    }
  };

  const formik = useFormik<VariableProps>({
    initialValues: {
      key: "",
      description: "",
      type: "",
      min_length: 0,
      max_length: 0,
      required: false,
    },
    validationSchema: applicationVariableSchema,
    onSubmit: handleSubmit,
  });

  const openCreateModal = () => {
    setShowModal(true);
    setActionType("create");
    formik.resetForm();
  };

  const openUpdateModal = (variable: any) => {
    setShowModal(true);
    formik.setValues(variable);
    setActionType("update");
    setVariableId(variable._id);
  };

  if (appLoadingStatus === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Application Variable" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between">
            <h1 className="text-[#232830] font-bold text-3xl">
              Application Variables
            </h1>
            <Button
              onClick={openCreateModal}
              className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
            >
              <PlusOutlined />
              New Application Variable
            </Button>
          </div>

          <div className="px-16 p-10">
            {!variables.length ? (
              <div className="mt-20">
                <h1 className="text-4xl font-bold">
                  You do not have any application variables. Create an
                  application variable to get started.
                </h1>
                <Button
                  onClick={openCreateModal}
                  className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
                >
                  <PlusOutlined />
                  New Application Variable
                </Button>
              </div>
            ) : (
              <div>
                {variables.map((variable: any) => (
                  <div
                    key={variable._id}
                    onClick={() => openUpdateModal(variable)}
                    className="border rounded bg-white h-[110px] flex items-center px-7 justify-between mt-7 cursor-pointer"
                  >
                    <div>
                      <p className="font-bold text-lg">{variable.key}</p>
                      <p className="text-xs text-[#979797]">
                        {variable.description}
                      </p>
                    </div>
                    <div className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm uppercase">
                      {variable.type}
                    </div>
                    <p className="text-xs font-semibold">
                      {variable.required ? "Required" : "Not Required"}
                    </p>
                  </div>
                ))}
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
            <h1 className="text-grey text-xl font-bold border-b px-8 py-6">
              Create Application Variable
            </h1>
            <div className="px-7 mt-4 pb-7">
              <form className="mt-8" onSubmit={formik.handleSubmit}>
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
                <div className="mt-7">
                  <TextArea
                    className="bg-white border rounded w-full p-3 text-sm text-grey"
                    placeholder="Description"
                    rows={5}
                    onBlur={formik.handleBlur("description")}
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.description}
                    </p>
                  ) : null}
                </div>
                <div className="mt-7">
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
                      {
                        value: "object",
                        label: "Object",
                      },
                    ]}
                  />
                  {formik.touched.key && formik.errors.type ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.type}
                    </p>
                  ) : null}
                </div>
                <div className="mt-7">
                  <CustomInput
                    placeholder="Minimum Length"
                    onBlur={formik.handleBlur("min_length")}
                    value={formik.values.min_length}
                    onChange={formik.handleChange("min_length")}
                  />
                  {formik.touched.key && formik.errors.min_length ? (
                    <p className="text-xs mt-1 text-error">
                      {formik.errors.min_length}
                    </p>
                  ) : null}
                </div>
                <div className="mt-7">
                  <CustomInput
                    placeholder="Maximum Length"
                    onBlur={formik.handleBlur("max_length")}
                    value={formik.values.max_length}
                    onChange={formik.handleChange("max_length")}
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
                      Required
                    </p>
                  </div>
                  <Switch
                    checked={requiredStatus}
                    onChange={() => {
                      setRequiredStatus(!requiredStatus);
                    }}
                  />
                </div>
                <div className="py-6 flex justify-between items-center px-7">
                  {actionType === "update" && (
                    <Button
                      onClick={handleDelete}
                      className="font-semibold text-sm border text-white bg-[#DC3444] outline-none h-8 rounded px-6 gap-2"
                    >
                      Delete Application Variable
                    </Button>
                  )}

                  <div className="flex justify-end w-full gap-5">
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                      className="font-semibold text-sm text-grey outline-none h-8 rounded px-6"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary text-white font-semibold text-sm outline-none rounded h-8 px-6"
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
