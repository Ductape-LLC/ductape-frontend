"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Tabs from "./Tabs";

interface Props {
  children: React.ReactNode;
  activeTab: string;
  subTab?: string;
}

export default function DashboardLayout({
  children,
  activeTab = "Dashboard",
}: Props) {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: any) => state.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full">
        <Header />
        <Tabs activeTab={activeTab} />
      </div>

      <div className="bg-[#F7F8FA] mt-36">{children}</div>
    </>
  );
}
