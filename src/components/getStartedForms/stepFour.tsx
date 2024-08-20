import React, { FC } from "react";
import { usePathname } from "next/navigation";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createAppConstant,
  fetchApp,
  updateAppConstant,
} from "@/api/appsClient";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ApiError } from "@/types/user.types";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StepFourProps {
  setCurrentStep: (currentStep: number) => void;
}

interface Variable {
  key: string;
  type: string;
  description: string;
  update: boolean;
}

const validationSchema = Yup.object().shape({
  variables: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("Variable key is required"),
      type: Yup.string().required("Type is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});

const types = [
  { value: "string", label: "String" },
  { value: "object", label: "Object" },
];

const StepFour: FC<StepFourProps> = ({ setCurrentStep }) => {
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
  const variables: Variable[] =
    app?.variables?.map((variable: any) => ({
      ...variable,
      update: false,
    })) || [];

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
      toast.success("All variables processed successfully");
      setTimeout(() => {
        setCurrentStep(4);
      }, 2000);
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.errors || "An error occurred");
    },
  });

  const handleSubmit = async (values: any) => {
    const requests = values.variables.map((variable: Variable) => {
      const data = {
        user_id: user._id,
        public_key,
        key: variable.key,
        type: variable.type,
        description: variable.description,
        action: variable.update ? "update" : "create",
        component: "variables",
        workspace_id: app.workspace_id,
      };

      const actionType = variable.update ? "update" : "create";
      return submitData(data, actionType, token);
    });

    await mutateAsync(requests);
  };

  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex items-center gap-2">
          <div className="bg-primary px-3.5 py-2 text-white h-9 rounded font-semibold">
            Step 4 of 6
          </div>
          <p className="text-grey font-semibold text-lg">Setup Variables</p>
        </div>

        <p className="text-grey-200 text-sm mt-5 font-semibold">
          Create and configure application variables
        </p>
      </div>

      <div className="px-7 pt-5">
        <Formik
          initialValues={{ variables }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <FieldArray name="variables">
                {({ push }) => (
                  <>
                    <div className="grid gap-9">
                      {values.variables.map((variable, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Field name={`variables[${index}].update`}>
                            {({ field }: any) => (
                              <Checkbox
                                {...field}
                                checked={field.value}
                                onCheckedChange={(value) => {
                                  handleChange({
                                    target: {
                                      name: `variables[${index}].update`,
                                      value: value,
                                    },
                                  });
                                }}
                              />
                            )}
                          </Field>
                          <div className="flex items-start justify-between gap-6 w-full">
                            <div className="flex-1">
                              <Label
                                htmlFor={`variables[${index}].description`}
                              >
                                Description
                              </Label>
                              <Field
                                type="text"
                                name={`variables[${index}].description`}
                                as={Input}
                                placeholder="Description"
                              />
                              <ErrorMessage
                                name={`variables[${index}].description`}
                                component="div"
                                className="text-red-600 text-sm mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={`variables[${index}].key`}>
                                Key
                              </Label>
                              <Field
                                type="text"
                                name={`variables[${index}].key`}
                                as={Input}
                                placeholder="Key"
                              />
                              <ErrorMessage
                                name={`variables[${index}].key`}
                                component="div"
                                className="text-red-600 text-sm mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={`variables[${index}].type`}>
                                Type
                              </Label>
                              <Select
                                name={`variables[${index}].type`}
                                onValueChange={(value) =>
                                  setFieldValue(
                                    `variables[${index}].type`,
                                    value
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Action" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {types?.map((type: any) => (
                                      <SelectItem
                                        key={type.value}
                                        value={type.value}
                                      >
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <ErrorMessage
                                name={`variables[${index}].type`}
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
                      onClick={() => {
                        push({
                          key: "",
                          type: "",
                          description: "",
                          update: false,
                        });
                      }}
                    >
                      +Add Variables
                    </Button>

                    <div className="flex justify-between items-center my-11">
                      <Button
                        className="font-semibold text-xs bg-white text-primary px-7 rounded border border-primary h-9"
                        onClick={() => setCurrentStep(2)}
                      >
                        Previous
                      </Button>

                      <div className="flex justify-end items-center my-11">
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            disabled={status === "pending"}
                            onClick={() => {
                              handleSubmit(values);
                            }}
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

export default StepFour;
