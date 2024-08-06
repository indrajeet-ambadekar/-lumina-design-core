import React from "react";
import "./index.scss";
const AVATAR_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"];
export default ({ ...props }) => {
  const { type, size, className, id, children } = props;
  let avatarSizeClass = AVATAR_SIZES.includes(size) ? size : "S";
  avatarSizeClass = `avatar-${avatarSizeClass}`;
  return (
    <div
      className={[
        `avatar`,
        `lumina-design-avatar`,
        `${avatarSizeClass}`,
        className || ""
      ].join(" ")}
      id={id || null}
      onClick={props?.onClick}
    >
      {children}
    </div>
  );
};
