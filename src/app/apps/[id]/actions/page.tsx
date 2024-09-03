"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import Button from "@/components/common/Button";
import { fetchApp } from "@/api/appsClient";
import { ApiError } from "@/types/user.types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const validationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Visibility is required"),
  domains: Yup.array().of(Yup.string().required("Domain is required")),
});

export default function Actions({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { token, public_key, user } = useSelector((state: any) => state.user);

  const payload = {
    token,
    app_id: id,
    user_id: user?._id,
    public_key,
  };

  const { data, status: appStatus } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  const app = data?.data?.data;

  const handleSubmit = async (values: any) => {
    console.log("omo");
  };

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Actions" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-grey font-bold text-3xl">Actions</h1>
          </div>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
