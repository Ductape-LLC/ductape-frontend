import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../common/Input";
import CustomSelect from "../common/Select";
import Button from "../common/Button";
import { Input } from "antd";
const { TextArea } = Input;

interface StepOneProps {
  setCurrentStep: (currentStep: number) => void;
  setShowModal: (showModal: boolean) => void;
}

interface StepOneFormValues {
  name: string;
  tag: string;
  action_id: string[];
  method: string;
  setup_type: string;
  resource: string;
  envs: string[];
  description: string;
}

const initialValues: StepOneFormValues = {
  name: "",
  tag: "",
  action_id: [],
  method: "",
  setup_type: "",
  resource: "",
  envs: [],
  description: "",
};

const StepOne: FC<StepOneProps> = ({ setCurrentStep, setShowModal }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Event name is required"),
    tag: Yup.string().required("Event tag is required"),
    action_id: Yup.array().required("Action is required"),
    method: Yup.string().required("Method is required"),
    setup_type: Yup.string().required("Setup type is required"),
    resource: Yup.string().required("Resource is required"),
    envs: Yup.array().required("Environments is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <div className="px-[30px] py-6 gap-[13px] flex items-center border-b">
        <div className="bg-primary text-white font-semibold h-[36px] px-[15px] flex items-center">
          Step 1 of 2
        </div>
        <h1 className="text-[#232830] text-xl font-bold">Create Event</h1>
      </div>

      <div className="px-[30px] mt-4 pb-7 border-b">
        <div>
          <form className="mt-[31px]">
            <div>
              <CustomInput
                placeholder="Event Name"
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
                onChange={formik.handleChange("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-[26px]">
              <CustomInput
                placeholder="Event Tag"
                onBlur={formik.handleBlur("tag")}
                value={formik.values.tag}
                onChange={formik.handleChange("tag")}
              />
              {formik.touched.tag && formik.errors.tag ? (
                <div className="text-red-500 text-sm">{formik.errors.tag}</div>
              ) : null}
            </div>
            <div className="mt-[26px]">
              <CustomSelect
                options={[]}
                placeholder="Select action for this event"
                

              />
            </div>
            <div className="mt-[26px]">
              <CustomSelect options={[]} placeholder="Event Method" />
            </div>
            <div className="mt-[26px]">
              <CustomSelect options={[]} placeholder="Choose Setup type" />
            </div>

            <div className="mt-[26px]">
              <CustomInput placeholder="Resource" />
            </div>
            <div className="mt-[26px]">
              <CustomInput placeholder="Event Environments" />
            </div>
            <div className="mt-[26px]">
              <TextArea
                className="bg-white border rounded w-full p-3 text-sm text-[#232830]"
                placeholder="Event Description"
                rows={5}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="px-[30px] py-6 flex justify-end">
        <div className="flex gap-5">
          <Button
            onClick={() => setShowModal(false)}
            className="font-semibold text-sm border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setCurrentStep(1)}
            className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-[33px] px-6"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
