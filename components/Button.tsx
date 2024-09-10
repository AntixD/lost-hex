import React from "react";

interface ButtonProps {
  title: string;
  variant: "one" | "two";
}

const Button: React.FC<ButtonProps> = ({ title, variant }) => {
  const followButtonStyles = `
    body-bold bg-tertiary rounded-[100px] px-4 py-2 transition-all duration-500 ease-in-out relative overflow-hidden
  `;

  const followHoverStyles = `
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#FF0073] before:via-[#811AB8] before:to-[#4426D9]
    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:z-0
  `;

  const textStyles = `
    relative z-10
  `;

  const messageButtonStyles = `
    border border-tertiary text-tertiary px-4 py-1 rounded-full hover:border-hoverTertiary hover:text-hoverTertiary transition
  `;

  const buttonStyles =
    variant === "one"
      ? `${followButtonStyles} ${followHoverStyles}`
      : messageButtonStyles;

  return (
    <button className={buttonStyles}>
      <span className={textStyles}>{title}</span>
    </button>
  );
};

export default Button;
