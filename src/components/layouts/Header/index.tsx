import React, {useMemo} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Select, Button } from 'antd';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slice/userSlice';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { workspaces, defaultWorkspace } = useSelector((state: any) => state.workspace);

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


  return (
    <div className="h-[89px] flex bg-white px-11 items-center border-b justify-between">
      <div className="flex items-center">
        <Image src="/images/logo.svg" width={148} height={38} alt="logo" />

        <Select
          defaultValue={defaultWorkspace?.workspace_name}
          style={{ width: 120 }}
          className="ml-[147px]"
          onChange={handleChange}
          options={workspacesOptions}
        />
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
