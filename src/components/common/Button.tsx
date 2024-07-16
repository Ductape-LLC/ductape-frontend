import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function CustomButton({
  disabled,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={`${
        disabled ? "bg-grey-300" : "bg-primary"
      } h-10 w-full text-white rounded text-sm font-bold`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
