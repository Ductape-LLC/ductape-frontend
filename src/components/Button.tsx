import React from 'react';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ disabled, children, ...props }) => {
  return (
    <button className={`${disabled?'bg-[#D9D9D9]':'bg-primary'} h-10 w-full text-white rounded text-sm`} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
