import React from "react";
import "./index.scss";
const HEADING_TYPES = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  h5: "text-h5",
  h6: "text-h6",
  sh: "text-sh",
  "sb-h1": "text-sb-h1",
  "sb-h2": "text-sb-h2",
  h7: "text-h7",
  h8: "text-h8",
  b1: "text-b1",
  b2: "text-b2",
  b3: "text-b3",
  subtitle: "text-subtitle",
  caption: "text-caption",
  info: "text-info"
};
export default ({ type, children, className, id, style }) => {
  if (!Object.keys(HEADING_TYPES).includes(type)) {
    throw new Error(
      `'type' attribute for heading must be one of ${Object.keys(
        HEADING_TYPES
      ).join(" , ")}`
    );
  }
  return (
    <div
      className={[
        HEADING_TYPES[type],
        `lumina-text`,
        `${className || ""}`
      ].join(" ")}
      id={id || null}
      style={{ ...(style || {}) }}
    >
      {children}
    </div>
  );
};
