import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Select, Button } from 'antd';

const Header = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="h-[89px] flex bg-white px-11 items-center border-b justify-between">
      <div className="flex items-center">
        <Image src="/images/logo.svg" width={148} height={38} alt="logo" />

        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          className="ml-[147px]"
          onChange={handleChange}
          options={[
            { value: 'textApp', label: 'textApp' },
            { value: 'Sigma', label: 'Sigma' },
            { value: 'SwiftMoney', label: 'SwiftMoney' },
          ]}
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
        >
          Fikayo S.
        </Button>
      </div>
    </div>
  );
};

export default Header;
