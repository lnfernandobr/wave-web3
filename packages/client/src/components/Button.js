import React from "react";

export const Button = ({ children, icon, className, ...rest }) => {
  return (
    <button
      type="button"
      className={`text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 ${className}`}
      {...rest}
    >
      {icon && icon}
      {children}
    </button>
  );
};
