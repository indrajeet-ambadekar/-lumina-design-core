import React from "react";
import "./index.scss";
export default ({ ...props }) => {
  let index = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  if (props.name === null || props.name === undefined) {
    throw new Error(`'name' is a mandatory attribute for radio button`);
  }
  if (props.value === null || props.value === undefined) {
    throw new Error(`'value' is a mandatory attribute for radio button`);
  }
  if (typeof props.onChange !== "function") {
    throw new Error(
      `'onChange' is a mandatory attribute for radio button and it needs to be a function`
    );
  }
  return (
    <div
      className={[
        "lumina-radio-button",
        props.className || "",
        props.disabled ? "lumina-radio-button-disabled" : ""
      ].join(" ")}
    >
      <input
        type="radio"
        id={`lumina-radio-${index}`}
        name={props.name}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        className="lumina-radio-input"
        onChange={(e) => props.onChange(e.target.value)}
        {...(props.tabIndex !== undefined && { tabIndex: props.tabIndex })}
      />
      <label htmlFor={`lumina-radio-${index}`} className="lumina-radio-label">
        {props.label || ""}
      </label>
    </div>
  );
};
