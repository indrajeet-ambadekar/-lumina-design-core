import React from "react";
import "./index.scss";
export default ({ ...props }) => {
  let index = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

  return (
    <div
      id={props.id || null}
      className={[
        `${props.className || ""}`,
        "lumina-checkbox",
        "lumina-design-checkbox",
        props.disabled ? "lumina-checkbox-disabled" : ""
      ].join(" ")}
    >
      <div
        className={[
          `checkbox-round`,
          "checkbox",
          props.disabled ? "checkbox-round-disabled" : ""
        ].join(" ")}
      >
        <input
          type="checkbox"
          id={`checkbox-${index}`}
          onChange={(event) => props.onChange(event.target.checked)}
          checked={props.checked}
          disabled={props.disabled}
          {...(props.tabIndex !== undefined && { tabIndex: props.tabIndex })}
        />
        <label htmlFor={`checkbox-${index}`}></label>
      </div>
      {props.label && (
        <div className={`lumina-checkbox-label`}>{props.label || ""}</div>
      )}
    </div>
  );
};
