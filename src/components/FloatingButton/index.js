import React from "react";
import "./index.scss";
export default ({ ...props }) => {
  let { className, style, id, color, size, icon, children, onClick } = props;
  return (
    <div
      className={[
        className || "",
        "lumina-flbtn",
        `lumina-flbtn-${color || "orange"}`,
        `lumina-flbtn-${size || "S"}`
      ].join(" ")}
      id={id || null}
      style={{ ...style }}
      onClick={onClick}
      {...(props.tabIndex !== undefined && { tabIndex: props.tabIndex })}
    >
      {icon ? <span className={`lumina-flbtn-icon`}>{icon}</span> : ""}
      {children ? <div className={`lumina-flbtn-label`}>{children}</div> : ""}
    </div>
  );
};
