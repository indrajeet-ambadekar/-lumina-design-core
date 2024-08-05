import React, { useState, useEffect, useRef } from "react";
import styles from "./AppHeader.scss";
import CloseIcon from "../../assets/icons/Close.js"
import BarsIcon from "../../assets/icons/Bars.js";

const AppHeader = ({ ...props }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const _handleLogoClick = () => {
    if (typeof props.onIconClick === "function") {
      props.onIconClick();
    }
  };

  const _handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      ref={headerRef}
      className={[
        "lumina-header-wrapper",
        props.className || ""
      ].join(" ")}
      id={props.id || null}
      style={props.style || {}}
    >
      <div
        className={[
          "lumina-header-app-logo"
        ].join(" ")}
      >
        {props.children && (
          <button
            className={[
              "lumina-header-hamburger-btn"
            ].join(" ")}
            onClick={_handleClick}
          >
            {menuOpen ? <CloseIcon /> : <BarsIcon />}
          </button>
        )}
        {props.logo && (
          <div
            className={[
              "lumina-header-app-logo-wrapper",
              "lumina-header-logo-wrapper"
            ].join(" ")}
            onClick={_handleLogoClick}
          >
            {props.logo}
          </div>
        )}
        {props.secondaryIcon}
      </div>
      <div
        className={[
          "lumina-header-nav-cntnr"
        ].join(" ")}
      >
        {React.Children.map(props.children, (child, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(child, {
              onClick: (event) => {
                if (typeof child.props.onClick === "function") {
                  child.props.onClick(event);
                }
                setMenuOpen(false);
              }
            })}
          </React.Fragment>
        ))}
      </div>
      <div
        className={[
          "lumina-header-profile-wrapper"
        ].join(" ")}
      >
        {props.profileIcon}
      </div>
      {menuOpen && (
        <div
          ref={menuRef}
          className={[
            "lumina-header-hamburger-menu"
          ].join(" ")}
        >
          {React.Children.map(props.children, (child, index) => (
            <React.Fragment key={index}>
              {React.cloneElement(child, {
                onClick: (event) => {
                  if (typeof child.props.onClick === "function") {
                    child.props.onClick(event);
                  }
                  setMenuOpen(false);
                }
              })}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppHeader;
