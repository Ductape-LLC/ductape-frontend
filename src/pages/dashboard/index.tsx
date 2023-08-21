import React from 'react';
import { Statistic } from 'antd';
import Dashboard_layout from '@/components/layouts/dashboard_layout';

const Dashboard = () => {
  return (
    <Dashboard_layout activeTab="Dashboard">
      <div className="w-screen bg-white">
        <div className="px-20 pt-[47px] pb-[127px] border-b">
          <div>
            <p className="font-semibold text-[#979797]">
              Dashboard /{' '}
              <span className="text-[#232830]">Wednesday 3 May, 2023</span>
            </p>
            <p className="text-[28px] text-[#232830]">
              Welcome Back, <span className="font-semibold">Fikayomi</span>
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <div className="border max-w-[280px] h-[110px] px-[22px] pt-[18px] pb-7">
                <p className="text-[#78797A]">Apps</p>
                <h1 className='text-[#232830] font-bold text-3xl'>3</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard_layout>
  );
};

export default Dashboard;
