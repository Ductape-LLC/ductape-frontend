/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from './Header';
import Tabs from './Tabs';

interface Props {
  children: React.ReactNode;
  activeTab: string;
  subTab?: string;
}

const Dashboard_layout: FC<Props> = ({ children, activeTab = 'Dashboard' }) => {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);

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
