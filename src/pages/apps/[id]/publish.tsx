import React, { useState, useEffect } from "react";
// import { Select } from 'antd';
import { FileUploader } from "react-drag-drop-files";
import Dashboard_layout from "../../../components/layouts/dashboard_layout";
import Apps_Layout from "../../../components/layouts/apps_layout";
import { UploadOutlined } from "@ant-design/icons";
import Button from "../../../components/common/Button";
import Select from "../../../components/common/Select";

const Publish = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Dashboard_layout activeTab="App">
      <Apps_Layout activeAppTab="Publish">
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-[#232830] font-bold text-3xl">Publish</h1>
          </div>

          <div className="px-16 p-10">
            <div className="border rounded bg-white py-9 px-8">
              <label className="text-sm font-semibold">App Logo</label>
              <div className="h-[85px] w-full border rounded border-dashed mt-2 flex items-center justify-center">
                <FileUploader name="file">
                  <div className="flex items-center gap-7">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <UploadOutlined style={{ color: "#8F92A1" }} />
                    </div>
                    <p className="text-sm tracking-[-0.4px]">
                      Drag and Drop or{" "}
                      <span className="text-primary font-bold">Browse</span> to
                      upload
                    </p>
                  </div>
                </FileUploader>
              </div>

              <div className="mt-12">
                <label className="text-sm font-semibold">Domain</label>
                <Select
                  className="mt-2"
                  defaultValue="Choose one"
                  style={{ width: "100%" }}
                  bordered={false}
                  options={[
                    { value: "Choose one", label: "Choose one" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>

              <div className="mt-12">
                <label className="text-sm font-semibold">App Visibility</label>
                <Select
                  className="mt-2"
                  defaultValue="Choose one"
                  style={{ width: "100%" }}
                  bordered={false}
                  options={[
                    { value: "Choose one", label: "Choose one" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>

              <div className="mt-14">
                <Button disabled>Publish</Button>
              </div>
            </div>
          </div>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
};

export default Publish;
