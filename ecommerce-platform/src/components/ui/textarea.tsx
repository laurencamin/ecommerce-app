import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';



