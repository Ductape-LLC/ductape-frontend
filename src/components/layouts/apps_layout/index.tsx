import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { CircleBoxes } from "../../svgs";
import { fetchApp } from "@/api/appsClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

  const app = data?.data?.data;

  const isNewApp = ["actions", "events", "constants", "variables"].every(
    (key) => !app?.[key] || app?.[key].length === 0
  );

  useEffect(() => {
    if (status === "success") {
      if (isNewApp) {
        router.push(`/apps/${app._id}/get-started`);
      }
    }
  }, [isNewApp, app?._id, router, status]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-screen fixed left-0 flex">
      <div className="w-[305px] bg-[#F9FAFC] pt-8 border-r pb-40 border-t relative overflow-y-auto h-screen">
        <Link href="/apps" className="pl-11 w-fit block">
          <Image
            src="/images/back-arrow.svg"
            width={24}
            height={24}
            alt="back-arrow"
          />
        </Link>

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
          {isNewApp && (
            <div>
              <div className="flex mt-8 items-center pl-11">
                <span className="pr-3 text-[#979797] text-sm font-semibold uppercase">
                  setup
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div
                className={`flex items-center gap-3 my-2 pl-11 py-2 rounded-r-[10px] mr-10 ${
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
                  Get started
                </Link>
              </div>
            </div>
          )}
        </div>

        {!isNewApp && (
          <>
            <div className="flex mt-8 items-center pl-11">
              <span className="pr-3 text-[#979797] text-sm font-semibold uppercase">
                Management
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="mt-7">
              <div
                className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
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
                className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
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
                className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
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

            <div className="mt-8">
              <div className="flex mt-9 items-center">
                <span className="pr-3 text-[#979797] text-sm font-semibold ml-11 uppercase">
                  VALUES
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <div className="mt-7">
                <div
                  className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                    activeAppTab === "Environments"
                      ? "text-primary bg-[#E9ECF0]"
                      : "text-[#78797A]"
                  }`}
                >
                  <CircleBoxes
                    color={
                      activeAppTab === "Environments" ? "#0846A6" : "#78797A"
                    }
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
                  className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
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
                    Application Variables
                  </Link>
                </div>

                <div
                  className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
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
                    Application Constants
                  </Link>
                </div>

                <div
                  className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
                    activeAppTab === "Retry Policy"
                      ? "text-primary bg-[#E9ECF0]"
                      : "text-[#78797A]"
                  }`}
                >
                  <CircleBoxes
                    color={
                      activeAppTab === "Retry Policy" ? "#0846A6" : "#78797A"
                    }
                    height={24}
                    width={24}
                  />
                  <Link
                    href={`/apps/${app._id}/constants`}
                    className="font-bold text-sm"
                  >
                    Retry Policy
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex mt-9 items-center">
                <span className="pr-3 text-[#979797] text-sm font-semibold ml-11 uppercase">
                  SETUP
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <div className="mt-7">
                <div
                  className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
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
                  className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
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
                  className={`flex items-center gap-3 my-2 pl-11 py-2 mr-10 rounded-r-[10px] ${
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
                  <Link
                    href="/apps/authorizations"
                    className="font-bold text-sm"
                  >
                    Authorizations
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 bg-[#F9FAFC] relative overflow-y-auto border-t h-screen">
        {children}
        <div className="h-48" />
      </div>
    </div>
  );
}
