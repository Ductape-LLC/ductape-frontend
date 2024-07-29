import React, { FC } from "react";
import Link from "next/link";

interface TabInteface {
  label: string;
  href: string;
}

const TabItems: TabInteface[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Apps",
    href: "/apps",
  },
  {
    label: "Integrations",
    href: "/integrations",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Partners",
    href: "/partners",
  },
  {
    label: "Teams",
    href: "/teams",
  },
  {
    label: "Tokens",
    href: "/tokens",
  },
  {
    label: "Activity",
    href: "/activity",
  },
  {
    label: "Billings",
    href: "/billings",
  },
];

const LayoutTabs: FC<{ activeTab: string }> = ({ activeTab }) => {
  return (
    <div className="px-11 border-b bg-white w-full gap-4 flex">
      {TabItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`text-grey pb-3 pt-4 font-semibold px-3 ${
            activeTab === item.label
              ? "border-b-[4px] border-b-primary rounded-tl-[1px] rounded-tr-[1px] text-primary"
              : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default LayoutTabs;
