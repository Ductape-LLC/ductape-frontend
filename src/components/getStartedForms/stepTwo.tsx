import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Input } from 'antd';
import CustomInput from '../common/Input';

const { TextArea } = Input;

const StepTwo = () => {
  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex gap-2">
          <Button className="bg-primary text-white">Step 2 of 5</Button>
          <p className="text-[#232830] font-semibold text-lg">Environments</p>
        </div>

        <p className="text-[#979797] text-sm mt-5 font-semibold">
          Create and configure environments for your applications
        </p>
      </div>

      <div className="px-7 pt-5">
        <div className=" gap-4">
          <div className="flex items-center justify-between gap-6">
            <div className="border flex-1 px-3 py-2">
              <p className="text-[#979797] text-[10px] font-semibold rounded">
                Environment Name
              </p>
              <p className="text-sm font-semibold">Production</p>
            </div>

            <div className="border flex-1 px-3 py-2">
              <p className="text-[#979797] text-[10px] font-semibold rounded">
                Slug
              </p>
              <p className="text-sm font-semibold">Prd</p>
            </div>

            <div className="flex-1">
              <div className="border px-3 py-2">
                <p className="text-[#979797] text-[10px] font-semibold rounded">
                  Description
                </p>
                <p className="text-sm font-semibold">Production Environment</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mt-6">
            <div className="border flex-1 px-3 py-2">
              <p className="text-[#979797] text-[10px] font-semibold rounded">
                Environment Name
              </p>
              <p className="text-sm font-semibold">Production</p>
            </div>

            <div className="border flex-1 px-3 py-2">
              <p className="text-[#979797] text-[10px] font-semibold rounded">
                Slug
              </p>
              <p className="text-sm font-semibold">Prd</p>
            </div>

            <div className="flex-1">
              <div className="border px-3 py-2">
                <p className="text-[#979797] text-[10px] font-semibold rounded">
                  Description
                </p>
                <p className="text-sm font-semibold">Production Environment</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mt-6">
            <div className="border flex-1 px-3 py-2">
              <p className="text-[#979797] text-[10px] font-semibold rounded">
                Environment Name
              </p>
              <p className="text-sm font-semibold">Production</p>
            </div>

            <div className="border flex-1 px-3 py-2">
              <p className="text-[#979797] text-[10px] font-semibold rounded">
                Slug
              </p>
              <p className="text-sm font-semibold">Prd</p>
            </div>

            <div className="flex-1">
              <div className="border px-3 py-2">
                <p className="text-[#979797] text-[10px] font-semibold rounded">
                  Description
                </p>
                <p className="text-sm font-semibold">Production Environment</p>
              </div>
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

        <Link href="#" className="text-primary font-semibold text-xs underline mt-3">Add New Environment</Link>

        <div className="flex justify-between items-center my-11">
        <Button>Previous</Button>

          <div className="flex gap-4">
            <Button>Save</Button>
            <Button className="bg-primary text-white">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
