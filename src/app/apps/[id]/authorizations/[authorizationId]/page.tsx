"use client";

import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactSelect from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const authorisationSchema = Yup.object().shape({
  type: Yup.string().required("Authorization type is required"),
  action: Yup.lazy((value, context) => {
    return context?.parent?.type === "credential_access"
      ? Yup.string().required("Action is required")
      : Yup.string();
  }),
  expiry: Yup.lazy((value, context) => {
    return context?.parent?.type === "credential_access"
      ? Yup.number().required("Expiry is required")
      : Yup.number().nullable();
  }),
  period: Yup.lazy((value, context) => {
    return context?.parent?.type === "credential_access"
      ? Yup.string().required("Period is required")
      : Yup.string().nullable();
  }),
  tag: Yup.string()
    .matches(/^[a-z_]+$/, "Tag must be lowercase and separated by snake_case")
    .default("default")
    .required("Tag is required"),
  authorization_flow: Yup.string()
    .default("Default")
    .required("Name is required"),
  description: Yup.string(),
});

export default function Authorization({
  params: { id, authorizationId },
}: {
  params: { id: string; authorizationId: string };
}) {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

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

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Authorizations" id={id}>
        <div>
          <div className="px-16 h-[110px] border-b bg-white flex items-center justify-between">
            <h1 className="text-grey font-bold text-3xl">Authorizations</h1>
          </div>
        </div>

        <Formik
          initialValues={{
            type: "credential_access",
            tag: "default",
            authorization_flow: "Default",
            action: "",
            expiry: "",
            period: "",
            description: "",
          }}
          validationSchema={authorisationSchema}
          onSubmit={handleSubmit}
          validateOnMount
          validateOnChange
          validateOnBlur
        >
          {({ values, setFieldValue, setFieldTouched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="px-16 pt-5">
                <div className="grid bg-white p-7 border border-white-400 rounded">
                  <p className="text-grey font-bold text-xl pb-6 border-b border-white-400 px-7 -mx-7">
                    Authorization Details
                  </p>
                  <div className="mt-6 pb-9 border-b">
                    <p className="font-semibold text-grey">
                      Authorization Type
                    </p>
                    <Field name="type">
                      {({ field }: any) => (
                        <RadioGroup
                          className="mt-4 gap-4"
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
                  </div>

                  <div className="mt-5 grid gap-5">
                    <div className="flex items-start gap-5">
                      <div className="flex flex-col w-1/2">
                        <Label htmlFor="authorization_flow" className="mb-1">
                          Name of Authorization Flow
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
                      <div className="flex flex-col w-1/2">
                        <Label htmlFor="action" className="mb-1">
                          Action
                        </Label>
                        <Select
                          name="action"
                          onValueChange={(value) =>
                            setFieldValue("action", value)
                          }
                          disabled={values.type === "token_access"}
                        >
                          <SelectTrigger>
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
                    </div>

                    <div className="flex items-start gap-5 w-full">
                      <div className="flex items-start w-1/2">
                        <div className="flex flex-col w-1/4">
                          <Label htmlFor="expiry" className="mb-1">
                            Expiry
                          </Label>
                          <Field
                            type="number"
                            name="expiry"
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
                          <Label htmlFor="period" className="mb-1">
                            Period
                          </Label>
                          <Select
                            name="period"
                            onValueChange={(value) =>
                              setFieldValue("period", value)
                            }
                            disabled={values.type === "token_access"}
                          >
                            <SelectTrigger>
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
                      <div className="flex flex-col w-1/2">
                        <Label htmlFor="tag" className="mb-1">
                          Tag
                        </Label>
                        <Field
                          type="text"
                          name="tag"
                          as={Input}
                          placeholder="Tag"
                        />
                        <ErrorMessage
                          name="tag"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col w-full">
                      <Label htmlFor="description" className="mb-1">
                        Authorization Description
                      </Label>
                      <Field
                        type="text"
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
                  </div>

                  <div className="flex justify-between items-center mt-10">
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        className="font-semibold text-xs bg-primary text-white h-8 px-12 rounded"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
