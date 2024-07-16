"use client";

import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import CustomInput from "@/components/common/Input";
import CustomSelect from "@/components/common/Select";
import { PlusOutlined } from "@ant-design/icons";

export default function PricingDetails() {
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Pricing">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-[#232830] font-bold text-3xl">Pricing</h1>
          </div>

          <div className="px-16 p-10">
            <div className="border bg-white">
              <div className="flex items-center px-[33px] py-7 border-b w-ful justify-between">
                <h2 className="font-bold text-xl">Pricing Details</h2>
                <Button className="font-semibold text-sm h-[40px] border border-[#DC3444] text-[#DC3444] flex justify-center items-center">
                  Delete Plan
                </Button>
              </div>

              <div className="px-[33px] py-7">
                <div>
                  <label className="font-semibold">Plan Name</label>
                  <CustomInput value="Starter" />
                </div>

                <div className="mt-[26px] w-full">
                  <div className="flex gap-[36px] w-full">
                    <div className="flex-1">
                      <label className="font-semibold">Unit Price (Cost)</label>
                      <CustomInput value="1.99" />
                    </div>

                    <div className="flex-1">
                      <label className="font-semibold">
                        Mode (Type pf Charge)
                      </label>
                      <CustomSelect value="Upfront" options={[]} />
                    </div>
                  </div>
                </div>

                <div className="mt-[26px]">
                  <div className="flex gap-[36px]">
                    <div className="flex-1">
                      <label className="font-semibold">Interval</label>
                      <CustomSelect value="Montly" options={[]} />
                    </div>

                    <div className="flex-1">
                      <label className="font-semibold">Currency</label>
                      <CustomSelect value="USD" options={[]} />
                    </div>
                  </div>
                </div>

                <div className="mt-[63px] border-b">
                  <span className="text-primary mb-2 border-b-2 border-b-primary px-4 text-[15px] font-semibold">
                    Limit
                  </span>
                </div>

                <div className="mt-[26px]">
                  <label className="font-semibold">Per Minute</label>
                  <CustomInput type="number" value="0" />
                  <span className="text-xs">Set to "0" for Unlimited</span>
                </div>

                <div className="mt-[26px]">
                  <label className="font-semibold">Per Hour</label>
                  <CustomInput type="number" value="0" />
                  <span className="text-xs">Set to "0" for Unlimited</span>
                </div>

                <div className="mt-[26px]">
                  <label className="font-semibold">Per Week</label>
                  <CustomInput type="number" value="0" />
                  <span className="text-xs">Set to "0" for Unlimited</span>
                </div>

                <div className="mt-[26px]">
                  <label className="font-semibold">Per Month</label>
                  <CustomInput type="number" value="0" />
                  <span className="text-xs">Set to "0" for Unlimited</span>
                </div>

                <Button className="bg-primary text-white text-sm font-semibold h-[40px] w-[138px] mt-[63px]">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
