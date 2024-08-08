"use client";

import React, { useState, useEffect } from "react";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import StepOne from "@/components/getStartedForms/stepOne";
import StepTwo from "@/components/getStartedForms/stepTwo";
import StepThree from "@/components/getStartedForms/stepThree";
import StepFour from "@/components/getStartedForms/stepFour";
import StepFive from "@/components/getStartedForms/stepFive";
import StepSix from "@/components/getStartedForms/stepSix";

export default function GetStarted({
  params: { id },
}: {
  params: { id: string };
}) {
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Get Started" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-grey font-bold text-3xl">Get Started</h1>
          </div>

          <div className="px-16 p-10">
            {currentStep === 0 ? (
              <StepSix setCurrentStep={setCurrentStep} />
            ) : currentStep === 1 ? (
              <StepTwo setCurrentStep={setCurrentStep} />
            ) : currentStep === 2 ? (
              <StepThree setCurrentStep={setCurrentStep} />
            ) : currentStep === 3 ? (
              <StepFour setCurrentStep={setCurrentStep} />
            ) : currentStep === 4 ? (
              <StepFive setCurrentStep={setCurrentStep} />
            ) : (
              <StepSix setCurrentStep={setCurrentStep} />
            )}
          </div>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
