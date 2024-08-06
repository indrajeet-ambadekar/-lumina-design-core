import React from "react";
import "./index.scss";
export default ({ ...props }) => {
  let subProps = { ...props };
  delete subProps.children;
  return (
    <div
      {...subProps}
      className={[props.className || "", "lumina-col", `grid-column`].join(" ")}
    >
      {props.children}
    </div>
  );
};
