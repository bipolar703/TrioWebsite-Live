import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
}