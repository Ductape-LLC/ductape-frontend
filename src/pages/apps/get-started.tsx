import React, { useState, useEffect } from 'react';
import { Modal, Input, Select } from 'antd';
import Dashboard_layout from '../../components/layouts/dashboard_layout';
import Apps_Layout from '../../components/layouts/apps_layout';



const Dashboard = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout>
        <h1 className="text-[28px] text-[#232830] font-semibold">Apps</h1>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default Dashboard;
