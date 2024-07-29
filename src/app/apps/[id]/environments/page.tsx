"use client";

import { useState } from "react";
import { Button, Modal, Input, Switch, Empty, Spin } from "antd";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import CustomInput from "@/components/common/Input";
import {
  PlusOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { IAppEnv } from "ductape-sdk/dist/types/appBuilder.types";
import { Capitalize } from "@/utils";
import { fetchApp } from "@/api/appsClient";

const { TextArea } = Input;

export default function Environments({
  params: { id },
}: {
  params: { id: string };
}) {
  const [showModal, setShowModal] = useState(false);
  const { token, public_key, user } = useSelector((state: any) => state.user);

  const payload = {
    token,
    app_id: id,
    user_id: user?._id,
    public_key,
  };

  const { data, status: appLoadingStatus } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  const app = data?.data?.data;
  const envs = app?.envs || [];

  if (appLoadingStatus === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Environments" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center justify-between">
            <h1 className="text-[#232830] font-bold text-3xl">Environments</h1>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-10 px-4 rounded"
            >
              <PlusOutlined />
              New Environment
            </Button>
          </div>

          <div className="px-16 p-10">
            {!app.envs?.length ? (
              <div className="mt-20">
                <h1 className="text-4xl font-bold">
                  You do not have any environments. Create an environment to get
                  started.
                </h1>
                <Button
                  onClick={() => setShowModal(true)}
                  className="bg-primary text-white flex items-center text-sm font-bold tracking-[-0.4px] h-12 px-4 rounded mt-8"
                >
                  <PlusOutlined />
                  New Environment
                </Button>
              </div>
            ) : (
              <div>
                {!app ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : envs && envs?.length ? (
                  <>
                    {envs.map((env: IAppEnv) => {
                      return (
                        <div
                          key={env?._id}
                          className="border rounded bg-white h-[110px] flex items-center px-7 justify-between mb-7"
                        >
                          <p className="font-bold text-lg">
                            {Capitalize(env?.env_name)}
                          </p>
                          <div
                            className={`${
                              env?.active
                                ? "text-[#00875A] bg-[#00875A] border-[#00875A] border-[0.5px]"
                                : "text-[#DC3444] bg-[#DC3444] border-[#DC3444] border-[0.5px]"
                            } bg-opacity-[15%] border text-xs px-[14px] py-1 rounded-sm`}
                          >
                            {env.active ? "Active" : "Inactive"}
                          </div>
                          <p className="underline text-xs font-semibold">
                            {Capitalize(env?.description || "")}
                          </p>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <Empty />
                )}
              </div>
            )}
          </div>
        </div>

        <Modal
          open={showModal}
          width="730px"
          className="rounded-none"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => setShowModal(false)}
          style={{ padding: 0 }}
        >
          <div>
            <h1 className="text-grey text-xl font-bold border-b px-7 py-6">
              Create Environment
            </h1>
            <div className="px-7 mt-4 pb-7 border-b">
              <form className="mt-8">
                <CustomInput placeholder="Base URL" />
                <CustomInput placeholder="Content Type" className="mt-6" />
                <TextArea
                  className="bg-white border rounded w-full p-3 text-sm text-grey mt-6"
                  placeholder="Tell us about your app, what it does and how to use it"
                  rows={5}
                />

                <div>
                  <div>
                    <div className="flex items-center gap-1 mt-9">
                      <InfoCircleOutlined />
                      <p className="font-semibold tracking-[-0.4px] text-[#979797]">
                        Require Whitelisted IPs
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center gap-1 mt-5">
                    <InfoCircleOutlined />
                    <p className="font-semibold tracking-[-0.4px] text-[#979797]">
                      Active and open to connections?
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </form>
            </div>

            <div className="px-7 py-6 flex justify-end gap-5">
              <Button
                onClick={() => setShowModal(false)}
                className="font-semibold text-sm border text-grey outline-none h-8 rounded px-6 gap-2"
              >
                Cancel
              </Button>
              <Button className="bg-[#0846A6] text-white font-semibold text-sm outline-none rounded h-8 px-6">
                Create
              </Button>
            </div>
          </div>
        </Modal>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
