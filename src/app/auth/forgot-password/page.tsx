"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { forgotUser } from "@/api/userClient";
import { routes } from "@/constants/routes";
import { ApiError } from "@/types/user.types";

interface FormValues {
  email: string;
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

export default function ForgotPassword() {
  const router = useRouter();

  const { mutate, status } = useMutation({
    mutationFn: forgotUser,
    onSuccess: () => {
      toast.success("Password reset code sent successfully, check your email");
      router.push(
        `${routes.RESET_PASSWORD}?email=${encodeURIComponent(
          formik.values.email
        )}`
      );
    },
    onError: (error: ApiError) => {
      toast.error(error.response.data.errors || "An error occurred");
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="min-h-screen bg-white-500 py-8 pr-5 flex">
      <div className="pt-20 w-[30%] mx-14">
        <Image src="/images/logo.svg" width={129} height={33} alt="logo" />

        <div className="max-w-[450px] mt-16">
          <h1 className="font-bold text-2xl text-grey">Reset Password</h1>
          <p className="mt-3 text-grey-900">
            Enter your email address and we'll send you a code to reset your
            password
          </p>
          <form onSubmit={formik.handleSubmit} className="mt-18">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-xs mt-1 text-error">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mt-12">
              <Button disabled={status === "pending"} type="submit">
                Send code
              </Button>
            </div>
          </form>
          <Link
            href={routes.LOGIN}
            className="mt-24 block w-fit mx-auto text-grey font-medium underline"
          >
            Return to Login
          </Link>
        </div>
        <p className="absolute bottom-16 left-15 text-grey-200">
          © Ductape {new Date().getFullYear()}
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
