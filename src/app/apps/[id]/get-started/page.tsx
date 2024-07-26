"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Modal, Input, Progress, Button } from "antd";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import StepOne from "@/components/getStartedForms/stepOne";
import StepTwo from "@/components/getStartedForms/stepTwo";

const { TextArea } = Input;

export default function GetStarted({
  params: { id },
}: {
  params: { id: string };
}) {
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Get Started" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-[#232830] font-bold text-3xl">Get Started</h1>
          </div>

          <div className="px-16 p-10">
            {currentStep === 0 ? (
              <StepOne setCurrentStep={setCurrentStep} />
            ) : (
              <StepTwo setCurrentStep={setCurrentStep} />
            )}
          </div>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
