import React from "react";
import { useRouter } from "next/router";

const EventItem = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/apps/events/details")}
      className="border rounded bg-white h-[110px] flex items-center px-7 justify-between cursor-pointer"
    >
      <div>
        <p className="font-bold text-lg">Account Created</p>
        <p className="text-sm text-[#979797;]">
          React when an account gets created successfully
        </p>
      </div>
      <div className="text-[#0846A6] border border-[#0846A6] text-xs px-[14px] py-1 bg-[#0846A6]/5  rounded-sm">
        ACCOUNT_CREATED
      </div>
      <p className="text-xs font-semibold">Registed</p>
      <p className="text-xs font-semibold underline">Production</p>
    </div>
  );
};

export default EventItem;
