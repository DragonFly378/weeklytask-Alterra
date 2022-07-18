import React from "react";
import "./button.scss";

const Button = ({
  title,
  color,
  background,
  type,
  className,
  onClick,
  iconKanan,
  iconKiri,
}) => {
  return (
    <button
      type={type}
      className={className}
      style={{ backgroundColor: background, color: color }}
      onClick={onClick}
    >
      <div className="d-flex">
        <i className={iconKiri}></i>
        <p
          style={{
            marginBottom: "0px",
          }}
        >
          {title}
        </p>
        <i className={iconKanan}></i>
      </div>
    </button>
  );
};

export default Button;
