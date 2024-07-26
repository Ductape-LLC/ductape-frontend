import React, { FC } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleBoxes } from "../../svgs";
import { useSelector } from "react-redux";
import { fetchApp } from "@/api/appsClient";
import { useQuery } from "@tanstack/react-query";

interface AppsLayoutProps {
  children: React.ReactNode;
  activeAppTab: string;
  id: string;
}

export default function AppsLayout({
  children,
  activeAppTab = "Get Started",
  id,
}: AppsLayoutProps) {
  const router = useRouter();
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

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  const app = data?.data?.data;

  return (
    <div className="w-screen fixed left-0 flex">
      <div className="w-[305px] bg-[#F9FAFC] pt-8 border-r pb-40 border-t relative overflow-y-auto h-screen">
        <div className="pl-11">
          <Image
            onClick={() => router.back()}
            src="/images/back-arrow.svg"
            width={24}
            height={24}
            alt="back-arrow"
          />
        </div>

        <div className="flex items-center gap-3 mt-2 pl-11">
          <Image
            src="/images/facebook.svg"
            width={24}
            height={24}
            alt="facebook"
          />
          <p className="text-grey font-bold text-xl">{app?.app_name}</p>
        </div>

        <div className="mt-9">
          <div className="flex mt-8 items-center pl-11">
            <span className="pr-3 text-[#979797] text-sm font-semibold">
              Management
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="mt-7">
            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px]  ${
                activeAppTab === "My App"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={activeAppTab === "My App" ? "#0846A6" : "#78797A"}
                height={24}
                width={24}
              />
              <Link href={`/apps/${app._id}`} className="font-bold text-sm">
                Dashboard
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 rounded-r-[10px] mr-10 ${
                activeAppTab === "Get Started"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={activeAppTab === "Get Started" ? "#0846A6" : "#78797A"}
                height={24}
                width={24}
              />
              <Link
                href={`/apps/${app._id}/get-started`}
                className="font-bold text-sm"
              >
                Getting started
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                activeAppTab === "Pricing"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={activeAppTab === "Pricing" ? "#0846A6" : "#78797A"}
                height={24}
                width={24}
              />
              <Link
                href={`/apps/${app._id}/pricing`}
                className="font-bold text-sm"
              >
                Pricing
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                activeAppTab === "Publish"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={activeAppTab === "Publish" ? "#0846A6" : "#78797A"}
                height={24}
                width={24}
              />
              <Link
                href={`/apps/${app._id}/publish`}
                className="font-bold text-sm"
              >
                Publish
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex mt-9 items-center">
            <span className="pr-3 text-[#979797] text-sm font-semibold ml-11">
              VALUES
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="mt-7">
            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                activeAppTab === "Environments"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={activeAppTab === "Environments" ? "#0846A6" : "#78797A"}
                height={24}
                width={24}
              />
              <Link
                href={`/apps/${app._id}/environments`}
                className="font-bold text-sm"
              >
                Environments
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                activeAppTab === "Application Variable"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={
                  activeAppTab === "Application Variable"
                    ? "#0846A6"
                    : "#78797A"
                }
                height={24}
                width={24}
              />
              <Link
                href={`/apps/${app._id}/variables`}
                className="font-bold text-sm"
              >
                Variables
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                activeAppTab === "Application Constants"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={
                  activeAppTab === "Application Constants"
                    ? "#0846A6"
                    : "#78797A"
                }
                height={24}
                width={24}
              />
              <Link
                href={`/apps/${app._id}/constants`}
                className="font-bold text-sm"
              >
                Constants
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex mt-9 items-center">
            <span className="pr-3 text-[#979797] text-sm font-semibold ml-11">
              SETUP
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="mt-7">
            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                activeAppTab === "Actions"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={activeAppTab === "Actions" ? "#0846A6" : "#78797A"}
                height={24}
                width={24}
              />
              <Link href="#" className="font-bold text-sm">
                Actions
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                activeAppTab === "Events"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={activeAppTab === "Events" ? "#0846A6" : "#78797A"}
                height={24}
                width={24}
              />
              <Link href="/apps/events" className="font-bold text-sm">
                Events
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 mb-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                activeAppTab === "Authorizations"
                  ? "text-primary bg-[#E9ECF0]"
                  : "text-[#78797A]"
              }`}
            >
              <CircleBoxes
                color={
                  activeAppTab === "Authorizations" ? "#0846A6" : "#78797A"
                }
                height={24}
                width={24}
              />
              <Link href="/apps/authorizations" className="font-bold text-sm">
                Authorizations
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#F9FAFC] relative overflow-y-auto border-t h-screen">
        {children}
        <div className="h-48" />
      </div>
    </div>
  );
}
