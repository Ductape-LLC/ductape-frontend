import React, { useState, useEffect } from 'react';
// import { Select } from 'antd';
import { FileUploader } from 'react-drag-drop-files';
import Dashboard_layout from '../../components/layouts/dashboard_layout';
import Apps_Layout from '../../components/layouts/apps_layout';
import { UploadOutlined } from '@ant-design/icons';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';

const Pricing = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Pricing"></Apps_Layout>
    </Dashboard_layout>
  );
};

export default Pricing;
