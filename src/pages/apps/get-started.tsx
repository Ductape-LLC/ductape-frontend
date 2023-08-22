import React, { useState, useEffect } from 'react';
import { Modal, Input, Select } from 'antd';
import CustomInput from '@/components/common/input';
import Image from 'next/image';
import Dashboard_layout from '@/components/layouts/dashboard_layout';
import Apps_Layout from '@/components/layouts/apps_layout';
import Button from '@/components/common/Button';
import Link from 'next/link';
import {
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

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
