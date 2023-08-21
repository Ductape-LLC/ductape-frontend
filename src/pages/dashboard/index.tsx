import React from 'react';
import Dashboard_layout from '@/components/layouts/dashboard_layout';

const Dashboard = () => {
  return (
    <Dashboard_layout activeTab="Dashboard">
      <div className="w-screen">
        <div className="px-20 pt-[47px] border-b flex flex-col justify-between h-[237px] bg-white">
          <div>
            <p className="font-semibold text-[#979797]">
              Dashboard /{' '}
              <span className="text-[#232830]">Wednesday 3 May, 2023</span>
            </p>
            <p className="text-[28px] text-[#232830]">
              Welcome Back, <span className="font-semibold">Fikayomi</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-[68px] gap-4">
            <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
              <p className="text-[#78797A] text-sm">APPS</p>
              <h1 className="text-[#232830] font-bold text-3xl mt-2">3</h1>
            </div>

            <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
              <p className="text-[#78797A] text-sm">INTEGRATIONS</p>
              <h1 className="text-[#232830] font-bold text-3xl mt-2">3</h1>
            </div>

            <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
              <p className="text-[#78797A] text-sm">WEBHOOKS</p>
              <h1 className="text-[#232830] font-bold text-3xl mt-2">3</h1>
            </div>

            <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
              <p className="text-[#78797A] text-sm">WEBHOOKS</p>
              <h1 className="text-[#232830] font-bold text-3xl mt-2">3</h1>
            </div>
          </div>
        </div>

        <div className="px-20 pt-[106px]">
          <div className="flex items-center gap-[57px]">
            <div className="flex-1 border h-20 bg-white"></div>
            <div className="w-[35%] border h-20 bg-white">jdjdjdj</div>
          </div>
        </div>
      </div>
    </Dashboard_layout>
  );
};

export default Dashboard;
