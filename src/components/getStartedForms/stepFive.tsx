import React, { FC } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/common/Button";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { createAppConstant, fetchApp } from "@/api/appsClient";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError } from "@/types/user.types";

interface StepFiveProps {
  setCurrentStep: (currentStep: number) => void;
}

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

const StepFive: FC<StepFiveProps> = ({ setCurrentStep }) => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const queryClient = useQueryClient();

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

  const { mutateAsync, status } = useMutation({
    mutationFn: (payload) => createAppConstant(token, payload, app?._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["app", id] });
      toast.success("Configured successfully");

      setTimeout(() => {
        setCurrentStep(6);
      }, 2000);
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.errors || "An error occurred");
    },
  });

  const handleSubmit = async (values: any) => {
    const data: any = {
      user_id: user._id,
      public_key,
      type: values.type,
      tag: values.tag || "default",
      name: values.authorization_flow,
      description: values.description,
      component: "auth",
      workspace_id: app.workspace_id,
    };

    if (values.type !== "token_access") {
      data.action = values.action;
      data.expiry = values.expiry;
      data.period = values.period;
    }

    await mutateAsync(data);
  };

  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex items-center gap-2">
          <div className="bg-primary px-3.5 py-2 text-white h-9 rounded font-semibold">
            Step 5 of 6
          </div>
          <p className="text-grey font-semibold text-lg">Setup Authorization</p>
        </div>

        <p className="text-grey-200 text-sm mt-5 font-semibold">
          Create and configure authorizations
        </p>
      </div>

      <div className="px-7 pt-5">
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
              <FieldArray name="authorizations">
                {({ push }) => (
                  <>
                    <div className="pb-9 border-b">
                      <p className="font-semibold text-grey">
                        Select Authorization Type
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
                                  <SelectItem
                                    key={action._id}
                                    value={action.tag}
                                  >
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
                      </div>

                      <div className="flex items-start gap-5 w-full">
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
                        <div className="flex flex-col w-1/2">
                          <Label htmlFor="authorization_flow" className="mb-1">
                            Authorization flow
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
                      </div>

                      <div className="flex flex-col w-full">
                        <Label htmlFor="description" className="mb-1">
                          Description
                        </Label>
                        <Field
                          type="text"
                          name="description"
                          as={Input}
                          placeholder="Description (Optional)"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center my-11">
                      <Button
                        className="font-semibold text-xs bg-white text-primary px-7 rounded border border-primary h-9"
                        onClick={() => setCurrentStep(3)}
                        type="button"
                      >
                        Previous
                      </Button>

                      <div className="flex justify-end items-center my-11">
                        <div className="flex gap-4">
                          <Button
                            className="font-semibold text-xs bg-white text-grey px-7 rounded border border-grey-300"
                            type="submit"
                            disabled={status === "pending"}
                          >
                            Save
                          </Button>
                          <Button
                            type="submit"
                            disabled={status === "pending"}
                            className="font-semibold text-xs bg-primary text-white h-8 px-7 rounded"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StepFive;
