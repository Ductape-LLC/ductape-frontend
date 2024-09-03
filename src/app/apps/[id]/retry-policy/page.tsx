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

export default function RetryPolicy({
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
      <Apps_Layout activeAppTab="Retry Policy" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-grey font-bold text-3xl">Retry Policy</h1>
          </div>

          <Formik
            initialValues={{
              description: "",
              status: "",
              domains: [],
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="px-16 pt-5">
                <div className="grid bg-white p-10 border border-white-400 rounded">
                  <h2 className="text-xl font-bold text-grey pb-6 border-b border-white-400 -mx-10 px-10">
                    Set Retry Policy
                  </h2>
                  <div className="mt-5 flex-1">
                    <Label
                      className="text-grey font-semibold"
                      htmlFor="max_retries"
                    >
                      Maximum number of retries
                    </Label>

                    <Field
                      as={Input}
                      className="mt-2"
                      id="max_retries"
                      name="max_retries"
                    />
                    <ErrorMessage
                      name="max_retries"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mt-6 border-b border-white-400">
                    <p className="text-primary font-semibold px-3.5 pb-2 border-b-primary border-b-[3px] inline-block">
                      Lag Times
                    </p>
                  </div>
                  <p className="mt-7 font-semibold text-grey">
                    Set policy per response codes. All times should be between
                    500 and 10,000 microseconds
                  </p>

                  <div className="mt-6 grid gap-6">
                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="lag_time_500"
                      >
                        Lag time for “500”
                      </Label>

                      <Field
                        as={Input}
                        className="mt-2"
                        id="lag_time_500"
                        name="lag_time_500"
                      />
                      <p className="mt-1 text-xs text-grey">
                        Set to “0” if unavailable
                      </p>
                      <ErrorMessage
                        name="lag_time_500"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="lag_time_400"
                      >
                        Lag time for “503”
                      </Label>

                      <Field
                        as={Input}
                        className="mt-2"
                        id="lag_time_503"
                        name="lag_time_503"
                      />
                      <p className="mt-1 text-xs text-grey">
                        Set to “0” if unavailable
                      </p>
                      <ErrorMessage
                        name="lag_time_503"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="lag_time_400"
                      >
                        Lag time for “400”
                      </Label>

                      <Field
                        as={Input}
                        className="mt-2"
                        id="lag_time_400"
                        name="lag_time_400"
                      />
                      <p className="mt-1 text-xs text-grey">
                        Set to “0” if unavailable
                      </p>
                      <ErrorMessage
                        name="lag_time_400"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="lag_time_401"
                      >
                        Lag time for “401”
                      </Label>

                      <Field
                        as={Input}
                        className="mt-2"
                        id="lag_time_401"
                        name="lag_time_401"
                      />
                      <p className="mt-1 text-xs text-grey">
                        Set to “0” if unavailable
                      </p>
                      <ErrorMessage
                        name="lag_time_401"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="lag_time_403"
                      >
                        Lag time for “403”
                      </Label>

                      <Field
                        as={Input}
                        className="mt-2"
                        id="lag_time_403"
                        name="lag_time_403"
                      />
                      <p className="mt-1 text-xs text-grey">
                        Set to “0” if unavailable
                      </p>
                      <ErrorMessage
                        name="lag_time_403"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="lag_time_404"
                      >
                        Lag time for “404”
                      </Label>

                      <Field
                        as={Input}
                        className="mt-2"
                        id="lag_time_404"
                        name="lag_time_404"
                      />
                      <p className="mt-1 text-xs text-grey">
                        Set to “0” if unavailable
                      </p>
                      <ErrorMessage
                        name="lag_time_404"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex gap-4">
                    <Button className="font-semibold text-sm bg-primary text-white h-10 px-14 rounded">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
