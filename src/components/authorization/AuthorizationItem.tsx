import React from "react";
import { useRouter } from "next/navigation";

export default function AuthorizationItem({
  id,
  authorizationId,
}: {
  id: string;
  authorizationId: string;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/apps/${id}/authorizations/${authorizationId}`)
      }
      className="border rounded bg-white h-[110px] flex items-center px-7 justify-between cursor-pointer"
    >
      <p className="font-bold text-lg">For Examples</p>
      <div className="text-[#0846A6] border border-[#0846A6] text-xs px-[14px] py-1 bg-[#0846A6]/5  rounded-sm">
        Permernent Tokens
      </div>
      <p className="text-xs font-semibold underline">Production Sandbox</p>
    </div>
  );
}
