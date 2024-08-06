import React from "react";
import "./index.scss";
const BottomNavigation = ({ ...props }) => {
  return (
    <div
      className={["lumina-bottom-navigation", props.className || ""].join(" ")}
      style={props.style || {}}
      id={props.id || null}
    >
      {props.children}
    </div>
  );
};

const BottomNavItem = ({ ...props }) => {
  return (
    <div
      className={[
        props.type === "center" ? "lumina-nav-center-item" : "lumina-nav-item",
        props.active ? "lumina-nav-item-active" : "",
        "lumina-nav-item",
        props.className || ""
      ].join(" ")}
      style={props.style || {}}
      id={props.id || null}
      onClick={props.onClick}
    >
      {props.icon && <div className={`lumina-nav-item-icon`}>{props.icon}</div>}
      {props.type !== "center" && <span>{props.children}</span>}
    </div>
  );
};

export { BottomNavigation, BottomNavItem };
