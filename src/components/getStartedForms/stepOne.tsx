import React, { FC, useMemo, useState } from "react";
import Image from "next/image";
import { FileRejection, useDropzone } from "react-dropzone";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApp } from "@/api/appsClient";
import { connectDuctape } from "@/api/sdk";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { PostmanCollectionV21 } from "ductape-sdk/dist/imports/imports.types";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

interface StepOneProps {
  setCurrentStep: (currentStep: number) => void;
  disableUploadField: boolean;
}

const StepOne: FC<StepOneProps> = ({ setCurrentStep, disableUploadField }) => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const queryClient = useQueryClient();
  const [uploadedFileContent, setUploadedFileContent] =
    useState<PostmanCollectionV21 | null>(null);

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

  const ductape = useMemo(
    () =>
      connectDuctape({
        workspace_id: app?.workspace_id,
        user_id: user?._id,
        token,
        public_key,
      }),
    [app?.workspace_id, public_key, token, user?._id]
  );

  const { mutate, status: uploadingAppStatus } = useMutation({
    mutationFn: async (jsonContent: PostmanCollectionV21) => {
      const importer = await ductape.getActionImporter();
      return importer.importPostmanV21(jsonContent, true, id);
    },
  });

  const onDrop = async (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        toast.error(`${file.name}:${error.message}`);
      });
    });

    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          try {
            const jsonContent = JSON.parse(event.target.result as string);
            setUploadedFileContent(jsonContent);
          } catch (error) {
            console.error("Error importing JSON:", error);
          }
        }
      };

      reader.readAsText(file);
    }
  };

  const memoizedOnDrop = useMemo(() => onDrop, []);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    onDrop: memoizedOnDrop,
    accept: { "application/json": [".json"] },
    multiple: false,
    maxSize: MAX_UPLOAD_SIZE,
    noClick: disableUploadField,
    noKeyboard: disableUploadField,
  });

  const handleSubmit = async () => {
    if (disableUploadField) {
      setCurrentStep(1);
      return;
    }

    if (uploadedFileContent) {
      try {
        mutate(uploadedFileContent, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["app", id] });
            toast.success("Import successful");
            setTimeout(() => {
              setCurrentStep(1);
            }, 2000);
          },
          onError: (error) => {
            console.error(error);
            toast.error(error.message);
          },
        });
      } catch (error) {
        console.error("Error importing JSON:", error);
      }
    } else {
      toast.error("Please upload a file first.");
    }
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));

  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex items-center gap-2">
          <div className="bg-primary px-3.5 py-2 text-white h-9 rounded font-semibold">
            Step 1 of 6
          </div>
          <p className="text-grey font-semibold text-lg">
            Import Documentation
          </p>
        </div>

        <p className="text-[#979797] text-sm mt-5 font-semibold">
          Import Actions from API Docs
        </p>
      </div>

      <form className="px-7 pt-5">
        <div className="grid gap-4">
          <p className="font-lg font-semibold">API Documentation Type</p>
          <RadioGroup className="mt-5 gap-4" defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="postman_v2.1" id="postman_v2.1" checked />
              <Label htmlFor="postman_v2.1">Postman v2.1</Label>
            </div>
            <div className="flex items-center space-x-2 group">
              <RadioGroupItem
                value="postman_v2.0"
                id="postman_v2.0"
                disabled
                className="peer"
              />
              <Label
                htmlFor="postman_v2.0"
                className="peer-disabled:text-grey-800"
              >
                Postman v2.0
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="openapi_v3.0"
                id="openapi_v3.0"
                disabled
                className="peer"
              />
              <Label
                htmlFor="openapi_v3.0"
                className="peer-disabled:text-grey-800"
              >
                OpenApi 3.0
              </Label>
            </div>
          </RadioGroup>

          <div
            {...getRootProps()}
            className="mt-9 flex flex-col gap-4 items-center justify-center pt-6 pb-10 w-full border-2 border-grey-800/20 bg-grey-800/5 border-dashed rounded-2xl"
          >
            <Image
              src="/images/upload.svg"
              alt="upload"
              width={36}
              height={36}
            />
            <div className="flex flex-col items-center text-center">
              <input {...getInputProps()} />
              <p className="font-medium text-sm text-grey">
                Drag and Drop or{" "}
                <button type="button" className="text-primary" onClick={open}>
                  Browse
                </button>{" "}
                to upload
              </p>
              <p className="mt-2 text-grey text-sm">
                Support for single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </div>
            <div className="mt-3 flex flex-col-reverse">
              {acceptedFileItems.length > 0 && (
                <ul className="text-primary text-sm font-medium">
                  {acceptedFileItems}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center my-11">
          <div className="flex gap-4">
            <Button
              disabled={uploadingAppStatus === "pending"}
              onClick={handleSubmit}
              type="button"
              className="font-semibold text-xs bg-primary text-white h-8 px-7 rounded"
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
