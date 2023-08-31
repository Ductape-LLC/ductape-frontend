import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Modal, Input, Progress, Button } from 'antd';
import Dashboard_layout from '../../components/layouts/dashboard_layout';
import Apps_Layout from '../../components/layouts/apps_layout';
import StepOne from '../../components/getStartedForms/stepOne';
import StepTwo from '@/components/getStartedForms/stepTwo';

const { TextArea } = Input;

const GetStarted = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Get Started">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-[#232830] font-bold text-3xl">Get Started</h1>
          </div>

          <div className="px-16 p-10">
            <StepTwo/>
          </div>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default GetStarted;
