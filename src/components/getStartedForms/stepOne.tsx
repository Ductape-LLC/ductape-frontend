import React, { FC, useMemo } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Button from "@/components/common/Button";

const MAX_UPLOAD_SIZE = 200 * 1024 * 1024; // 200 MB

interface StepOneProps {
  setCurrentStep: (currentStep: number) => void;
}

const StepOne: FC<StepOneProps> = ({ setCurrentStep }) => {
  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  };

  const memoizedOnDrop = useMemo(() => onDrop, []);

  const { getRootProps, getInputProps, open, acceptedFiles, fileRejections } =
    useDropzone({
      onDrop: memoizedOnDrop,
      accept: { "text/csv": [".csv"] },
      noClick: true,
      noKeyboard: true,
      multiple: false,
      maxSize: MAX_UPLOAD_SIZE,
    });

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

      <div className="px-7 pt-5">
        <div className=" gap-4">
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
                <button
                  // disabled={status === "pending"}
                  type="button"
                  className="text-primary"
                  onClick={open}
                >
                  Browse
                </button>{" "}
                to upload
              </p>
              <p className="mt-2 text-grey text-sm">
                Support for single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center my-11">
          <div className="flex gap-4">
            <Button className="font-semibold text-xs bg-white text-grey px-7 rounded border border-grey-300">
              Save
            </Button>
            <Button
              onClick={() => setCurrentStep(1)}
              className="font-semibold text-xs bg-primary text-white h-8 px-7 rounded"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
