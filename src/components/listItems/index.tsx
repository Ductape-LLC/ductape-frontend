import Link from "next/link";
import Image from "next/image";
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
  if (view === "list") {
    return (
      <Link
        href={`/${type}/${data._id}`}
        key={data._id}
        className="flex px-9 h-[110px] bg-white border text-grey justify-between items-center rounded-[5px] hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-6">
          <Image src="/images/google.svg" width={42} height={42} alt="google" />
          <div>
            <p className="font-bold text-xl text-grey">
              {type === Components.APP ? data.app_name : data.name}
            </p>
            <p className="text-sm text-[#979797] mt-1">{data.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-[37px]">
          {type === Components.APP ? (
            <p className="font-semibold text-grey">
              {data.actions.length} actions
            </p>
          ) : (
            <p className="font-semibold text-grey">
              {data.features.length} features
            </p>
          )}
          <p className="font-semibold text-grey">
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
      </Link>
    );
  } else {
    return (
      <Link
        href={`/${type}/${data._id}`}
        key={data._id}
        className="block bg-white border text-grey items-center rounded-[5px] flex-1 hover:shadow-md transition-all"
      >
        <div className="px-9 pt-5 pb-6 flex items-center justify-between w-full border-b">
          <div className="flex items-center gap-6">
            <Image
              src="/images/google.svg"
              width={42}
              height={42}
              alt="google"
            />
            <div>
              <p className="font-bold text-xl text-grey">
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
                <p className="font-semibold text-grey">
                  {data.actions.length} actions
                </p>
              ) : (
                <p className="font-semibold text-grey">
                  {data.features.length} features
                </p>
              )}
            </div>
          </div>
          <div className="w-1/2 my-2 flex justify-center items-center">
            <p className="font-semibold text-grey">
              {data.envs.length} environments
            </p>
          </div>
        </div>
      </Link>
    );
  }
};

export default ListItems;
