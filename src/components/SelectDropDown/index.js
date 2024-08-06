import React, { useRef, useState, useEffect } from "react";
import "./index.scss";
import ChevronDownIcon from "../../assets/icons/ChevronDown.js";

export default ({ ...props }) => {
  const dropdownRef = useRef(null);
  let { name, className, id, onChange, label, children, value } = props;
  if (props === undefined) {
    return false;
  }
  if (isType("Object", children)) {
    children = [children];
  }
  if (!isType("Array", children)) {
    throw new Error(
      `Children to SelectDropDown are required in the form of an array`
    );
  }
  if (value === null || value === undefined) {
    throw new Error(`Value of SelectDropDown is a required attribute`);
  }
  let invalid_child = children.filter((x) => x.type !== "option");
  if (invalid_child.length > 0) {
    throw new Error(
      `Children to SelectDropDown need to consist of 'option' tag only`
    );
  }
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(children);
  const [selectedItem, setSelectedItem] = useState(props?.value || null);
  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (item) => {
    selectedItem == item?.props?.value
      ? setSelectedItem(null)
      : setSelectedItem(item?.props?.value);
    setOpen(false);
    onChange(item?.props?.value);
  };
  const [isFocused, setFocused] = useState(false);
  const _handleOnFocus = () => {
    setFocused(true);
  };
  const _handleOnBlur = () => {
    setFocused(false);
    setOpen(false);
  };
  let displayValue = selectedItem
    ? items.find((item) => item?.props?.value == selectedItem)
    : label;
  if (
    displayValue != undefined &&
    displayValue != null &&
    displayValue != label
  ) {
    displayValue = displayValue?.props?.children;
  } else {
    displayValue = label;
  }
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false); // Close the dropdown if clicked outside
    }
  };

  // Use useEffect to attach and remove click event listener
  useEffect(() => {
    const handleOutsideClick = handleClickOutside;

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick); // Cleanup
    };
  }, [isOpen]);
  return (
    <div
      className={["lumina-select-field", className || ""].join(" ")}
      id={id || null}
      ref={dropdownRef}
    >
      <div
        className={[
          "lumina-dropdown",
          isFocused ? "lumina-dropdown-focused" : ""
        ].join(" ")}
        {...(props.tabIndex !== undefined && { tabIndex: props.tabIndex })}
        onFocus={_handleOnFocus}
        onBlur={_handleOnBlur}
      >
        <div
          className={[
            displayValue !== label ? "lumina-select-label-visible" : "",
            "lumina-select-label"
          ].join(" ")}
        >
          {label}
        </div>
        <div className="lumina-dropdown-header" onClick={toggleDropdown}>
          <span className="lumina-dropdown-value">{displayValue}</span>
          <span
            className={[
              `${isOpen ? "lumina-dropdown-icon-open" : ""}`,
              `lumina-dropdown-icon`
            ].join(" ")}
          >
            <ChevronDownIcon />
          </span>
        </div>
        <div
          className={[
            "lumina-dropdown-body",
            `${isOpen ? "lumina-dropdown-body-open" : ""}`
          ].join(" ")}
        >
          {items.map((item, i) => (
            <div
              className={[
                "lumina-dropdown-item",
                item.props.value === selectedItem
                  ? "lumina-dropdown-item-selected"
                  : ""
              ].join(" ")}
              onClick={(e) => handleItemClick(item)}
              id={item.props.value}
              key={i}
            >
              <span
                className={[
                  "lumina-dropdown-item-dot",
                  `${
                    item.props.value == selectedItem
                      ? "lumina-dropdown-item-dot-selected"
                      : ""
                  }`
                ].join(" ")}
              >
                •{" "}
              </span>
              {item.props.children}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const isType = (type, val) =>
  val.constructor.name.toLowerCase() === type.toLowerCase();
