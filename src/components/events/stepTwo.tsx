import React, { FC } from 'react';
import Button from '../common/Button';
import { Input } from 'antd';

const { TextArea } = Input;

interface StepTwoProps {
  setCurrentStep: (currentStep: number) => void;
  setShowModal: (showModal: boolean) => void;
}

const StepTwo: FC<StepTwoProps> = ({ setCurrentStep, setShowModal }) => {
  return (
    <div>
      <div className="px-[30px] py-6 gap-[13px] flex items-center border-b">
        <div className="bg-primary text-white font-semibold h-[36px] px-[15px] flex items-center">
          Step 2 of 2
        </div>
        <h1 className="text-[#232830] text-xl font-bold">
          Create Pricing Plan
        </h1>
      </div>

      <div className="px-[30px] mt-4 pb-7 border-b">
        <div>
          <form className="mt-[31px]">
            <div className="mt-[26px]">
              <label>Provide a example request to register for the event</label>
              <TextArea
                className="bg-white border rounded w-full p-3 text-sm text-[#232830]"
                placeholder="Event Description"
                rows={5}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="px-[30px] py-6 flex justify-between">
        <Button
          onClick={() => setCurrentStep(0)}
          className="font-semibold text-sm border text-[#232830] outline-none h-[33px] rounded px-6 gap-2"
        >
          Previous
        </Button>
        <div className="flex gap-5">
          <Button
            onClick={() => setShowModal(false)}
            className="font-semibold text-sm border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2"
          >
            Cancel
          </Button>
          <Button className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-[33px] px-6">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
