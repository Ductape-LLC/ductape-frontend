import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  createAppConstant,
  fetchApp,
  updateAppConstant,
} from "@/api/appsClient";
import { ApiError } from "@/types/user.types";
import { Button } from "../ui/button";

interface StepThreeProps {
  setCurrentStep: (currentStep: number) => void;
}

interface Constant {
  key: string;
  value: string;
  description: string;
  update: boolean;
}

const validationSchema = Yup.object().shape({
  constants: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("Constant key is required"),
      value: Yup.string().required("Value is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});

const StepThree: FC<StepThreeProps> = ({ setCurrentStep }) => {
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
  const constants: Constant[] = app?.constants.map((constant: any) => ({
    ...constant,
    update: false,
  }));

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
      toast.success("All constants processed successfully");
      setTimeout(() => {
        setCurrentStep(3);
      }, 2000);
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.errors || "An error occurred");
    },
  });

  const handleSubmit = async (values: any) => {
    const requests = values.constants.map((constant: Constant) => {
      const data = {
        user_id: user._id,
        public_key,
        key: constant.key,
        value: constant.value,
        description: constant.description,
        action: constant.update ? "update" : "create",
        type: "string",
        component: "constants",
        workspace_id: app.workspace_id,
      };

      const actionType = constant.update ? "update" : "create";
      return submitData(data, actionType, token);
    });

    await mutateAsync(requests);
  };

  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex items-center gap-2">
          <div className="bg-primary px-3.5 py-2 text-white h-9 rounded font-semibold">
            Step 3 of 6
          </div>
          <p className="text-grey font-semibold text-lg">Setup Contants</p>
        </div>

        <p className="text-grey-200 text-sm mt-5 font-semibold">
          Create and configure application constants
        </p>
      </div>

      <div className="px-7 pt-5">
        <Formik
          initialValues={{ constants }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <FieldArray name="constants">
                {({ push }) => (
                  <>
                    <div className="grid gap-9">
                      {values.constants.map((constant, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Field name={`constants[${index}].update`}>
                            {({ field }: any) => (
                              <Checkbox
                                {...field}
                                checked={field.value}
                                onCheckedChange={(value) => {
                                  handleChange({
                                    target: {
                                      name: `constants[${index}].update`,
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
                                htmlFor={`constants[${index}].description`}
                              >
                                Description
                              </Label>
                              <Field
                                type="text"
                                name={`constants[${index}].description`}
                                as={Input}
                                placeholder="Description"
                              />
                              <ErrorMessage
                                name={`constants[${index}].description`}
                                component="div"
                                className="text-red-600 text-sm mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={`constants[${index}].key`}>
                                Key
                              </Label>
                              <Field
                                type="text"
                                name={`constants[${index}].key`}
                                as={Input}
                                placeholder="Key"
                              />
                              <ErrorMessage
                                name={`constants[${index}].key`}
                                component="div"
                                className="text-red-600 text-sm mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={`constants[${index}].value`}>
                                Value
                              </Label>
                              <Field
                                type="text"
                                name={`constants[${index}].value`}
                                as={Input}
                                placeholder="Value"
                              />
                              <ErrorMessage
                                name={`constants[${index}].value`}
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
                          key: "",
                          value: "",
                          description: "",
                          update: false,
                        })
                      }
                    >
                      +Add Constants
                    </Button>

                    <div className="flex justify-between items-center my-11">
                      <Button
                        className="font-semibold text-xs bg-white text-primary px-7 rounded border border-primary h-8"
                        onClick={() => setCurrentStep(1)}
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

export default StepThree;
