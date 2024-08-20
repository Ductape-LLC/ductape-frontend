"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import StepOne from "@/components/getStartedForms/stepOne";
import StepTwo from "@/components/getStartedForms/stepTwo";
import StepThree from "@/components/getStartedForms/stepThree";
import StepFour from "@/components/getStartedForms/stepFour";
import StepFive from "@/components/getStartedForms/stepFive";
import StepSix from "@/components/getStartedForms/stepSix";
import { useQuery } from "@tanstack/react-query";
import { fetchApp } from "@/api/appsClient";

export default function GetStarted({
  params: { id },
}: {
  params: { id: string };
}) {
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [currentStep, setCurrentStep] = useState(0);
  const [disableUploadField, setDisableUploadField] = useState(false);

  const payload = {
    token,
    app_id: id,
    user_id: user?._id,
    public_key,
  };

  const { data, status } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  const app = data?.data?.data;

  useEffect(() => {
    if (app?.get_started === 0 && app?.actions.length > 0) {
      setCurrentStep(1); // Skip the import step
      setDisableUploadField(true); // Disable upload field when going back
    }
  }, [app]);

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Get Started" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-grey font-bold text-3xl">Get Started</h1>
          </div>

          <div className="px-16 p-10">
            {currentStep === 0 ? (
              <StepOne
                setCurrentStep={setCurrentStep}
                disableUploadField={disableUploadField}
              />
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
