import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import Dashboard_layout from '../../components/layouts/dashboard_layout';
import Apps_Layout from '../../components/layouts/apps_layout';

import { PlusOutlined } from '@ant-design/icons';

const Publish = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Environments">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-[#232830] font-bold text-3xl">Publish</h1>
          </div>

          <div className="px-16 p-10">
            <div className='mt-20'>
              <h1 className="text-4xl font-bold max-w-[724px]">
                You do not have any environments. Create an environment to get
                started.
              </h1>
              <Button className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8">
                <PlusOutlined />
                New Environment
              </Button>
            </div>
          </div>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default Publish;
