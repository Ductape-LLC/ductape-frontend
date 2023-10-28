import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import Dashboard_layout from "@/components/layouts/dashboard_layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import Button from "@/components/common/Button";
import { PlusOutlined } from "@ant-design/icons";
import CreateAuthorizationForm from "@/components/authorization/CreateAutorizationForm";
import AuthorizationItem from "@/components/authorization/AuthorizationItem";

const Pricing = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Authorizations">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between ">
            <h1 className="text-[#232830] font-bold text-3xl">
              Authorizations
            </h1>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
            >
              <PlusOutlined />
              New Authorization
            </Button>
          </div>

          <div className="px-16 p-10">
            {/* <div className="mt-20">
              <h1 className="text-4xl font-bold">
                You do not have any authorizations. Create an authorization to
                get started.
              </h1>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
              >
                <PlusOutlined />
                New Authorization
              </Button>
            </div> */}
            <AuthorizationItem />
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
            <CreateAuthorizationForm
              setCurrentStep={setCurrentStep}
              setShowModal={setShowModal}
            />
          </Modal>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default Pricing;
