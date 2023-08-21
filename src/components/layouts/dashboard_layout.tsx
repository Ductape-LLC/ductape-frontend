import React, { FC } from 'react';
import Header from './Header';
import Tabs from './Tabs';

interface Props {
  children: React.ReactNode;
  activeTab: string;
}

const Dashboard_layout:FC<Props> = ({ children, activeTab='Dashboard' }) => {
  return (
    <>
      <Header />
      <Tabs activeTab={activeTab} />
      <div className="min-h-screen bg-[#F7F8FA]">{children}</div>
    </>
  );
};

export default Dashboard_layout;
