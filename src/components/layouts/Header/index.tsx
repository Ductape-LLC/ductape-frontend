/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Select, Button, Avatar } from "antd";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/userSlice";
import { PlusOutlined } from "@ant-design/icons";
import {
  setWorkspaceStats,
  setShowCreateWorkspaceModal,
  setDefaultWorkspace,
} from "@/redux/slice/workspaceSlice";
import {
  fetchWorkspaceStats,
  changeDefaultWorkspace,
} from "@/api/workspaceClient";
import toast from "react-hot-toast";
import { ChevronDownIc } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const { Option } = Select;

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const { workspaces, defaultWorkspace } = useSelector(
    (state: any) => state.workspace
  );
  const [loading, setLoading] = useState(false);

  const getWorkSpaceStats = async (workspaceId: string) => {
    try {
      const response = await fetchWorkspaceStats(
        token,
        workspaceId,
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

  const ChangeDefaultWorkspace = async (workspaceId: string) => {
    console.log(workspaceId);
    try {
      setLoading(true);
      const response = await changeDefaultWorkspace(
        token,
        user._id,
        workspaceId,
        public_key
      );
      if (response.status === 200) {
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const handleChangeDefaultWorkspace = async (workspace: any) => {
    await getWorkSpaceStats(workspace.workspace_id);
    await ChangeDefaultWorkspace(workspace.workspace_id);
    await dispatch(setDefaultWorkspace(workspace));
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    workspaces.forEach((workspace: any) => {
      if (workspace.workspace_id === value) {
        handleChangeDefaultWorkspace(workspace);
      }
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    if (!defaultWorkspace) {
      return;
    }
    getWorkSpaceStats(defaultWorkspace.workspace_id);
  }, [defaultWorkspace]);

  return (
    <div className="h-[89px] flex bg-white px-11 items-center border-b justify-between">
      <div className="flex items-center">
        <Image src="/images/logo.svg" width={148} height={38} alt="logo" />

        <Select
          defaultValue={defaultWorkspace?.workspace_name}
          suffixIcon={<ChevronDownIc />}
          // onChange={handleChange}
          style={{ width: 180 }}
          className="ml-36 h-9"
          dropdownStyle={{ minWidth: 180 }}
          onChange={handleChange}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <div
                className="flex items-center justify-between px-1 py-2 cursor-pointer"
                onClick={() => dispatch(setShowCreateWorkspaceModal(true))}
              >
                <p className="text-primary flex items-center gap-2 text-sm">
                  <PlusOutlined />
                  Add a new workspace
                </p>
              </div>
            </div>
          )}
        >
          {workspaces.map((workspace: any) => (
            <Option
              key={workspace.workspace_id}
              value={workspace.workspace_id}
              className="flex items-center"
            >
              {workspace.workspace_name && (
                <Avatar size={24} shape="square" className="mr-2">
                  <p className="text-sm">
                    {workspace.workspace_name.charAt(0).toUpperCase()}
                  </p>
                </Avatar>
              )}

              {workspace.workspace_name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="flex items-center gap-16">
        <div className="flex items-center gap-9">
          <Link href="" className="text-grey font-semibold">
            Docs
          </Link>
          <Link href="" className="text-grey font-semibold">
            Support
          </Link>
        </div>
        <Image src="/images/Bell.svg" width={32} height={32} alt="bell" />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-5 bg-primary text-white font-semibold px-5 h-9 items-center rounded shadow-[2px_4px_16px_4px_hsla(0,0%,0%,0.25)] outline outline-1 outline-primary">
            <Image src="/images/user.svg" height={20} width={20} alt="user" />
            <span>
              {`${user?.firstname} ${user?.lastname.charAt().toUpperCase()}.`}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[136px]">
            <DropdownMenuItem className="font-medium" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
