import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Dashboard_layout from '@/components/layouts/dashboard_layout';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Link from 'next/link';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

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

        <Modal
          open={showModal}
          width="50%"
          className="rounded-none"
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={() => setShowModal(false)}
        >
          <div className='py-14 px-12'>
            <h1 className="text-[#232830] text-2xl font-bold">
              Welcome to Ductape
            </h1>
            <p className="text-[#232830] mt-3 max-w-[482px] text-base">
              To get started, you need to create a workspace or join an existing
              workspace.
            </p>
            <form className="mt-[49px]">
              <Input placeholder="Workspace Name" />
              <div className="mt-[35px]">
                <Button disabled>Create Workspace</Button>
              </div>
            </form>
            <div className="mt-20 w-full text-center">
              <Link
                href="#"
                className=" text-primary text-center font-base font-bold"
              >
                Or join an existing workspace
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </Dashboard_layout>
  );
};

export default Dashboard;
