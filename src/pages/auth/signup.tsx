import React from 'react';
import Image from 'next/image';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export default function SignUp() {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="bg-[#F9FAFC] py-8 pr-[21px] flex">
      <div className="pt-20 w-[30%] mx-[55px]">
        <Image src="/images/logo.png" width={129} height={44} alt="logo" />

        <div className="max-w-[450px] mt-[68px]">
          <h1 className={`font-bold text-2xl text-[#232830]`}>
            Long Live the Integrations
          </h1>
          <p className="text-[#232830]">Let’s get you setup</p>
          <form className="mt-[51px]">
            <div>
              <Input type="text" placeholder="First Name" />
            </div>
            <div className="mt-6">
              <Input type="text" placeholder="Last Name" />
            </div>
            <div className="mt-6">
              <Input type="text" placeholder="Email Address" />
            </div>
            <div className="mt-6">
              <Input type="text" placeholder="Password" />
            </div>
            <div className="mt-6">
              <Input type="text" placeholder="Confirm Password" />
            </div>

            <div className="mt-6">
              <Checkbox onChange={onChange}>
                <p className="text-sm font-medium">
                  By clicking the “Create Account” button, you agree to
                  Ductape’s{' '}
                  <span className="text-[#0052CC] underline">
                    {' '}
                    Term of Use{' '}
                  </span>
                  and{' '}
                  <span className="text-[#0052CC] underline">
                    {' '}
                    Privacy Policy
                  </span>
                </p>
              </Checkbox>
            </div>
            <div className="mt-[46px]">
              <Button disabled type="submit">
                Create Account
              </Button>
            </div>
          </form>

          <div className="flex items-center mt-[35px]">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex justify-between items-center mt-[35px]">
            <button className="text-[#232830] font-sm font-medium h-[41px] px-[21px] rounded bg-white border flex items-center gap-4">
              <Image
                src="/images/google.svg"
                width={20}
                height={20}
                alt="google"
              />{' '}
              continue with google
            </button>
            <button className="h-[41px] px-[21px] rounded bg-white border">
              <Image
                src="/images/github.svg"
                width={20}
                height={20}
                alt="github"
              />
            </button>
            <button className="h-[41px] px-[21px] rounded bg-white border">
              <Image
                src="/images/linkedin.svg"
                width={20}
                height={20}
                alt="linkedin"
              />
            </button>
          </div>

          <p className="text-[#232830] mt-[95px] text-center">
            Already have an account?{' '}
            <a href="../" className="font-bold underline text-primary">
              Login
            </a>
          </p>
        </div>
        {/* <p className="absolute bottom-16 left-15 text-[#979797]">
          © Ductape 2023
        </p> */}
      </div>

      <div className="pt-[93px] bg-white rounded-[10px] px-[51px] flex-1">
        <div className="flex items-start">
          <Image src="/images/star.svg" width={36} height={36} alt="start" />
          <div className="ml-[23px]">
            <h3 className="text-[#232830] font-bold text-[20px]">
              Selling Point Number 1
            </h3>
            <p className="text-[#232830] mt-[15px] max-w-[506px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              sed augue nec mi malesuada hendrerit. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.{' '}
            </p>
          </div>
        </div>

        <div className="flex items-start mt-[89px]">
          <Image src="/images/star.svg" width={36} height={36} alt="start" />
          <div className="ml-[23px]">
            <h3 className="text-[#232830] font-bold text-[20px]">
              Selling Point Number 1
            </h3>
            <p className="text-[#232830] mt-[15px] max-w-[506px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              sed augue nec mi malesuada hendrerit. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.{' '}
            </p>
          </div>
        </div>

        <div className="flex items-start mt-[89px]">
          <Image src="/images/star.svg" width={36} height={36} alt="start" />
          <div className="ml-[23px]">
            <h3 className="text-[#232830] font-bold text-[20px]">
              Selling Point Number 1
            </h3>
            <p className="text-[#232830] mt-[15px] max-w-[506px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              sed augue nec mi malesuada hendrerit. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.{' '}
            </p>
          </div>
        </div>

        <div className="absolute bottom-20 right-20 h-[60px] w-[60px] rounded-[30px] flex justify-center items-center shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]">
          <Image src="/images/bulb.svg" width={38} height={38} alt="bulb" />
        </div>
      </div>
    </div>
  );
}
