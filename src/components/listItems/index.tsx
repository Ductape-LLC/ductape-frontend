import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setApp } from "@/redux/slice/appSlice";
import { Components } from "@/types";

const ListItems = ({
  data,
  view,
  type,
}: {
  data: any;
  view: string;
  type: string;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const toType = (data: any) => {
    router.push(`/${type}/${data._id}`);
  };

  if (view === "list") {
    return (
      <div
        key={data._id}
        onClick={() => toType(data)}
        className="flex px-[36px] h-[110px] bg-white border text-[#232830] justify-between items-center rounded-[5px] mb-[25px]"
      >
        <div className="flex items-center gap-[25px]">
          <Image src="/images/google.svg" width={42} height={42} alt="google" />
          <div>
            <p className="font-bold text-xl text-[#232830]">
              {type === Components.APP ? data.app_name : data.name}
            </p>
            <p className="text-sm text-[#979797] mt-1">{data.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-[37px]">
          {type === Components.APP ? (
            <p className="font-semibold text-[#232830]">
              {data.actions.length} actions
            </p>
          ) : (
            <p className="font-semibold text-[#232830]">
              {data.features.length} features
            </p>
          )}
          <p className="font-semibold text-[#232830]">
            {data.envs.length} environaments
          </p>
        </div>

        <div
          className={`${
            data.active
              ? "text-[#00875A] bg-[#00875A] border-[#00875A] border-[0.5px]"
              : "text-[#DC3444] bg-[#DC3444] border-[#DC3444] border-[0.5px]"
          } bg-opacity-[15%] border text-xs px-[14px] py-1 rounded-sm`}
        >
          {data.active ? "Active" : "Inactive"}
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={data._id}
        onClick={() => toType(data)}
        className="bg-white border text-[#232830] items-center rounded-[5px] mb-[25px] flex-1"
      >
        <div className="px-9 pt-5 pb-6 flex items-center justify-between w-full border-b">
          <div className="flex items-center gap-[25px]">
            <Image
              src="/images/google.svg"
              width={42}
              height={42}
              alt="google"
            />
            <div>
              <p className="font-bold text-xl text-[#232830]">
                {type === Components.APP ? data.app_name : data.name}
              </p>
              <p className="text-sm text-[#979797] mt-1">{data.status}</p>
            </div>
          </div>
          <div
            className={`${
              data.active
                ? "text-[#00875A] bg-[#00875A] border-[#00875A] border-[0.5px]"
                : "text-[#DC3444] bg-[#DC3444] border-[#DC3444] border-[0.5px]"
            } bg-opacity-[15%] border text-xs px-[14px] py-1 rounded-sm`}
          >
            {data.active ? "Active" : "Inactive"}
          </div>
        </div>
        <div className="py-2 flex">
          <div className="w-1/2 h-10">
            <div className="border-r my-2 flex justify-center items-center">
              {type === Components.APP ? (
                <p className="font-semibold text-[#232830]">
                  {data.actions.length} actions
                </p>
              ) : (
                <p className="font-semibold text-[#232830]">
                  {data.features.length} features
                </p>
              )}
            </div>
          </div>
          <div className="w-1/2 my-2 flex justify-center items-center">
            <p className="font-semibold text-[#232830]">
              {data.envs.length} environments
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ListItems;
