import React, { FC } from "react";
import { Select } from "antd";

interface CustomSelectProps {
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

const ExtendedSelect: FC<any> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  defaultValue,
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
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
};

export default ExtendedSelect;
