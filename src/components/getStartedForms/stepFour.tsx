import React, { FC } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import CustomInput from "../common/Input";

interface StepFourProps {
  setCurrentStep: (currentStep: number) => void;
}

const StepFour: FC<StepFourProps> = ({ setCurrentStep }) => {
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
        <div className=" gap-4">
          <div className="flex items-center justify-between gap-6">
            <div className="border flex-1 px-3 py-2">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Environment Name
              </p>
              <p className="text-sm font-semibold">Production</p>
            </div>

            <div className="border flex-1 px-3 py-2">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Slug
              </p>
              <p className="text-sm font-semibold">Prd</p>
            </div>

            <div className="border px-3 py-2 flex-1">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Description
              </p>
              <p className="text-sm font-semibold">Production Environment</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mt-6">
            <div className="border flex-1 px-3 py-2">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Environment Name
              </p>
              <p className="text-sm font-semibold">Production</p>
            </div>

            <div className="border flex-1 px-3 py-2">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Slug
              </p>
              <p className="text-sm font-semibold">Prd</p>
            </div>

            <div className="border px-3 py-2 flex-1">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Description
              </p>
              <p className="text-sm font-semibold">Production Environment</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mt-6">
            <div className="border flex-1 px-3 py-2">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Environment Name
              </p>
              <p className="text-sm font-semibold">Production</p>
            </div>

            <div className="border flex-1 px-3 py-2">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Slug
              </p>
              <p className="text-sm font-semibold">Prd</p>
            </div>

            <div className="border px-3 py-2 flex-1">
              <p className="text-grey-200 text-[10px] font-semibold rounded">
                Description
              </p>
              <p className="text-sm font-semibold">Production Environment</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mt-6">
            <div className="flex-1">
              <CustomInput placeholder="Environment Name" value="Production" />
            </div>
            <div className="flex-1">
              <CustomInput placeholder="Slug" value="prd" />
            </div>
            <div className="flex-1">
              <CustomInput
                placeholder="Description"
                value="production environment"
              />
            </div>
          </div>
        </div>

        <Link
          href="#"
          className="text-primary font-semibold text-xs underline mt-3"
        >
          Add Constants
        </Link>

        <div className="flex justify-between items-center my-11">
          <Button
            className="font-semibold text-xs bg-white text-primary px-7 rounded border border-primary h-9"
            onClick={() => setCurrentStep(2)}
          >
            Previous
          </Button>

          <div className="flex justify-end items-center my-11">
            <div className="flex gap-4">
              <Button className="font-semibold text-xs bg-white text-grey px-7 rounded border border-grey-300">
                Save
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="font-semibold text-xs bg-primary text-white h-8 px-7 rounded"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
