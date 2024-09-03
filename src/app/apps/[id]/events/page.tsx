"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ReactSelect from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

export default function Events({ params: { id } }: { params: { id: string } }) {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
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

  const initialValues: ConstantProps = {
    key: "",
    value: "",
    type: "",
    description: "",
  };

  if (appLoadingStatus === "pending") {
    return <p>Loading...</p>;
  }

  const events = 1;

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Events" id={id}>
        <div>
          <div className="px-16 h-[110px] border-b bg-white flex items-center justify-between">
            <h1 className="text-grey font-bold text-3xl">Events</h1>

            {events === 1 && (
              <Button
                onClick={openCreateModal}
                className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
              >
                <PlusOutlined /> New Event
              </Button>
            )}
          </div>

          <div className="px-16 p-10">
            {events !== 1 && (
              <div className="mt-20">
                <h1 className="text-4xl font-bold leading-[42px] max-w-4xl">
                  You do not have any events. Create an event, and actions to
                  get started.
                </h1>
                <Button
                  onClick={openCreateModal}
                  className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
                >
                  <PlusOutlined /> New Event
                </Button>
              </div>
            )}

            <div>
              {events === 1 && (
                <div
                  //   key={constant.key}
                  className="border rounded bg-white h-[110px] grid grid-cols-4 items-center pl-7 pr-20 justify-between mt-7 cursor-pointer hover:shadow-md transition-all"
                  //   onClick={() => openUpdateModal(constant)}
                >
                  <div className="grid gap-1">
                    <p className="font-bold text-lg">Account Created</p>
                    <p className="text-sm text-[#979797]">
                      React when an account gets created successfully
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-primary border border-primary text-xs font-medium px-2 py-1 bg-[#0846A615] rounded-sm uppercase w-fit flex items-center">
                      ACCOUNT_CREATED
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-semibold">Registered</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="text-sm font-semibold underline">
                      Production, Sandbox
                    </p>
                  </div>
                </div>
              )}
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
            <div className="flex items-center gap-3 pb-5 border-b border-white-400 -mx-6 px-6">
              <div className="font-semibold text-white px-3.5 py-2 bg-primary rounded">
                Step {step} of 2
              </div>
              <h1 className="text-grey text-xl font-bold">Create Event</h1>
            </div>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <div className="grid gap-4">
                  {step === 1 ? (
                    <>
                      <p className="mt-4 text-sm font-medium">
                        Each event
                        **********************************************************************
                      </p>
                      <div className="mt-4">
                        <Label className="text-grey" htmlFor="event_name">
                          Event Name
                        </Label>
                        <Field
                          as={Input}
                          className="mt-1"
                          id="event_name"
                          name="event_name"
                        />
                        <ErrorMessage
                          name="event_name"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="action" className="text-grey">
                          Select action for this event
                        </Label>
                        <ReactSelect
                          id="action"
                          className="mt-1 text-sm !border-input ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          classNamePrefix="react-select"
                          placeholder="Select action for this event"
                        />
                        <ErrorMessage
                          name="action"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-grey" htmlFor="event_tag">
                          Event Tag
                        </Label>
                        <Field
                          as={Input}
                          className="mt-1"
                          id="event_tag"
                          name="event_tag"
                        />
                        <ErrorMessage
                          name="event_tag"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="setup_tag" className="text-grey">
                          Choose Setup Type
                        </Label>
                        <ReactSelect
                          id="setup_tag"
                          className="mt-1 text-sm !border-input ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          classNamePrefix="react-select"
                          placeholder="Choose Setup Type"
                        />
                        <ErrorMessage
                          name="setup_tag"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-grey" htmlFor="event_envs">
                          Event Environments
                        </Label>
                        <Field
                          as={Input}
                          className="mt-1"
                          id="event_envs"
                          name="event_envs"
                        />
                        <ErrorMessage
                          name="event_envs"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-grey" htmlFor="description">
                          Event Description
                        </Label>

                        <Field
                          as={Textarea}
                          className="mt-1"
                          id="description"
                          name="description"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex-1">
                      <p className="mt-4 text-sm font-medium">
                        Provide a sample schema for this event
                      </p>
                      <div className="relative">
                        <Field
                          as={Textarea}
                          className="mt-8 min-h-[309px] pl-4 pt-12"
                          id="json"
                          name="json"
                        />
                        <p className="absolute top-0 ml-3 mt-3 text-grey font-semibold px-2 py-0.5 bg-[#F0F0F0] rounded w-fit">
                          json
                        </p>
                      </div>
                      <ErrorMessage
                        name="json"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )}
                  <div className="mt-7 pt-6 flex justify-between items-center border-t -mx-6 px-6">
                    {step === 1 ? (
                      <div className="flex justify-end w-full gap-5">
                        <Button
                          variant="secondary"
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="font-semibold text-xs bg-white text-grey px-7 rounded border border-white-400 h-8"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setStep(2)}
                          className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-8 px-6"
                        >
                          Next
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-between w-full gap-5">
                        <Button
                          variant="secondary"
                          type="button"
                          onClick={() => setStep(1)}
                          className="font-semibold text-xs bg-white text-grey px-7 rounded border border-white-400 h-8"
                        >
                          Previous
                        </Button>
                        <Button
                          type="submit"
                          className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-8 px-6"
                        >
                          Submit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </Modal>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
