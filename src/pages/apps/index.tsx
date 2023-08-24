import React, { useState, useEffect } from 'react';
import { Modal, Input, Select } from 'antd';
import CustomInput from '../../components/common/Input';
import Image from 'next/image';
import Dashboard_layout from '../../components/layouts/dashboard_layout';
import Button from '../../components/common/Button';
import { useRouter } from 'next/router';
import {
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

const Dashboard = () => {
  const router = useRouter();
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);

  return (
    <Dashboard_layout activeTab="App">
      <div className="w-screen h-screen">
        <div className="px-20 border-b h-[115px] flex flex-col justify-center  bg-white">
          <div className="flex justify-between utems-center">
            <p className="text-[28px] text-[#232830] font-semibold">Apps</p>
            <div className="flex gap-7">
              <Button onClick={() =>setShowEnvModal(true)} className="font-semibold flex items-center text-sm border border-[#DC3444] text-[#DC3444] outline-none h-[40px] rounded px-[10px] gap-2">
                <SettingOutlined className="text-[#DC3444]" size={16} />
                Environments
              </Button>
              <Button onClick={() =>setShowCreateAppModal(true)} className="bg-[#0846A6] text-white font-semibold text-sm flex items-center outline-none  h-[40px] rounded px-[10px] gap-2">
                <PlusOutlined className="text-white" size={16} />
                New App
              </Button>
            </div>
          </div>
        </div>

        <div className="px-20 pt-[61px]">
          <div className="flex items-center gap-[57px]">
            <Input
              size="large"
              placeholder="Search"
              className="bg-white  border rounded w-full p-3 text-sm text-[#232830] outline-none"
              prefix={<SearchOutlined />}
            />
            <Select
              defaultValue="lucy"
              size="large"
              style={{ width: 173 }}
              className="text-sm text-[#232830] outline-none"
              options={[{ value: 'all', label: 'All' }]}
            />
          </div>

          <div className="mt-[51px]">
            <div onClick={() => router.push('/apps/my-app')} className="flex px-[36px] py-[34px] bg-white border text-[#232830] justify-between items-center rounded-[5px] mb-[25px]">
              <div className="flex items-center gap-[25px]">
                <Image
                  src="/images/google.svg"
                  width={42}
                  height={42}
                  alt="google"
                />
                <div>
                  <p className="font-bold text-xl text-[#232830]">Google</p>
                  <p className="text-sm text-[#979797] mt-1">Draft</p>
                </div>
              </div>

              <div className="flex items-center gap-[37px]">
                <p className="font-semibold text-[#232830]">6 actions</p>
                <p className="font-semibold text-[#232830]">2 environaments</p>
              </div>

              <button className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm">
                Inactive
              </button>
            </div>

            <div onClick={() => router.push('/apps/my-app')} className="flex px-[36px] py-[34px] bg-white border text-[#232830] justify-between items-center rounded-[5px] mb-[25px]">
              <div className="flex items-center gap-[25px]">
                <Image
                  src="/images/facebook.svg"
                  width={42}
                  height={42}
                  alt="faceebok"
                />
                <div>
                  <p className="font-bold text-xl text-[#232830]">Facebook</p>
                  <p className="text-sm text-[#979797] mt-1">Draft</p>
                </div>
              </div>

              <div className="flex items-center gap-[37px]">
                <p className="font-semibold text-[#232830]">6 actions</p>
                <p className="font-semibold text-[#232830]">2 environaments</p>
              </div>

              <button className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm">
                Inactive
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={showCreateAppModal}
        width="730px"
        className="rounded-none"
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setShowCreateAppModal(false)}
        style={{ padding: 0 }}
      >
        <div>
          <h1 className="text-[#232830] text-2xl font-bold border-b px-[30px] py-6">
            Create App
          </h1>
          <div className="px-[30px] mt-4 pb-7 border-b">
            <p className="text-[#232830] mt-3 text-sm font-medium">
              Each app defines its own environments, workflows and rules for
              authorization, authentication and integration. Allowing for secure
              communication between your webservices and integration partners.
            </p>

            <form className="mt-[31px]">
              <CustomInput placeholder="App Name" />
              <TextArea
                className="bg-white border rounded w-full p-3 text-sm text-[#232830] mt-6"
                placeholder="App description"
                rows={4}
              />
            </form>
          </div>

          <div className="px-[30px] py-6 flex justify-end gap-5">
            <Button onClick={() =>setShowCreateAppModal(false)} className="font-semibold text-sm border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2">
              Cancel
            </Button>
            <Button className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-[33px] px-6">
              Create
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={showEnvModal}
        width="730px"
        className="rounded-none"
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setShowEnvModal(false)}
        style={{ padding: 0 }}
      >
        <div>
          <h1 className="text-[#232830] text-2xl font-bold border-b px-[30px] py-6">
            Default Environments
          </h1>
          <div className="px-[30px] mt-4 pb-7 border-b">
            <p className="text-[#232830] mt-3 text-sm font-medium">
              Configure which environments are created automatically for the new
              apps
            </p>

            <div className="mt-[31px]">
              <div className="flex gap-5 justify-between items-center mb-6">
                <CustomInput
                  placeholder="Environment Name"
                  value="Production"
                />
                <CustomInput placeholder="Slug" value="prd" />
                <CustomInput
                  placeholder="Description"
                  value="production environment"
                />
              </div>
              <div className="flex gap-5 justify-between items-center mb-6">
                <CustomInput
                  placeholder="Environment Name"
                  value="Development"
                />
                <CustomInput placeholder="Slug" value="smd" />
                <CustomInput
                  placeholder="Description"
                  value="sandbox environment"
                />
              </div>
              <div className="flex gap-5 justify-between items-center mb-6">
                <CustomInput placeholder="Environment Name" />
                <CustomInput placeholder="Slug" />
                <CustomInput placeholder="Description" />
              </div>
            </div>
          </div>

          <div className="px-[30px] py-6 flex justify-end gap-5">
            <Button className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-[33px] px-6">
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </Dashboard_layout>
  );
};

export default Dashboard;
