"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { loginUser } from "@/api/userClient";
import { login } from "@/redux/slice/userSlice";
import {
  setWorkspaces,
  setDefaultWorkspace,
} from "@/redux/slice/workspaceSlice";
import { routes } from "@/constants/routes";
import { ApiError, Workspace } from "@/types/user.types";

interface FormValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, status } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { _id, firstname, lastname, email, active } = response.data.data;
      const data = {
        user: { _id, firstname, lastname, email, active },
        token: response.data.data.auth_token,
        public_key: response.data.data.public_key,
      };
      const workspaces = response.data.data.workspaces;
      const workspace = workspaces.find(
        (workspace: Workspace) => workspace.default === true
      );
      dispatch(setWorkspaces(workspaces));
      dispatch(setDefaultWorkspace(workspace));
      dispatch(login(data));
      toast.success("Login successful");
      router.push(routes.DASHBOARD);
    },
    onError: (error: ApiError) => {
      toast.error(error.response.data.errors || "An error occurred");
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="min-h-screen bg-white-500 py-8 pr-5 flex">
      <div className="pt-20 w-[30%] mx-14">
        <Image src="/images/logo.svg" width={129} height={33} alt="logo" />

        <div className="max-w-[450px] mt-16">
          <h1 className="font-bold text-2xl text-grey">
            Automate your Integrations
          </h1>
          <p className="mt-3 text-grey-900">Continue to your profile</p>
          <form className="mt-18" onSubmit={formik.handleSubmit}>
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
            <div className="mt-8">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={
                      showPassword ? "/images/eye-off.svg" : "/images/eye.svg"
                    }
                    width={22}
                    height={22}
                    alt={showPassword ? "hide password" : "show password"}
                  />
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-xs mt-1 text-error">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <Link
              href="/auth/forgot-password"
              className="mt-3 font-bold text-primary text-right text-sm flex ml-auto w-fit"
            >
              Forgot your Password?
            </Link>
            <div className="mt-12">
              <Button disabled={status === "pending"} type="submit">
                Login
              </Button>
            </div>
          </form>
          <p className="mt-24 text-center">
            <span className="font-medium text-grey">New to Ductape? </span>
            <Link
              href={routes.SIGNUP}
              className="font-bold underline text-blue"
            >
              Create an account
            </Link>
          </p>
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
