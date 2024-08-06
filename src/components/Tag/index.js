import React from "react";
import "./index.scss";
export default ({ ...props }) => {
  if (
    ![
      "default",
      "success",
      "warn",
      "error",
      "inprogress",
      "pending",
      "info",
      "unavailable"
    ].includes((props?.type || "").toLowerCase())
  ) {
    throw new Error(
      `'type' attribute should have one of the values: "default", "success", "warn", "error", "inprogress", "pending", "info", "unavailable"`
    );
  }
  return (
    <div
      id={props.id || null}
      onClick={props?.onClick}
      className={[
        "lumina-tag",
        props.mode === "dark"
          ? `lumina-tag-${props.type.toLowerCase()}-dark`
          : `lumina-tag-${props.type.toLowerCase()}`,
        props.className || ""
      ].join(" ")}
      style={props.style || {}}
    >
      {props.children}
    </div>
  );
};
