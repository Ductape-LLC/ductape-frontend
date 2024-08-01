import React, { FC, useState } from "react";
import Link from "next/link";
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

interface StepFiveProps {
  setCurrentStep: (currentStep: number) => void;
}

interface Variable {
  key: string;
  type: string;
  description: string;
}

const StepFive: FC<StepFiveProps> = ({ setCurrentStep }) => {
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

  return (
    <div className="border rounded bg-white">
      <div className="rounded-t border-b p-7">
        <div className="flex items-center gap-2">
          <div className="bg-primary px-3.5 py-2 text-white h-9 rounded font-semibold">
            Step 5 of 6
          </div>
          <p className="text-grey font-semibold text-lg">Setup Authorization</p>
        </div>

        <p className="text-grey-200 text-sm mt-5 font-semibold">
          Create and configure authorizations
        </p>
      </div>

      <div className="px-7 pt-5">
        <div className="pb-9 border-b">
          <p className="font-semibold text-grey">Select Authorization Type</p>
          <RadioGroup className="mt-4 gap-4" defaultValue="credential_access">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="credential_access"
                id="credential_access"
              />
              <Label htmlFor="credential_access">credential_access</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="token_access" id="token_access" />
              <Label htmlFor="token_access">token_access</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-5 grid gap-5">
          <div className="flex items-center gap-5">
            <Select>
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Select Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center w-1/2">
              <Input type="text" id="expiry" placeholder="Expiry" value="" />
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Input type="text" id="tag" placeholder="Tag" value="" />
            <Input
              type="text"
              id="authorization_flow"
              placeholder="Name of Authorization flow"
              value=""
            />
          </div>

          <Input
            type="text"
            id="description"
            placeholder="Description (Optional)"
            value=""
          />
        </div>

        <div className="flex justify-between items-center my-11">
          <Button
            className="font-semibold text-xs bg-white text-primary px-7 rounded border border-primary h-9"
            onClick={() => setCurrentStep(3)}
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
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
