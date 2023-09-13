import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Switch } from 'antd';
import Dashboard_layout from '@/components/layouts/dashboard_layout';
import Apps_Layout from '@/components/layouts/apps_layout';
import CustomInput from '@/components/common/Input';
import CustomSelect from '@/components/common/Select';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Publish = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Application Variable">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-[#232830] font-bold text-3xl">
              Application Variables
            </h1>
          </div>

          <div className="px-16 p-10">
            <div className="mt-20">
              <h1 className="text-4xl font-bold max-w-[850px]">
                You do not have any application variables. Create an application
                variable to get started.
              </h1>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
              >
                <PlusOutlined />
                New Application Variable
              </Button>
            </div>

            {/* <div>
              <div className="border rounded bg-white h-[110px] flex items-center px-7 justify-between">
                <p className="font-bold text-lg">Production</p>
                <button className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm">
                  Inactive
                </button>
                <p className="underline text-xs font-semibold">
                  Production Environment
                </p>
              </div>

              <div className="border rounded bg-white h-[110px] flex items-center px-7 justify-between mt-7">
                <p className="font-bold text-lg">Sandbox</p>
                <button className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm">
                  Inactive
                </button>
                <p className="underline text-xs font-semibold">
                  Sandbox Environment
                </p>
              </div>

              <div className="border rounded bg-white h-[110px] flex items-center px-7 justify-between mt-7">
                <p className="font-bold text-lg">Test</p>
                <button className="text-[#00875A] border text-xs px-[14px] py-1 bg-[#00875A]/10 rounded-sm">
                  Inactive
                </button>
                <p className="underline text-xs font-semibold">
                  Test Environment
                </p>
              </div>
            </div> */}
          </div>
        </div>

        <Modal
          open={showModal}
          width="730px"
          className="rounded-none"
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={() => setShowModal(false)}
          style={{ padding: 0 }}
        >
          <div>
            <h1 className="text-[#232830] text-xl font-bold border-b px-[30px] py-6">
              Create Application Variable
            </h1>
            <div className="px-[30px] mt-4 pb-7 border-b">
              <form className="mt-[31px]">
                <CustomInput placeholder="Variable Name" />
                <CustomInput placeholder="Description" className="mt-[26px]" />
                <TextArea
                  className="bg-white border rounded w-full p-3 text-sm text-[#232830] mt-[26px]"
                  placeholder="Description"
                  rows={5}
                />
                <CustomSelect
                  placeholder="Choose Variable Type"
                  className="mt-[26px]"
                />

                <div>
                  <div className="flex items-center gap-1 mt-9">
                    <InfoCircleOutlined />
                    <p className="font-semibold tracking-[-0.4px] text-[#979797]">
                      Active and open to connections?
                    </p>
                  </div>
                  <Switch defaultChecked  />
                </div>
              </form>
            </div>

            <div className="px-[30px] py-6 flex justify-end gap-5">
              <Button
                onClick={() => setShowModal(false)}
                className="font-semibold text-sm border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2"
              >
                Cancel
              </Button>
              <Button className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-[33px] px-6">
                Create
              </Button>
            </div>
          </div>
        </Modal>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default Publish;
