import React, { FC } from 'react';
import Header from './Header';
import Tabs from './Tabs';

interface Props {
  children: React.ReactNode;
  activeTab: string;
}

const Dashboard_layout: FC<Props> = ({ children, activeTab = 'Dashboard' }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full">
        <Header />
        <Tabs activeTab={activeTab} />
      </div>

      <div className="bg-[#F7F8FA] mt-36">{children}</div>
    </>
  );
};

export default Dashboard_layout;
