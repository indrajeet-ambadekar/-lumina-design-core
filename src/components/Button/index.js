import React from "react";
import "./index.scss";
export default ({ ...props }) => {
  let subProps = { ...props };
  delete subProps.children;
  let icon = props.icon;
  let iconLeft = props.iconLeft;
  let iconRight = props.iconRight;
  delete subProps.icon;
  delete subProps.iconLeft;
  delete subProps.iconRight;
  return (
    <button
      {...subProps}
      className={[`${props.className || ""}`, "lumina-button"].join(" ")}
      id={props.id || null}
      tabIndex={props.tabIndex || null}
    >
      {iconLeft ? <span className={`lumina-button-icon`}>{iconLeft}</span> : ""}
      {props.children}
      {iconRight || icon ? (
        <span className={`lumina-button-icon`}>{iconRight || icon}</span>
      ) : (
        ""
      )}
    </button>
  );
};
