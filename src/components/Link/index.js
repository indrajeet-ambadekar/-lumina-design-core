import React from "react";
import "./index.scss";
const SIZE_MAP = { S: "small", M: "medium", L: "large" };
export default ({ ...props }) => {
  const _handleClick = (e) => {
    if (props.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  let sizeClass = `lumina-link-${
    ["S", "M", "L"].includes(props.size) ? SIZE_MAP[props.size] : "small"
  }`;
  return (
    <a
      href={props.href || "/"}
      target={props.target || "_blank"}
      className={[
        props.className || "",
        "lumina-link",
        sizeClass,
        props.disabled ? "lumina-link-disabled" : ""
      ].join(" ")}
      id={props.id || null}
      onClick={_handleClick}
      style={props.style || null}
      {...(props.tabIndex !== undefined && { tabIndex: props.tabIndex })}
    >
      {props.children}
    </a>
  );
};
