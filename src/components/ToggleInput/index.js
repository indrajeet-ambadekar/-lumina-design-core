import React from "react";
import "./index.scss";
const ToggleInput = ({
  id,
  name,
  checked,
  onChange,
  disabled,
  className,
  tabIndex
}) => {
  if (name === null || name === undefined) {
    throw new Error("`name` is a required field for switch");
  }
  if (checked === null || checked === undefined) {
    throw new Error("`checked` is a required field for switch");
  }
  return (
    <input
      className={["lumina-toggle-input", className || ""].join(" ")}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      name={name}
      id={id || null}
      {...(tabIndex !== undefined && { tabIndex: tabIndex })}
    ></input>
  );
};

export default ToggleInput;
