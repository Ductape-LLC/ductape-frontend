"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "antd";
import { useMutation } from "@tanstack/react-query";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { registerUser } from "@/api/userClient";
import { routes } from "@/constants/routes";
import { ApiError } from "@/types/user.types";

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const signupSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Last name is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

export default function SignUp() {
  const router = useRouter();

  const { mutate, status } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created successfully, proceed to login");
      router.push(routes.LOGIN);
    },
    onError: (error: ApiError) => {
      toast.error(error.response.data.errors || "An error occurred");
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      const { confirmPassword, agreeToTerms, ...payload } = values;
      mutate(payload);
    },
  });

  return (
    <div className="min-h-screen bg-white-500 py-8 pr-5 flex">
      <div className="pt-20 w-[30%] mx-14">
        <Image src="/images/logo.svg" width={129} height={33} alt="logo" />

        <div className="max-w-[450px] mt-16">
          <h1 className="font-bold text-2xl text-grey">
            Long Live the Integrations
          </h1>
          <p className="mt-3 text-grey-900">Let’s get you setup</p>
          <form onSubmit={formik.handleSubmit} className="mt-12">
            <div>
              <Input
                type="text"
                placeholder="First Name"
                onBlur={formik.handleBlur("firstname")}
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <p className="text-xs mt-1 text-error">
                  {formik.errors.firstname}
                </p>
              ) : null}
            </div>
            <div className="mt-6">
              <Input
                type="text"
                placeholder="Last Name"
                onBlur={formik.handleBlur("lastname")}
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <p className="text-xs mt-1 text-error">
                  {formik.errors.lastname}
                </p>
              ) : null}
            </div>
            <div className="mt-6">
              <Input
                type="email"
                placeholder="Email Address"
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-xs mt-1 text-error">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mt-6">
              <Input
                type="password"
                placeholder="Password"
                onBlur={formik.handleBlur("password")}
                value={formik.values.password}
                onChange={formik.handleChange("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-xs mt-1 text-error">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <div className="mt-6">
              <Input
                type="password"
                placeholder="Confirm Password"
                onBlur={formik.handleBlur("confirmPassword")}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-xs mt-1 text-error">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col items-start">
              <Checkbox
                value={formik.values.agreeToTerms}
                name="agreeToTerms"
                onChange={(e: CheckboxChangeEvent) => {
                  formik.setFieldValue("agreeToTerms", e.target.checked);
                }}
                className="text-grey text-sm font-medium font-sans space-x-2"
              >
                By clicking the “Create Account” button, you agree to Ductape’s{" "}
                <span className="text-blue underline"> Term of Use </span>
                and <span className="text-blue underline"> Privacy Policy</span>
              </Checkbox>
              {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
                <p className="text-xs mt-1 text-error">
                  {formik.errors.agreeToTerms}
                </p>
              ) : null}
            </div>
            <div className="mt-[46px]">
              <Button type="submit" disabled={status === "pending"}>
                Create Account
              </Button>
            </div>
          </form>

          <div className="flex items-center mt-9">
            <hr className="flex-grow border-t border-grey-800 opacity-10" />
            <span className="px-3 text-grey-200 text-sm font-semibold">OR</span>
            <hr className="flex-grow border-t border-grey-800 opacity-10" />
          </div>

          <div className="flex gap-4 items-center mt-9">
            <button className="text-grey text-sm font-medium h-10 px-5 rounded bg-white border flex items-center justify-center gap-6 grow">
              <Image
                src="/images/google.svg"
                width={20}
                height={20}
                alt="google"
              />{" "}
              Continue with Google
            </button>
            <button className="h-10 px-5 rounded bg-white border">
              <Image
                src="/images/github.svg"
                width={20}
                height={20}
                alt="github"
              />
            </button>
            <button className="h-10 px-5 rounded bg-white border">
              <Image
                src="/images/linkedin.svg"
                width={20}
                height={20}
                alt="linkedin"
              />
            </button>
          </div>

          <p className="text-grey mt-24 text-center">
            Already have an account?{" "}
            <Link
              href={routes.LOGIN}
              className="font-bold underline text-primary"
            >
              Login
            </Link>
          </p>
        </div>
        <p className="absolute bottom-16 left-15 text-grey-200">
          © Ductape {new Date().getFullYear()}
        </p>
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
              ad litora torquent per conubia nostra, per inceptos himenaeos.{" "}
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
              ad litora torquent per conubia nostra, per inceptos himenaeos.{" "}
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
              ad litora torquent per conubia nostra, per inceptos himenaeos.{" "}
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
