import * as React from 'react';

interface IconProps {
  color: string;
  height: number;
  width: number;
}

const CircleBoxes = ({ color, height, width, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 24}
    height={height || 24}
    fill="none"
    {...rest}
  >
    <path
      fill={color || '#0846A6'}
      fillRule="evenodd"
      d="M7 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10-2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-6 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm-6 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm12-4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
      clipRule="evenodd"
    />
  </svg>
);
export default CircleBoxes;
