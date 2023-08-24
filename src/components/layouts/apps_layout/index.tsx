import React, { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface AppsLayoutProps {
  children: React.ReactNode;
}

const AppsLayout: FC<AppsLayoutProps> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="w-screen fixed left-0 flex">
      <div className="w-[305px] bg-[#F9FAFC] pl-11 pt-8 border-r pb-40 border-t relative overflow-y-auto h-screen">
        <Image
          onClick={() => router.back()}
          src="/images/back-arrow.svg"
          width={24}
          height={24}
          alt="back-arrow"
        />

        <div className="flex items-center gap-3 mt-2">
          <Image
            src="/images/facebook.svg"
            width={24}
            height={24}
            alt="facebook"
          />
          <p className="text-[#232830] font-bold text-xl">Facebook</p>
        </div>

        <div className="mt-[35px]">
          <div className="flex mt-[35px] items-center">
            <span className="pr-3 text-[#979797] text-sm font-semibold">
              Management
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="mt-[27px]">
            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                My App
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                Getting started
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                Publish
              </Link>
            </div>
          </div>
        </div>


        <div className="mt-[35px]">
          <div className="flex mt-[35px] items-center">
            <span className="pr-3 text-[#979797] text-sm font-semibold">
              SETUP
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="mt-[27px]">
            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                Environments
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                Application Variables
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                Pricing
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                Actions
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                Events
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-[36px]">
              <Image
                src="/images/square-circles.svg"
                width={24}
                height={24}
                alt="square-circles"
              />
              <Link href="#" className="text-[#78797A] font-bold text-sm">
                Authentication
              </Link>
            </div>
          </div>
        </div>
      </div>




      <div className="flex-1 bg-[#F9FAFC] relative overflow-y-auto border-t h-screen">
        {children}
        <div className="h-48" />
      </div>
    </div>
  );
};

export default AppsLayout;
