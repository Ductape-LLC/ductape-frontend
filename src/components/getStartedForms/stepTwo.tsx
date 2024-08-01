import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  fetchApp,
  createAppConstant,
  updateAppConstant,
} from "@/api/appsClient";
import { ApiError } from "@/types/user.types";
import { Button } from "../ui/button";

interface StepTwoProps {
  setCurrentStep: (currentStep: number) => void;
}

interface Environment {
  slug: string;
  env_name: string;
  description: string;
  base_url: string;
  update: boolean;
}

const validationSchema = Yup.object().shape({
  environments: Yup.array().of(
    Yup.object().shape({
      env_name: Yup.string().required("Environment Name is required"),
      slug: Yup.string().max(3, "Slug should not exceed 3 characters"),
      base_url: Yup.string().required("Base URL is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});

const StepTwo: FC<StepTwoProps> = ({ setCurrentStep }) => {
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

  const envs: Environment[] =
    app?.envs.map((env: any) => ({ ...env, update: false })) || [];

  const submitData = async (data: any, actionType: string, token: string) => {
    if (actionType === "create") {
      return await createAppConstant(token, data, app._id);
    } else {
      return await updateAppConstant(token, data, app._id);
    }
  };

  const { mutateAsync, status } = useMutation({
    mutationFn: async (requests: Array<Promise<any>>) => {
      await Promise.all(requests);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["app", id] });
      toast.success("All environments processed successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.errors || "An error occurred");
    },
  });

  const handleSubmit = async (values: any) => {
    const requests = values.environments.map((env: Environment) => {
      const data = {
        user_id: user._id,
        public_key: public_key,
        env_name: env.env_name,
        description: env.description,
        base_url: env.base_url,
        action: env.update ? "update" : "create",
        component: "env",
        workspace_id: app.workspace_id,
        slug: env.slug,
        whitelist: false,
        active: false,
      };

      const actionType = env.update ? "update" : "create";
      return submitData(data, actionType, token);
    });

    await mutateAsync(requests);
  };

  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex items-center gap-2">
          <div className="bg-primary px-3.5 py-2 text-white h-9 rounded font-semibold">
            Step 2 of 6
          </div>
          <p className="text-grey font-semibold text-lg">Environments</p>
        </div>
        <p className="text-[#979797] text-sm mt-5 font-semibold">
          Create and configure environments for your applications
        </p>
      </div>

      <div className="px-7 pt-5">
        <Formik
          initialValues={{ environments: envs }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <FieldArray name="environments">
                {({ push }) => (
                  <>
                    <div className="grid gap-6">
                      {values.environments.map((env, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Field name={`environments[${index}].update`}>
                            {({ field }: any) => (
                              <Checkbox
                                {...field}
                                checked={field.value}
                                onCheckedChange={(value) => {
                                  handleChange({
                                    target: {
                                      name: `environments[${index}].update`,
                                      value: value,
                                    },
                                  });
                                }}
                              />
                            )}
                          </Field>
                          <div className="flex items-start justify-between gap-6 border-b pb-6 w-full">
                            <div className="flex-1">
                              <Label
                                htmlFor={`environments[${index}].env_name`}
                              >
                                Environment Name
                              </Label>
                              <Field
                                type="text"
                                name={`environments[${index}].env_name`}
                                as={Input}
                                placeholder="Environment Name"
                              />
                              <ErrorMessage
                                name={`environments[${index}].env_name`}
                                component="div"
                                className="text-red-600 text-sm mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={`environments[${index}].slug`}>
                                Slug
                              </Label>
                              <Field
                                type="text"
                                name={`environments[${index}].slug`}
                                as={Input}
                                placeholder="Slug"
                              />
                              <ErrorMessage
                                name={`environments[${index}].slug`}
                                component="div"
                                className="text-red-600 text-sm mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <Label
                                htmlFor={`environments[${index}].base_url`}
                              >
                                Base URL
                              </Label>
                              <Field
                                type="text"
                                name={`environments[${index}].base_url`}
                                as={Input}
                                placeholder="Base URL"
                              />
                              <ErrorMessage
                                name={`environments[${index}].base_url`}
                                component="div"
                                className="text-red-600 text-sm mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <Label
                                htmlFor={`environments[${index}].description`}
                              >
                                Description
                              </Label>
                              <Field
                                type="text"
                                name={`environments[${index}].description`}
                                as={Input}
                                placeholder="Description"
                              />
                              <ErrorMessage
                                name={`environments[${index}].description`}
                                component="div"
                                className="text-red-600 text-sm mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      className="p-0 text-primary font-semibold text-xs underline mt-5 block"
                      onClick={() =>
                        push({
                          env_name: "",
                          slug: "",
                          description: "",
                          base_url: "",
                          update: false,
                        })
                      }
                    >
                      + Add Environment
                    </Button>

                    <div className="flex justify-between items-center">
                      <Button
                        className="font-semibold text-xs bg-white text-primary px-7 rounded border border-primary h-8"
                        onClick={() => setCurrentStep(0)}
                      >
                        Previous
                      </Button>

                      <div className="flex justify-end items-center my-11">
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            disabled={status === "pending"}
                            className="font-semibold text-xs bg-white text-grey h-8 px-7 rounded border border-grey-300"
                            onClick={() => {
                              handleSubmit(values);
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            type="button"
                            disabled={status === "pending"}
                            className="font-semibold text-xs bg-primary text-white h-8 px-7 rounded"
                            onClick={() => {
                              handleSubmit(values);

                              setTimeout(() => {
                                setCurrentStep(2);
                              }, 2000);
                            }}
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

export default StepTwo;
