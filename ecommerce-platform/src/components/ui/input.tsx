import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';



