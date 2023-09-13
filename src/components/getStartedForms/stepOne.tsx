import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Input } from 'antd';

const { TextArea } = Input;

interface StepOneProps {
  setCurrentStep: (currentStep: number) => void;
}

const StepOne: FC<StepOneProps> = ({ setCurrentStep }) => {
  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex gap-2">
          <Button className="bg-primary text-white">Step 1 of 5</Button>
          <p className="text-[#232830] font-semibold text-lg">
            General Information
          </p>
        </div>

        <p className="text-[#979797] text-sm mt-5 font-semibold">
          Update App Description and Frequently asked questions
        </p>
      </div>

      <div className="px-7 pt-5">
        <div className=" gap-4">
          <p className="font-lg font-semibold">Read Me</p>
          <TextArea
            className="bg-white border rounded w-full p-3 text-sm text-[#232830] mt-3"
            placeholder="Tell us about your app, what it does and how to use it"
            rows={5}
          />

          <p className="font-lg font-semibold mt-10">FAQs</p>

          <TextArea
            className="bg-white border rounded w-full p-3 text-sm text-[#232830] mt-3"
            placeholder="Frequently asked questions about your app"
            rows={5}
          />
        </div>

        <div className="flex justify-end items-center my-11">
          <div className="flex gap-4">
            <Button>Save</Button>
            <Button
              onClick={() => setCurrentStep(1)}
              className="bg-primary text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
