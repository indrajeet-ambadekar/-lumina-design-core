import React, { useEffect } from "react";
import "./Accordion.scss";
export default ({ ...props }) => {
  var {
    title,
    children,
    openIcon,
    collapseIcon,
    className,
    defaultOpen,
    disabled,
    onOpen
  } = props;
  const [isOpen, setOpen] = React.useState(defaultOpen || false);
  const [actionDisabled, setDisabled] = React.useState(disabled || false);
  React.useEffect(() => {
    if (isOpen) {
      if (onOpen) {
        onOpen();
      }
    } else {
    }
  }, [isOpen]);

  return (
    <div
      className={[
        `_acrdn-wrapper`,
        `${className || ""}`,
        `${actionDisabled ? `"_acrdn-disabled"` : ""}`
      ].join(" ")}
      id={props.id || null}
    >
      <div
        className={
          openIcon && collapseIcon
            ? `_acrdn-title-custom ${
                isOpen ? "_acrdn-open" : "_acrdn-closed"
              }`
            : ` _acrdn-title ${
                isOpen ? "_acrdn-open" : "_acrdn-closed"
              }`
        }
        onClick={() => {
          if (!actionDisabled) setOpen(!isOpen);
        }}
      >
        {title}
        {openIcon && collapseIcon && (
          <div
            className={` accordion_collapse-controls`}
          >
            {isOpen ? collapseIcon : openIcon}
          </div>
        )}
      </div>
      <div
        className={` _acrdn-item ${
          !isOpen ? "_acrdn-collapsed" : "_acrdn-expanded"
        }`}
      >
        <div
          className={["_acrdn-content", "lumina-acrdn-content"].join(
            " "
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
