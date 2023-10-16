import React, { FC } from "react";
import { Select } from "antd";

interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ExtendedSelect: FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  ...props
}) => {
  return (
    <div
      className={`w-full h-10 border rounded flex items-center ${className}`}
    >
      <Select
        style={{ width: "100%" }}
        bordered={false}
        options={options}
        value={value || undefined}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default ExtendedSelect;
