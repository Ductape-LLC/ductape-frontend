import React, { FC, InputHTMLAttributes } from 'react';

interface ExtendedInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const ExtendedInput: FC<ExtendedInputProps> = ({ ...inputProps }) => {
  return (
    <input
      className="h-10 bg-white border rounded w-full p-3 text-sm"
      {...inputProps}
    />
  );
};

export default ExtendedInput;
