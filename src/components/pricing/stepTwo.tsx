import React, { FC } from 'react';
import CustomInput from '../common/Input';
import Button from '../common/Button';

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
            <div>
              <CustomInput placeholder="Minute limit" />
            </div>
            <div className="mt-[26px]">
              <CustomInput placeholder="Hourly limit" />
            </div>
            <div className="mt-[26px]">
              <CustomInput placeholder="Daily limit" />
            </div>
            <div className="mt-[26px]">
              <CustomInput placeholder="Weekly limit" />
            </div>
            <div className="mt-[26px]">
              <CustomInput placeholder="Montly limit" />
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
          <Button onClick={() => setShowModal(false)} className="font-semibold text-sm border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2">
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
