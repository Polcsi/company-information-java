import React from "react";

interface BackgroundProps {
  children: React.ReactNode | React.ReactElement;
  className?: string;
}

const Background = ({ children, className = "" }: BackgroundProps) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Background;
