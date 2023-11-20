import React from "react";

type UIButtonProps = {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  gradient?: boolean;
};

const UIButton: React.FC<UIButtonProps> = ({
  onClick,
  disabled,
  children,
  gradient = false,
}) => {
  return (
    <button
      className={`font-bold py-2 px-4 rounded mx-2 ${
        disabled
          ? "font-medium rounded-lg text-sm px-5 py-2.5 bg-[#3D4D55] cursor-not-allowed text-gray-300"
          : gradient
            ? "text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            : "text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br shadow-lg  text-center"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default UIButton;
