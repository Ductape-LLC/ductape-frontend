import React, { FC } from 'react';

interface AppsLayoutProps {
  children: React.ReactNode;
}

const AppsLayout: FC<AppsLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen flex">
      <div className="w-[305px] min-h-screen bg-slate-700"></div>
      <div className="flex-1 bg-red-500"></div>
    </div>
  );
};

export default AppsLayout;
