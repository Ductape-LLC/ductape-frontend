import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import Dashboard_layout from "@/components/layouts/dashboard_layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import Button from "@/components/common/Button";
import { PlusOutlined } from "@ant-design/icons";
import StepOne from "@/components/events/stepOne";
import StepTwo from "@/components/events/stepTwo";
import EventItem from "@/components/events/eventItem";

const Pricing = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Events">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between ">
            <h1 className="text-[#232830] font-bold text-3xl">Events</h1>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
            >
              <PlusOutlined />
              New Event
            </Button>
          </div>

          <div className="px-16 p-10">
            {/* <div className="mt-20">
              <h1 className="text-4xl font-bold">
                You do not have any events. Create an event, and actions to get started.
              </h1>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
              >
                <PlusOutlined />
                New Pricing Plan
              </Button>
            </div> */}
            <EventItem />
          </div>

          <Modal
            open={showModal}
            width="730px"
            className="rounded-none"
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            onCancel={() => setShowModal(false)}
            style={{ padding: 0 }}
          >
            {currentStep === 0 ? (
              <StepOne
                setCurrentStep={setCurrentStep}
                setShowModal={setShowModal}
              />
            ) : (
              <StepTwo
                setCurrentStep={setCurrentStep}
                setShowModal={setShowModal}
              />
            )}
          </Modal>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default Pricing;