import { InputHTMLAttributes } from "react";

interface ExtendedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function ExtendedInput({
  className = "",
  ...inputProps
}: ExtendedInputProps) {
  return (
    <input
      className={`h-10 bg-white border rounded w-full p-3 text-sm text-grey ${className}`}
      {...inputProps}
    />
  );
}
