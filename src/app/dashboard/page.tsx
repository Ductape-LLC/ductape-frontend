"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { createWorkspace, fetchWorkspaceStats } from "@/api/workspaceClient";
import { setShowCreateWorkspaceModal } from "@/redux/slice/workspaceSlice";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ApiError } from "@/types/user.types";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chartConfig = {
  success: {
    label: "Success",
    color: "#00875A",
  },
  failed: {
    label: "Failed",
    color: "#5243AA",
  },
  requests: {
    label: "Requests",
    color: "#5243AA",
  },
} satisfies ChartConfig;

interface FormValues {
  name: string;
}

const roundUpToMultiple = (value: number, multiple: number) => {
  return Math.ceil(value / multiple) * multiple;
};

const createWorkSpaceSchema = Yup.object().shape({
  name: Yup.string().required("Workspace name is required"),
});

export default function Dashboard() {
  const dispatch = useDispatch();
  const { fetchAndSaveWorkSacpes } = useWorkspaces();
  const [showModal, setShowModal] = useState(false);
  const { workspaces, defaultWorkspace, workspaceStats } = useSelector(
    (state: any) => state.workspace
  );
  const { token, public_key, user } = useSelector((state: any) => state.user);

  const { data } = useQuery({
    queryKey: ["workspaceStats"],
    queryFn: () => fetchWorkspaceStats(token, defaultWorkspace._id, public_key),
    enabled: !!defaultWorkspace,
  });

  const requestHistory = data?.data?.data?.requests_history;
  const integrationHistory = data?.data?.data?.integration_history;

  const requestHistoryChartData =
    requestHistory?.map(
      (item: { month: number; success: number; failed: number }) => ({
        month: monthNames[item.month - 1],
        Success: item.success,
        Failed: item.failed,
      })
    ) || [];

  const integrationChartData =
    integrationHistory?.map((item: { month: number; requests: number }) => ({
      month: monthNames[item.month - 1],
      Requests: item.requests,
    })) || [];

  const maxRequestHistorySuccess = Math.max(
    ...requestHistoryChartData.map((item: { Success: number }) => item.Success)
  );
  const maxRequestHistoryFailed = Math.max(
    ...requestHistoryChartData.map((item: { Failed: number }) => item.Failed)
  );
  const maxValue = Math.max(maxRequestHistorySuccess, maxRequestHistoryFailed);

  const yAxisMax = roundUpToMultiple(maxValue, 3000);

  const { mutate, status } = useMutation({
    mutationFn: () =>
      createWorkspace(token, {
        name: formik.values.name,
        public_key,
        user_id: user._id,
      }),
    onSuccess: () => {
      toast.success("Workspace created successful");
      setShowModal(false);
      fetchAndSaveWorkSacpes();
    },
    onError: (error: ApiError) => {
      toast.error(error.response.data.errors || "An error occurred");
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
    },
    validationSchema: createWorkSpaceSchema,
    onSubmit: () => {
      mutate();
    },
  });

  useEffect(() => {
    if (!defaultWorkspace) {
      dispatch(setShowCreateWorkspaceModal(true));
    }
  }, []);

  return (
    <DashboardLayout activeTab="Dashboard">
      <div>
        <div className="px-20 pt-12 border-b flex flex-col justify-between h-[237px] bg-white">
          <div>
            <p className="font-semibold text-grey-200">
              Dashboard /{" "}
              <span className="text-grey">
                {moment().format("dddd D MMMM, YYYY")}
              </span>
            </p>
            <p className="text-[1.75rem] text-grey">
              Welcome Back,{" "}
              <span className="font-semibold">{user?.firstname}</span>
            </p>
          </div>

          <div className="grid grid-cols-4 mt-16 gap-14">
            <div className="border h-[110px] px-5 pt-4 pb-7 rounded bg-white">
              <p className="text-grey-900 font-bold text-sm uppercase">APPS</p>
              <h1 className="text-grey font-bold text-3xl mt-2">
                {workspaceStats.apps.toLocaleString()}
              </h1>
            </div>

            <div className="border h-[110px] px-5 pt-4 pb-7 rounded bg-white">
              <p className="text-grey-900 font-bold text-sm uppercase">
                INTEGRATIONS
              </p>
              <h1 className="text-grey font-bold text-3xl mt-2">
                {workspaceStats.integrations.toLocaleString()}
              </h1>
            </div>

            <div className="border h-[110px] px-5 pt-4 pb-7 rounded bg-white">
              <p className="text-grey-900 font-bold text-sm uppercase text-">
                Inbound Requests
              </p>
              <h1 className="text-grey font-bold text-3xl mt-2">
                {workspaceStats.inbound_requests.toLocaleString()}
              </h1>
            </div>

            <div className="border h-[110px] px-5 pt-4 pb-7 rounded bg-white">
              <p className="text-grey-900 font-bold text-sm uppercase">
                Outbount Request
              </p>
              <h1 className="text-grey font-bold text-3xl mt-2">
                {workspaceStats.outbound_requests.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>

        <div className="px-20 pt-[106px]">
          <div className="flex items-center gap-14 basis-full">
            <Card className="basis-[64%]">
              <CardHeader>
                <CardTitle className="font-bold">Requests Overtime</CardTitle>
                <CardDescription className="text-base text-grey-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Some
                  text content here
                </CardDescription>
              </CardHeader>
              <div className="mb-6 w-full bg-white-400 h-[1px]" />
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80 w-full">
                  <AreaChart
                    accessibilityLayer
                    data={requestHistoryChartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                      fontSize={16}
                      fontWeight={600}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={16}
                      fontWeight={600}
                      domain={[0, yAxisMax]}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                      dataKey="Success"
                      type="natural"
                      fill="transparent"
                      stroke="var(--color-success)"
                      stackId="success"
                      strokeWidth={4}
                    />
                    <Area
                      dataKey="Failed"
                      type="natural"
                      fill="transparent"
                      stroke="var(--color-failed)"
                      stackId="failed"
                      strokeWidth={4}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="basis-[36%]">
              <CardHeader>
                <CardTitle className="font-bold">Integrations</CardTitle>
                <CardDescription className="text-base text-grey-200">
                  Lorem ipsum dolor sit amet, consectetur.
                </CardDescription>
              </CardHeader>
              <div className="mb-6 w-full bg-white-400 h-[1px]" />
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80 w-full">
                  <AreaChart
                    accessibilityLayer
                    data={integrationChartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                      fontSize={16}
                      fontWeight={600}
                      height={0}
                    />
                    <Area
                      dataKey="Requests"
                      type="natural"
                      fill="transparent"
                      stroke="var(--color-requests)"
                      stackId="a"
                      strokeWidth={4}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <Modal
          open={workspaces.length === 0 || showModal}
          width="50%"
          className="rounded-none"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => setShowModal(false)}
        >
          <div className="py-14 px-12">
            <h1 className="text-grey text-2xl font-bold">Welcome to Ductape</h1>
            <p className="text-grey mt-3 max-w-[482px] text-base">
              To get started, you need to create a workspace or join an existing
              workspace.
            </p>
            <form className="mt-12" onSubmit={formik.handleSubmit}>
              <div>
                <Input
                  placeholder="Workspace Name"
                  onBlur={formik.handleBlur("name")}
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-xs mt-1 text-error">
                    {formik.errors.name}
                  </p>
                ) : null}
              </div>
              <div className="mt-9">
                <Button disabled={status === "pending"} type="submit">
                  Create Workspace
                </Button>
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
        <div className="h-20" />
      </div>
    </DashboardLayout>
  );
}
