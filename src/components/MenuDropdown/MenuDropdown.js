import React, { useEffect, useState } from "react";
import "./index.scss";
const MenuDropdown = ({ ...props }) => {
  const [menuItems, setMenuItems] = useState(props.children);
  const [isMenuVisible, setMenuVisible] = useState(false);
  if (!props.label) {
    throw new Error(`Label attribute is required for MenuDropdown`);
  }

  const listenToClick = (el) => {
    if (
      (el.target &&
        el.target.closest(".lumina-menu-dropdown-wrapper") === null) ||
      (el.target && el.target.closest(".lumina-menu-item") !== null)
    ) {
      setMenuVisible(false);
    }
  };
  useEffect(() => {
    let _child = props.children.filter((x) => typeof x?.type === "function");
    setMenuItems(_child);
    window.addEventListener("click", listenToClick);
    return () => {
      window.removeEventListener("click", listenToClick);
    };
  }, []);
  return (
    <div
      className={[props?.className || "", "lumina-menu-dropdown-wrapper"].join(
        " "
      )}
    >
      <div className={["lumina-menu-container"].join(" ")}>
        <button
          className={[
            props?.buttonClassName || "",
            "lumina-menu-dropdown-button"
          ].join(" ")}
          onClick={() => setMenuVisible(!isMenuVisible)}
          {...(props.tabIndex !== undefined && { tabIndex: props.tabIndex })}
        >
          {props.label}
        </button>
        {isMenuVisible && (
          <div
            className={[
              props?.menuClassName || "",
              "lumina-menu-dropdown",
              props?.alignMenu === "right"
                ? "lumina-menu-dropdown-right"
                : "lumina-menu-dropdown-left"
            ].join(" ")}
          >
            {menuItems}
          </div>
        )}
      </div>
    </div>
  );
};

const MenuItem = ({ ...props }) => {
  return (
    <div
      className={[props.className || "", "lumina-menu-item"].join(" ")}
      style={props.style || {}}
      id={props.id || null}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export { MenuDropdown, MenuItem };
