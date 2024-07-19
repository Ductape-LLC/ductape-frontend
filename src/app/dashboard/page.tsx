"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { createWorkspace } from "@/api/workspaceClient";
import { setShowCreateWorkspaceModal } from "@/redux/slice/workspaceSlice";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 273, mobile: 180 },
  { month: "August", desktop: 273, mobile: 180 },
  { month: "September", desktop: 273, mobile: 180 },
  { month: "October", desktop: 273, mobile: 180 },
  { month: "November", desktop: 273, mobile: 180 },
  { month: "December", desktop: 273, mobile: 180 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#5243AA",
  },
  mobile: {
    label: "Mobile",
    color: "#00875A",
  },
} satisfies ChartConfig;

interface FormValues {
  name: string;
}

const createWorkSpaceSchema = Yup.object().shape({
  name: Yup.string().required("Workspace name is required"),
});

export default function Dashboard() {
  const dispatch = useDispatch();
  const { fetchAndSaveWorkSacpes } = useWorkspaces();
  const {
    workspaces,
    defaultWorkspace,
    workspaceStats,
    showCreateWorkspaceModal,
  } = useSelector((state: any) => state.workspace);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues, submitProps: any) => {
    try {
      submitProps.setSubmitting(false);
      setLoading(true);
      toast.loading("Loading...");
      const data = {
        name: values.name,
        public_key,
        user_id: user._id,
      };
      const response = await createWorkspace(token, data);
      if (response.status === 201) {
        setLoading(false);
        toast.success("Workspace created successful");
        fetchAndSaveWorkSacpes();
        dispatch(setShowCreateWorkspaceModal(false));
      }
      setLoading(false);
      submitProps.resetForm();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
    },
    validationSchema: createWorkSpaceSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!defaultWorkspace) {
      dispatch(setShowCreateWorkspaceModal(true));
    }
  }, []);

  return (
    <DashboardLayout activeTab="Dashboard">
      <div>
        <div className="px-20 pt-[47px] border-b flex flex-col justify-between h-[237px] bg-white">
          <div>
            <p className="font-semibold text-[#979797]">
              Dashboard /{" "}
              <span className="text-[#232830]">
                {moment().format("dddd D MMMM, YYYY")}
              </span>
            </p>
            <p className="text-[28px] text-[#232830]">
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
              <p className="text-grey-900 font-bold text-sm uppercase">
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
                    data={chartData}
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
                      tickFormatter={(value) => `${value}`}
                      fontSize={14}
                      fontWeight={500}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="transparent"
                      stroke="var(--color-mobile)"
                      stackId="a"
                      strokeWidth={4}
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="transparent"
                      stroke="var(--color-desktop)"
                      stackId="a"
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
                    data={chartData}
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
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="transparent"
                      stroke="var(--color-mobile)"
                      stackId="a"
                      strokeWidth={4}
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="transparent"
                      stroke="var(--color-desktop)"
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
          open={false}
          width="50%"
          className="rounded-none"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => dispatch(setShowCreateWorkspaceModal(false))}
        >
          <div className="py-14 px-12">
            <h1 className="text-[#232830] text-2xl font-bold">
              Welcome to Ductape
            </h1>
            <p className="text-[#232830] mt-3 max-w-[482px] text-base">
              To get started, you need to create a workspace or join an existing
              workspace.
            </p>
            <form className="mt-[49px]">
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
              <div className="mt-[35px]">
                <Button
                  disabled={!formik.isValid || !formik.dirty || loading}
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                >
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
