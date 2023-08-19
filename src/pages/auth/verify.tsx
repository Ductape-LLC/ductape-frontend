import React from 'react';
import Image from 'next/image';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Home() {
  return (
    <div className="h-screen bg-[#F9FAFC] py-8 pr-[21px] flex">
      <div className="pt-20 w-[30%] mx-[55px]">
        <Image src="/images/logo.png" width={129} height={44} alt="logo" />

        <div className="max-w-[450px] mt-[68px]">
          <h1 className={`font-bold text-2xl text-[#232830]`}>
            Verify it’s you
          </h1>
          <p className="text-[#232830]">
            We sent a six-digit pin to your email. Enter it in the field below
          </p>
          <form className="mt-[71px]">
            <div className="flex justify-between gap-[30px]">
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px]"
                type="text"
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px]"
                type="text"
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px]"
                type="text"
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px]"
                type="text"
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px]"
                type="text"
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px]"
                type="text"
              />
            </div>

            <div className="mt-[52px]">
              <Button disabled type="submit">
                Verify Code
              </Button>
            </div>
          </form>
          <p className="text-[#232830] mt-[77px] text-center">
            Resend Code in{' '}
            <a href="#" className="font-bold text-primary">
              00:59
            </a>
          </p>
        </div>
        <p className="absolute bottom-16 left-15 text-[#979797]">
          © Ductape 2023
        </p>
      </div>

      <div className="pt-[93px] bg-white rounded-[10px] px-[51px] flex-1">
        <p className="text-[#232830] font-bold text-2xl max-w-[651px]">
          “Few things make me feel more powerful than setting up automations in
          Ductape to make my life easier and more efficient.”
        </p>

        <div className="flex justify-between items-center mt-[68px]">
          <div>
            <p className="text-[#232830] text-[20px] font-bold">
              -Fikayo Sanni
            </p>
            <p className="font-medium text-[#979797]">
              Co-Founder Startupia LLC
            </p>
          </div>
          <div>
            <Image
              src="/images/stars.png"
              width={100}
              height={20}
              alt="stars"
            />
          </div>
        </div>

        <div className="absolute bottom-20 right-20 h-[60px] w-[60px] rounded-[30px] flex justify-center items-center shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]">
          <Image src="/images/bulb.svg" width={38} height={38} alt="bulb" />
        </div>
      </div>
    </div>
  );
}
