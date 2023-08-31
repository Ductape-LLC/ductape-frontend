import React, { FC, InputHTMLAttributes } from 'react';

interface ExtendedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const ExtendedInput: FC<ExtendedInputProps> = ({
  className,
  ...inputProps
}) => {
  return (
    <input
      className={`h-10 bg-white border rounded w-full p-3 text-sm text-[#232830] ${className}`}
      {...inputProps}
    />
  );
};

export default ExtendedInput;
