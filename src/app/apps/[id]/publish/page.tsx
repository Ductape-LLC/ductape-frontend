"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactSelect from "react-select";
import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import Button from "@/components/common/Button";
import { fetchApp, fetchDomains, updateAppConstant } from "@/api/appsClient";
import { createUploadUrl, uploadFileToUrl } from "@/api/workspaceClient";
import { ApiError } from "@/types/user.types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Domain {
  _id: string;
  domain_name: string;
}

interface Option {
  label: string;
  value: string;
}

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

const validationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Visibility is required"),
  domains: Yup.array().of(Yup.string().required("Domain is required")),
});

export default function Publish({
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

  const { data: domainsRes, status: domainsStatus } = useQuery({
    queryKey: ["domains"],
    queryFn: () => fetchDomains(token),
  });

  const domains = domainsRes?.data?.data;

  const domainOptions: Option[] = domains?.map((domain: Domain) => ({
    label: domain.domain_name,
    value: domain._id,
  }));

  const { data, status: appStatus } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  const app = data?.data?.data;

  const [selectedDomains, setSelectedDomains] = useState<string[]>(
    app?.domains || []
  );

  console.log(selectedDomains, "assh");

  useEffect(() => {
    if (app?.domains) {
      setSelectedDomains(app.domains);
    }
    if (app?.logo) {
      setLogoUrl(app.logo);
    }
  }, [app]);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const { mutate: uploadLogo, status: uploadingLogo } = useMutation({
    mutationFn: createUploadUrl,
    onSuccess: async (data, variables) => {
      const url = data?.data?.data?.url;
      const key = data?.data?.data?.key;
      if (url) {
        try {
          const file = variables.file;
          await uploadFileToUrl(url, file);
          setLogoUrl(key);
        } catch (uploadError) {
          toast.error("Error uploading file");
        }
      }
    },
    onError: (error) => {
      console.error("Error creating upload URL:", error);
      toast.error(`Error creating upload URL: ${error}`);
    },
  });

  const memoizedOnDrop = useMemo(() => {
    const onDrop = (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      const fileType = file.type.split("/")[1];
      const visibility = "public";

      uploadLogo({ token, fileType, visibility, id: app?.workspace_id, file });
    };

    return onDrop;
  }, [app?.workspace_id, uploadLogo, token]);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    onDrop: memoizedOnDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/svg+xml": [".svg"],
    },
    noClick: true,
    noKeyboard: true,
    multiple: false,
    maxSize: MAX_UPLOAD_SIZE,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (payload) => updateAppConstant(token, payload, app?._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["app", id] });
      toast.success("App updated successfully");

      router.push(`/apps/${id}`);
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.errors || "An error occurred");
    },
  });

  const handleSubmit = async (values: any) => {
    if (!logoUrl) {
      toast.error("Please upload a logo before submitting.");
      return;
    }

    const data = {
      component: "app",
      user_id: user._id,
      public_key,
      workspace_id: app.workspace_id,
      logo: logoUrl,
      description: values.description,
      status: values.status,
      domains: selectedDomains,
    };

    await mutateAsync(data as any);
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));

  if (domainsStatus === "pending" || appStatus === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Publish" id={id}>
        <div>
          <div className="px-16 h-[110px]  border-b bg-white flex items-center">
            <h1 className="text-grey font-bold text-3xl">Publish</h1>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              description: app?.description || "",
              status: app?.status || "",
              domains: app?.domains || [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="px-16 pt-5">
                  <div className="grid gap-9 bg-white p-10 border border-white-400 rounded">
                    <div>
                      <Label
                        className="font-semibold text-grey"
                        htmlFor="description"
                      >
                        App Logo
                      </Label>

                      <div
                        {...getRootProps()}
                        className="mt-3 flex flex-col items-center justify-center py-5 w-full border-2 border-[#D9D9D9] border-dotted rounded"
                      >
                        <div className="flex items-center gap-6">
                          <Image
                            src="/images/upload.svg"
                            alt="upload"
                            width={36}
                            height={36}
                          />
                          <div className="flex flex-col items-center text-center">
                            <input {...getInputProps()} />
                            <p className="text-sm text-grey">
                              Drag and Drop or{" "}
                              <button
                                type="button"
                                className="text-primary font-bold"
                                onClick={open}
                              >
                                Browse
                              </button>{" "}
                              to upload
                            </p>
                          </div>
                        </div>
                        <div className="">
                          {acceptedFileItems.length > 0 && (
                            <ul className="mt-3 text-sm font-medium text-primary">
                              {acceptedFileItems}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="description"
                      >
                        App Description
                      </Label>

                      <Field
                        as={Textarea}
                        className="mt-3"
                        id="description"
                        name="description"
                        placeholder="Tell us about your app"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex-1">
                      <Label
                        htmlFor="domains"
                        className="text-grey font-semibold"
                      >
                        Domains
                      </Label>
                      <ReactSelect
                        id="domains"
                        className="mt-3 text-sm !border-input ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        classNamePrefix="react-select"
                        options={domainOptions}
                        value={domainOptions?.filter((option) =>
                          selectedDomains.includes(option.value)
                        )}
                        isMulti
                        onChange={(selected) => {
                          setSelectedDomains(selected.map((s) => s.value));
                        }}
                        placeholder="Choose domains"
                        isOptionDisabled={() => selectedDomains.length >= 3}
                      />
                      <ErrorMessage
                        name="domains"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div className="flex-1">
                      <Label
                        htmlFor="status"
                        className="text-grey font-semibold"
                      >
                        App visibility
                      </Label>
                      <Select
                        name="status"
                        onValueChange={(value) =>
                          setFieldValue("status", value)
                        }
                        defaultValue={app?.status}
                      >
                        <SelectTrigger className="mt-3">
                          <SelectValue placeholder="Choose one" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        disabled={uploadingLogo === "pending" || isSubmitting}
                        className="font-bold text-sm bg-primary text-white h-12 px-7 rounded w-full"
                      >
                        Publish
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
