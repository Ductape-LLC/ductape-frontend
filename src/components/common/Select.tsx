import React, { FC } from 'react';
import { Select } from 'antd';

const ExtendedSelect: FC<any> = ({ className, options, ...inputProps }) => {
  return (
    <div
      className={`w-full h-10 border rounded flex items-center ${className}`}
    >
      <Select
        style={{ width: '100%' }}
        bordered={false}
        options={options}
        {...inputProps}
      />
    </div>
  );
};

export default ExtendedSelect;
