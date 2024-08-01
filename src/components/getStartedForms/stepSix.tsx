import React, { FC, useMemo, useState } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

import Button from "@/components/common/Button";
import CustomInput from "../common/Input";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { fetchApp } from "@/api/appsClient";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

interface StepSixProps {
  setCurrentStep: (currentStep: number) => void;
}

interface Variable {
  key: string;
  type: string;
  description: string;
}

const MAX_UPLOAD_SIZE = 200 * 1024 * 1024; // 200 MB

const StepSix: FC<StepSixProps> = ({ setCurrentStep }) => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const { token, public_key, user } = useSelector((state: any) => state.user);

  const payload = {
    token,
    app_id: id,
    user_id: user?._id,
    public_key,
  };

  const { data, status } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(payload),
  });

  const app = data?.data?.data;
  const variableData: Variable[] = app?.variables;

  const [variables, setVariables] = useState<Variable[]>(variableData);

  const addVariable = () => {
    setVariables([...variables, { key: "", type: "", description: "" }]);
  };

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

      <div className="px-7 pt-5">
        <div className="grid gap-10">
          <div>
            <Label className="font-lg font-semibold" htmlFor="description">
              App Logo
            </Label>

            <div
              {...getRootProps()}
              className="mt-3 flex gap-6 items-center justify-center py-5 w-full border-2 border-grey-800/20 border-dashed rounded-2xl"
            >
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
                    // disabled={status === "pending"}
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
          </div>

          <div className="flex-1">
            <Label className="font-lg font-semibold" htmlFor="description">
              App Description
            </Label>

            <Textarea
              className="mt-3"
              id="description"
              placeholder="Tell us about your app"
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
              <Button className="font-semibold text-xs bg-white text-grey px-7 rounded border border-grey-300">
                Save
              </Button>
              <Button
                onClick={() => setCurrentStep(5)}
                className="font-semibold text-xs bg-primary text-white h-8 px-7 rounded"
              >
                Finish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSix;
