import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', children, className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded font-semibold focus:outline-none focus:ring';
  const variantClasses = variant === 'outline'
    ? 'border border-gray-500 text-gray-700 hover:bg-gray-100'
    : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
