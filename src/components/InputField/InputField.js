
import React, { useEffect, useRef, useState } from "react";
import "./InputField.scss"

export default ({ ...props }) => {
  var {
    onChange,
    value,
    placeholder,
    label,
    name,
    iconLeft,
    iconRight,
    className,
    type,
    textStyle
  } = props;
  const inputEl = useRef(null);
  let testId = props["data-testid"] || null;
  const [isFocused, setFocused] = useState(false);
  const [inputLabel, setValue] = useState(value || "");
  if (onChange === null || onChange === undefined) {
    onChange = function () {};
  }
  useEffect(() => {
    if (inputLabel !== value) onChange(inputLabel || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputLabel]);

  const _handleOnFocus = function (event) {
    setFocused(true);
    if (typeof props.onFocus === "function") {
      props.onFocus(event);
    }
  };
  const _handleOnBlur = (event) => {
    setFocused(false);
    if (typeof props.onBlur === "function") {
      props.onBlur(event);
    }
  };
  function _handleOnChange(value) {
    setValue(processByType(value, type || "text", textStyle || null));
    props.onChange(processByType(value, type || "text", textStyle || null));
  }
  return (
    <div
      className={[
        "lumina-input-wrapper",
        `${className || ""}`,
        `${props.disabled ? "disabled" : ""}`,
        isFocused ? "input-focused" : ""
      ].join(" ")}
    >
      {label && <label>{label}</label>}

      {iconLeft && (
        <span
          className={["lumina-input-icon-left", "icon-left"].join(" ")}
        >
          {iconLeft}
        </span>
      )}
      <input
        // type={
        //   ["text", "password", "email", "mobile"].includes(type) ? type : "text"
        // }
        type={["text", "email", "mobile"].includes(type) ? type : "text"}
        value={value}
        data-testid={testId}
        onChange={(e) => _handleOnChange(e.target.value)}
        placeholder={placeholder || ""}
        className={`${"lumina-input-field"} ${
          type === "password"
            ? `${"lumina-password-input"} lumina-password-input`
            : ""
        }`}
        tabIndex={props.tabIndex || -1}
        name={name || label}
        onFocus={_handleOnFocus}
        onBlur={_handleOnBlur}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        onKeyPress={props.onKeyPress}
        role='presentation'
        autoComplete={
          ["text", "email", "mobile"].includes(type) ? "off" : "new-password"
        }
        autoFocus={props.autoFocus || false}
        disabled={props.disabled || false}
        maxLength={type === "mobile" ? 15 : props.maxLength || 500000}
        ref={inputEl}
      />
      {iconRight && (
        <span
          className={["lumina-input-icon-right", "icon-right"].join(
            " "
          )}
        >
          {iconRight}
        </span>
      )}

      {/* Optional Fallback for Browser Quirks */}
      <input type='text' autoComplete='on' style={{ display: "none" }} />
    </div>
  );
};

const processByType = (str, type, textCase) => {
  if (type === "number" || type === "mobile") {
    str = str.replace(/[^0-9]+/g, ""); // Allow only numeric characters (0-9)
  } else if (type === "text" || type === "email") {
    switch (textCase) {
      case "uppercase":
        str = str.toUpperCase();
        break;
      case "lowercase":
        str = str.toLowerCase();
        break;
      default:
        break;
    }
  }
  return str;
};
