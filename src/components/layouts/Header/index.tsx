/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Select, Button, Avatar } from 'antd';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slice/userSlice';
import { PlusOutlined } from '@ant-design/icons';
import {
  setWorkspaceStats,
  setShowCreateWorkspaceModal,
} from '@/redux/slice/workspaceSlice';
import { fetchWorkspaceStats } from '@/api/workspaceClient';
import toast from 'react-hot-toast';

const { Option } = Select;

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const { workspaces, defaultWorkspace } = useSelector(
    (state: any) => state.workspace
  );
  const [loading, setLoading] = useState(false);

  const getWorkSpaceStats = async () => {
    try {
      const response = await fetchWorkspaceStats(
        token,
        defaultWorkspace._id,
        public_key
      );

      if (response.status === 200) {
        const { apps, integrations, inbound_requests, outbound_requests } =
          response.data.data;
        dispatch(
          setWorkspaceStats({
            apps,
            integrations,
            inbound_requests,
            outbound_requests,
          })
        );
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const workspacesOptions = useMemo(() => {
    return workspaces.map((workspace: any) => ({
      value: workspace.workspace_id,
      label: workspace.workspace_name,
    }));
  }, [workspaces]);

  useEffect(() => {
    getWorkSpaceStats();
  }, [defaultWorkspace]);

  return (
    <div className="h-[89px] flex bg-white px-11 items-center border-b justify-between">
      <div className="flex items-center">
        <Image src="/images/logo.svg" width={148} height={38} alt="logo" />

        <Select
          defaultValue={defaultWorkspace?.workspace_name}
          style={{ width: 180 }}
          className="ml-[147px]"
          dropdownStyle={{ minWidth: 180 }}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <div
                className="flex items-center justify-between px-1 py-2 cursor-pointer"
                onClick={() => dispatch(setShowCreateWorkspaceModal(true))}
              >
                <p className="text-[#0846A6] flex items-center gap-2 text-sm">
                  <PlusOutlined />
                  Add a new workspace
                </p>
              </div>
            </div>
          )}
        >
          {workspacesOptions.map((workspace: any) => (
            <Option
              key={workspace.value}
              value={workspace.value}
              className="flex items-center"
            >
              <Avatar size={30} shape="square" className="mr-2">
                {workspace.label.charAt(0).toUpperCase()}
              </Avatar>{' '}
              {workspace.label}
            </Option>
          ))}
        </Select>
      </div>

      <div className="flex items-center gap-8">
        <Link href="" className="text-[#232830] font-semibold">
          Doc
        </Link>
        <Link href="" className="text-[#232830] font-semibold">
          Support
        </Link>
        <Image src="/images/Bell.svg" width={32} height={32} alt="bell" />
        <Button
          icon={
            <Image src="/images/user.svg" height={20} width={20} alt="user" />
          }
          className="bg-[#0846A6] text-white font-semibold flex items-center outline-none"
          onClick={handleLogout}
        >
          {`${user?.firstname} . ${user?.lastname.charAt().toUpperCase()}`}
        </Button>
      </div>
    </div>
  );
};

export default Header;
