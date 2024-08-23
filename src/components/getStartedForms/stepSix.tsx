import React, { FC, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@/components/common/Button";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { fetchApp, updateAppConstant } from "@/api/appsClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Label } from "../ui/label";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { createUploadUrl, uploadFileToUrl } from "@/api/workspaceClient";
import toast from "react-hot-toast";
import { ApiError } from "@/types/user.types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface StepSixProps {
  setCurrentStep: (currentStep: number) => void;
}

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

const validationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const StepSix: FC<StepSixProps> = ({ setCurrentStep }) => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/")[2];
  const queryClient = useQueryClient();

  const { token, public_key, user } = useSelector((state: any) => state.user);

  const payload = {
    token,
    app_id: id,
    user_id: user?._id,
    public_key,
  };

  const { data } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  const app = data?.data?.data;

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

      setTimeout(() => {
        setCurrentStep(6);
      }, 2000);

      router.push(`/apps/${id}`);
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.errors || "An error occurred");
    },
  });

  const handleSubmit = async (values: { description: string }) => {
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
      get_started: 0,
    };

    await mutateAsync(data as any);
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));

  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex items-center gap-2">
          <div className="bg-primary px-3.5 py-2 text-white h-9 rounded font-semibold">
            Step 6 of 6
          </div>
          <p className="text-grey font-semibold text-lg">
            Additional Information
          </p>
        </div>

        <p className="text-grey-200 text-sm mt-5 font-semibold">
          Add additional information
        </p>
      </div>

      <Formik
        initialValues={{ description: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="px-7 pt-5">
              <div className="grid gap-10">
                <div>
                  <Label
                    className="font-lg font-semibold"
                    htmlFor="description"
                  >
                    App Logo
                  </Label>

                  <div
                    {...getRootProps()}
                    className="mt-3 flex flex-col items-center justify-center py-5 w-full border-2 border-grey-800/20 border-dashed rounded-2xl"
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
                    className="font-lg font-semibold"
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
              </div>

              <div className="flex justify-between items-center my-11">
                <Button
                  className="font-semibold text-xs bg-white text-primary px-7 rounded border border-primary h-9"
                  onClick={() => setCurrentStep(4)}
                >
                  Previous
                </Button>

                <div className="flex justify-end items-center my-11">
                  <div className="flex gap-4">
                    <Button
                      disabled={uploadingLogo === "pending" || isSubmitting}
                      className="font-semibold text-xs bg-primary text-white h-8 px-7 rounded"
                    >
                      Finish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StepSix;
