import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../../components/common/Button';

export default function Home() {
  const router = useRouter();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleKeyDown = (event: any) => {
    if (event.key === 'Backspace') {
      const input = event.target;
      if (!input.value && input.previousElementSibling) {
        input.previousElementSibling.focus();
      }
    }
  };

  const handleInputChange = (event: any, nextInputRef: any) => {
    const input = event.target;
    const value = input.value;

    const allInputsFilled = inputRefs.every(
      (inputRef: any) => inputRef.current && inputRef.current.value
    );

    if (allInputsFilled) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }

    if (!nextInputRef) {
      return;
    }

    if (value && value.length === 1 && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent form submission
    const inputValues = inputRefs.map(
      (inputRef: any) => inputRef.current.value
    );
    console.log('Input values:', inputValues);
    // router.push('/auth/verify')
    alert('success');
  };

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
                className="border bg-white rounded-lg h-[41px] w-[41px] text-[#232830] text-sm pl-[15px]"
                maxLength={1}
                type="text"
                onChange={(e) => handleInputChange(e, inputRefs[1])}
                ref={inputRefs[0]}
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px] text-[#232830] text-sm pl-[15px]"
                maxLength={1}
                type="text"
                onChange={(e) => handleInputChange(e, inputRefs[2])}
                ref={inputRefs[1]}
                onKeyDown={handleKeyDown}
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px] text-[#232830] text-sm pl-[15px]"
                maxLength={1}
                type="text"
                onChange={(e) => handleInputChange(e, inputRefs[3])}
                ref={inputRefs[2]}
                onKeyDown={handleKeyDown}
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px] text-[#232830] text-sm pl-[15px]"
                maxLength={1}
                type="text"
                onChange={(e) => handleInputChange(e, inputRefs[4])}
                ref={inputRefs[3]}
                onKeyDown={handleKeyDown}
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px] text-[#232830] text-sm pl-[15px]"
                maxLength={1}
                type="text"
                onChange={(e) => handleInputChange(e, inputRefs[5])}
                ref={inputRefs[4]}
                onKeyDown={handleKeyDown}
              />
              <input
                className="border bg-white rounded-lg h-[41px] w-[41px] text-[#232830] text-sm pl-[15px]"
                maxLength={1}
                type="text"
                onChange={(e) => handleInputChange(e, inputRefs[6])}
                ref={inputRefs[5]}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="mt-[52px]">
              <Button
                disabled={disableSubmit}
                type="submit"
                onClick={handleSubmit}
              >
                Verify Code
              </Button>
            </div>
          </form>
          <p className="text-[#232830] mt-[77px] text-center">
            Resend Code in{' '}
            <Link href="#" className="font-bold text-primary">
              00:59
            </Link>
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
