"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import { PlusOutlined } from "@ant-design/icons";
import CreateAuthorizationForm from "@/components/authorization/CreateAutorizationForm";
import AuthorizationItem from "@/components/authorization/AuthorizationItem";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import ReactSelect from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchApp } from "@/api/appsClient";

const periodsEnum = [
  { label: "Hours", value: "hours" },
  { label: "Minutes", value: "mins" },
  { label: "Seconds", value: "secs" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
  { label: "Years", value: "years" },
];

export default function Authorizations({
  params: { id },
}: {
  params: { id: string };
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { token, public_key, user } = useSelector((state: any) => state.user);

  const payload = {
    token,
    app_id: id,
    user_id: user?._id,
    public_key,
  };

  const { data } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  const app = data?.data?.data;

  const handleSubmit = () => {
    console.log("omoeux");
  };

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Authorizations" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between ">
            <h1 className="text-[#232830] font-bold text-3xl">
              Authorizations
            </h1>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
            >
              <PlusOutlined />
              New Authorization
            </Button>
          </div>

          <div className="px-16 p-10">
            {/* <div className="mt-20">
              <h1 className="text-4xl font-bold">
                You do not have any authorizations. Create an authorization to
                get started.
              </h1>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
              >
                <PlusOutlined />
                New Authorization
              </Button>
            </div> */}
            <AuthorizationItem />
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
                <h1 className="text-grey text-xl font-bold">Create Event</h1>
              </div>

              <Formik initialValues={{}} onSubmit={handleSubmit}>
                {({ values, setFieldValue, setFieldTouched, handleSubmit }) => (
                  <Form>
                    <div className="grid gap-4">
                      <p className="mt-4 text-sm font-medium">
                        Each authorization
                        **********************************************************************
                      </p>
                      <p className="mt-4 font-semibold text-grey">
                        Authorization Type
                      </p>
                      <Field name="type">
                        {({ field }: any) => (
                          <RadioGroup
                            className="gap-4"
                            defaultValue={field.value}
                            onValueChange={(value) => {
                              setFieldValue("type", value);
                              if (value === "token_access") {
                                setFieldValue("action", "");
                                setFieldValue("expiry", "");
                                setFieldValue("period", "");
                                setFieldTouched("expiry", false);
                              }
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="credential_access"
                                id="credential_access"
                              />
                              <Label htmlFor="credential_access">
                                Credential Access
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="token_access"
                                id="token_access"
                              />
                              <Label htmlFor="token_access">Token Access</Label>
                            </div>
                          </RadioGroup>
                        )}
                      </Field>
                      <div className="w-full h-[1px] my-5 bg-white-400" />
                      <div className="flex-1">
                        <Label
                          htmlFor="authorization_flow"
                          className="mb-2 block"
                        >
                          Name of Authorization flow
                        </Label>
                        <Field
                          type="text"
                          name="authorization_flow"
                          as={Input}
                          placeholder="Name of Authorization flow"
                        />
                        <ErrorMessage
                          name="authorization_flow"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="action">Select Action</Label>
                        <Select
                          name="action"
                          onValueChange={(value) =>
                            setFieldValue("action", value)
                          }
                          disabled={values.type === "token_access"}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select Action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {app?.actions.map((action: any) => (
                                <SelectItem key={action._id} value={action.tag}>
                                  {action.tag}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <ErrorMessage
                          name="action"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div className="flex items-start w-full">
                        <div className="flex flex-col w-1/4">
                          <Label htmlFor="expiry">Expiry</Label>
                          <Field
                            type="number"
                            name="expiry"
                            className="mt-2"
                            as={Input}
                            placeholder="Expiry"
                            disabled={values.type === "token_access"}
                          />
                          <ErrorMessage
                            name="expiry"
                            component="div"
                            className="text-red-600 text-sm mt-1"
                          />
                        </div>
                        <div className="flex flex-col w-3/4">
                          <Label htmlFor="period">Period</Label>
                          <Select
                            name="period"
                            onValueChange={(value) =>
                              setFieldValue("period", value)
                            }
                            disabled={values.type === "token_access"}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select Period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {periodsEnum.map((period) => (
                                  <SelectItem
                                    key={period.value}
                                    value={period.value}
                                  >
                                    {period.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <ErrorMessage
                            name="period"
                            component="div"
                            className="text-red-600 text-sm mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="tag">Tag</Label>
                        <Field
                          type="text"
                          name="tag"
                          className="mt-2"
                          as={Input}
                          placeholder="Tag"
                        />
                        <ErrorMessage
                          name="tag"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <Label htmlFor="description">Description</Label>
                        <Field
                          type="text"
                          className="mt-2"
                          name="description"
                          as={Textarea}
                          placeholder="Description (Optional)"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>

                      <div className="mt-7 pt-6 flex justify-between items-center border-t -mx-6 px-6">
                        <div className="flex justify-end w-full gap-5">
                          <Button
                            variant="secondary"
                            type="button"
                            className="font-semibold text-xs bg-white text-grey px-7 rounded border border-white-400 h-8"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-8 px-6"
                          >
                            Create
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
