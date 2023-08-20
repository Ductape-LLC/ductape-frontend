import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface FormValues {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const resetPasswordSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is Required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Home() {
  const router = useRouter();
  const handleSubmit = (values: FormValues, submitProps: any) => {
    submitProps.setSubmitting(false);
    submitProps.resetForm();
    // router.push('/')
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="h-screen bg-[#F9FAFC] py-8 pr-[21px] flex">
      <div className="pt-20 w-[30%] mx-[55px]">
        <Image src="/images/logo.png" width={129} height={44} alt="logo" />

        <div className="max-w-[450px] mt-[68px]">
          <h1 className={`font-bold text-2xl text-[#232830]`}>
            Create New Password
          </h1>
          <form className="mt-[71px]">
            <div>
              <Input
                type="text"
                placeholder="Enter OTP"
                onBlur={formik.handleBlur('otp')}
                value={formik.values.otp}
                onChange={formik.handleChange('otp')}
              />
              {formik.touched.otp && formik.errors.otp ? (
                <p className="text-xs mt-1 text-error">{formik.errors.otp}</p>
              ) : null}
            </div>
            <div className="mt-[32px]">
              <Input
                type="text"
                placeholder="New Password"
                onBlur={formik.handleBlur('newPassword')}
                value={formik.values.newPassword}
                onChange={formik.handleChange('newPassword')}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <p className="text-xs mt-1 text-error">
                  {formik.errors.newPassword}
                </p>
              ) : null}
            </div>
            <div className="mt-[32px]">
              <Input
                type="text"
                placeholder="Confirm Password"
                onBlur={formik.handleBlur('confirmPassword')}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange('confirmPassword')}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-xs mt-1 text-error">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <div className="mt-[52px]">
              <Button
                disabled={!formik.isValid || !formik.dirty}
                type="submit"
                onClick={() => formik.handleSubmit()}
              >
                Update password
              </Button>
            </div>
          </form>
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
