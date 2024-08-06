import React from "react";
import "./index.scss";
export default ({ ...props }) => {
  const { className, id, onClose, icon, children, dismissable, color, style } =
    props;
  return (
    <div
      className={[className || "", "lumina-chip", `lumina-chip-${color}`].join(
        " "
      )}
      id={id || null}
      style={style || {}}
    >
      {icon ? <span className="lumina-chip-icon">{icon}</span> : ""}
      <span className="lumina-chip-label">{children}</span>
      {dismissable ? (
        <span className="lumina-chip-close-btn" onClick={onClose}>
          &times;
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
