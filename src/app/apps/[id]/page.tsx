"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Modal, Input, Progress } from "antd";
import Dashboard_layout from "../../../components/layouts/dashboard-layout";
import Apps_Layout from "../../../components/layouts/apps_layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchApp } from "@/api/appsClient";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function App({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const { token, public_key, user } = useSelector((state: any) => state.user);

  const [showModal, setShowModal] = useState(true);

  const payload = {
    token,
    app_id: id,
    user_id: user?._id,
    public_key,
  };

  const { data: appData, status: appLoadingStatus } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  if (appLoadingStatus === "pending") {
    return <p>Loading...</p>;
  }

  const app = appData?.data?.data;

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="My App" id={id}>
        <div>
          <div className="px-16 pt-8 h-[170px] border-b bg-white">
            <div className="flex items-center gap-3">
              <Image
                src="/images/facebook.svg"
                width={32}
                height={32}
                alt="facebook"
              />
              <p className="text-[#232830] font-bold text-3xl">
                {app.app_name}
              </p>
            </div>

            <div className="flex justify-between items-center mt-[52px] gap-4">
              <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
                <p className="text-[#78797A] text-sm">ACTION</p>
                <h1 className="text-[#232830] font-bold text-3xl mt-2">
                  {app?.actions?.length || 0}
                </h1>
              </div>

              <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
                <p className="text-[#78797A] text-sm">ENVIRONMENT</p>
                <h1 className="text-[#232830] font-bold text-3xl mt-2">
                  {app?.envs?.length || 0}
                </h1>
              </div>

              <div className="border w-[280px] h-[110px] px-[22px] pt-[18px] pb-7 rounded-[5px] bg-white">
                <p className="text-[#78797A] text-sm">EVENTS</p>
                <h1 className="text-[#232830] font-bold text-3xl mt-2">
                  {app?.events?.length || 0}
                </h1>
              </div>
            </div>
          </div>

          <div className="px-16 pt-6 text-white">
            <div className="bg-white rounded h-[399px] mt-14 py-7">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" />
                  <YAxis />
                  {/* <Tooltip />
                    <Legend /> */}
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#5243AA"
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#00875A"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-7 mt-8">
              <div className="flex-1">
                <div className="bg-white rounded-t-lg py-7 px-5 flex flex-1 justify-between items-center border-b">
                  <div className="flex items-center gap-[30px]">
                    <Progress
                      type="circle"
                      percent={75}
                      strokeColor="#00875A"
                    />
                    <div>
                      <p className="text-[#171717] text-[22px]  font-bold">
                        75%
                      </p>
                      <p className="text-[#8F92A1] font-sm mt-2 tracking-[-0.4px]">
                        Hit Rate this year
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowUpOutlined className="text-[#00875A]" />{" "}
                    <p className="text-[#00875A] font-bold text-sm">20.15 %</p>
                  </div>
                </div>
                <div className="bg-white rounded-b-lg py-7 px-5 flex flex-1 justify-between items-center">
                  <div className="flex items-center gap-[30px]">
                    <Progress
                      type="circle"
                      percent={75}
                      strokeColor="#5243AA"
                    />
                    <div>
                      <p className="text-[#171717] text-[22px]  font-bold">
                        50%
                      </p>
                      <p className="text-[#8F92A1] font-sm mt-2 tracking-[-0.4px]">
                        Hit Rate this year
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowDownOutlined className="text-[#00875A]" />{" "}
                    <p className="text-[#00875A] font-bold text-sm">20.15 %</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded py-7 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    {/* <Tooltip />
                    <Legend /> */}
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#5243AA"
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
