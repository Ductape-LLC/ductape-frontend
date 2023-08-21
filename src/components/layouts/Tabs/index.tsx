import Link from 'next/link';
import React, { FC } from 'react';

interface TabInteface {
  label: string;
  href: string;
}

const TabItems: TabInteface[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'App',
    href: '/dashboard',
  },
  {
    label: 'Integrations',
    href: '/dashboard',
  },
  {
    label: 'Marketplace',
    href: '/marketplace',
  },
  {
    label: 'Partners',
    href: '/partners',
  },
  {
    label: 'Teams',
    href: '/teams',
  },
  {
    label: 'Tokens',
    href: '/tokens',
  },
  {
    label: 'Activity',
    href: '/activity',
  },
  {
    label: 'Billings',
    href: '/billings',
  },
];

const LayoutTabs: FC<{ activeTab: string }> = ({ activeTab }) => {
  return (
    <div className="px-11 border-b bg-white w-full gap-[18px] flex">
      {TabItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`text-[#232830] pb-[13px] pt-[18px] font-semibold text-[15px] px-3 ${
            activeTab === item.label
              ? 'border-b-[4px] border-b-primary rounded-tl-[1px] rounded-tr-[1px] text-primary'
              : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default LayoutTabs;
