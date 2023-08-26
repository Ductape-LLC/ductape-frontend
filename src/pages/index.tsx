import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { loginUser } from '../api/userClient';
import { login } from '../redux/slice/userSlice';
import {
  setWorkspaces,
  setDefaultWorkspace,
} from '../redux/slice/workspaceSlice';

interface FormValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values: FormValues, submitProps: any) => {
    try {
      submitProps.setSubmitting(false);
      setLoading(true);
      toast.loading('Loading...');
      const response = await loginUser(values);
      if (response.status === 201) {
        setLoading(false);
        const { _id, firstname, lastname, email, active } = response.data.data;
        const data = {
          user: { _id, firstname, lastname, email, active },
          token: response.data.data.auth_token,
          public_key: response.data.data.public_key,
        };
        const workspaces = response.data.data.workspaces;
        const workspace = workspaces.find(
          (workspace: any) => workspace.default === true
        );
        dispatch(setWorkspaces(workspaces));
        dispatch(setDefaultWorkspace(workspace));
        dispatch(login(data));
        toast.success('Login successful');
        router.push('/dashboard');
      }
      setLoading(false);
      submitProps.resetForm();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="h-screen bg-[#F9FAFC] py-8 pr-[21px] flex">
      <div className="pt-20 w-[30%] mx-[55px]">
        <Image src="/images/logo.png" width={129} height={44} alt="logo" />

        <div className="max-w-[450px] mt-[68px]">
          <h1 className={`font-bold text-2xl text-[#232830]`}>
            Automate your Integrations
          </h1>
          <p className="text-[#232830]">Continue to your profile</p>
          <form className="mt-[71px]">
            <div>
              <Input
                type="text"
                placeholder="Email"
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                onChange={formik.handleChange('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-xs mt-1 text-error">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mt-[32px]">
              <Input
                type="password"
                placeholder="Password"
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                onChange={formik.handleChange('password')}
              />
              <div className="flex justify-between w-full mt-1 items-center">
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-xs mt-1 text-error">
                    {formik.errors.password}
                  </p>
                ) : null}
                <Link
                  href="/auth/forgot-password"
                  className={`font-bold text-primary flex-1 text-right`}
                >
                  Forgot your Password?
                </Link>
              </div>
            </div>
            <div className="mt-[52px]">
              <Button
                disabled={!formik.isValid || !formik.dirty || loading}
                type="submit"
                onClick={() => formik.handleSubmit()}
              >
                Continue
              </Button>
            </div>
          </form>
          <p className="text-[#232830] mt-[97px] text-center">
            New to Ductape?{' '}
            <Link
              href="/auth/signup"
              className="font-bold underline text-primary"
            >
              Create an account
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
