import React, { FC } from 'react';
import CustomInput from '../common/Input';
import CustomSelect from '../common/Select';
import Button from '../common/Button';

interface StepOneProps {
  setCurrentStep: (currentStep: number) => void;
  setShowModal: (showModal: boolean) => void;
}

const StepOne: FC<StepOneProps> = ({ setCurrentStep, setShowModal }) => {
  return (
    <div>
      <div className="px-[30px] py-6 gap-[13px] flex items-center border-b">
        <div className="bg-primary text-white font-semibold h-[36px] px-[15px] flex items-center">
          Step 1 of 2
        </div>
        <h1 className="text-[#232830] text-xl font-bold">
          Create Pricing Plan
        </h1>
      </div>

      <div className="px-[30px] mt-4 pb-7 border-b">
        <div>
          <form className="mt-[31px]">
            <div>
              <CustomInput placeholder="Plan Name" />
            </div>
            <div className="mt-[26px]">
              <CustomInput placeholder="Unit Price (Cost)" />
            </div>
            <div className="mt-[26px]">
              <CustomSelect
                options={[]}
                placeholder="Select type of charge for this plan"
              />
            </div>
            <div className="mt-[26px]">
              <CustomSelect
                options={[]}
                placeholder="Select interval for this plan"
              />
            </div>
            <div className="mt-[26px]">
              <CustomSelect
                options={[]}
                placeholder="Choose default currency"
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
