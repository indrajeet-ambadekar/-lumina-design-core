import React, { useEffect, useState } from "react";
import "./index.scss";
import ChevronDownIcon from "../../assets/icons/ChevronDown.js";

const AutoComplete = ({ ...props }) => {
  const {
    className,
    id,
    style,
    value,
    label,
    dataSet,
    dataSetType,
    dataTargetKey,
    placeholder,
    onChange,
    renderItem
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggested, setSuggested] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  if (!Array.isArray(dataSet)) {
    throw new Error("'dataSet' attribute must be an array");
  }
  if (!["flat", "nested"].includes(dataSetType)) {
    throw new Error("'dataSetType' attribute must either 'flat' or 'nested'");
  }
  if (dataSetType === "nested" && !dataTargetKey) {
    throw new Error(
      "'dataTargetKey' attribute is mandatory for 'nested' dataSet type"
    );
  }

  useEffect(() => {
    setSuggested(dataSet);
    setInputValue(value);
  }, [dataSet, value]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setDropdownVisible(true);

    if (dataSetType === "flat") {
      if (value.length > 0) {
        const filteredItems = dataSet.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setSuggested(filteredItems);
      } else {
        setSuggested(dataSet);
      }
    } else {
      if (value.length > 0) {
        const filteredItems = dataSet.filter(
          (item) =>
            item[dataTargetKey] &&
            item[dataTargetKey].toLowerCase().includes(value.toLowerCase())
        );
        setSuggested(filteredItems);
      } else {
        setSuggested(dataSet);
      }
    }
  };

  const handleOptionClick = (item) => {
    if (item[dataTargetKey] === null || item[dataTargetKey] === undefined) {
      item[dataTargetKey] = "NULL VALUE";
    }
    setInputValue(dataSetType === "nested" ? item[dataTargetKey] : item);
    setSuggested([]);
    setDropdownVisible(false);
    if (onChange) onChange(item);
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div
      className={["lumina-auto-complete-wrapper", className || ""].join(" ")}
      id={id || null}
      style={{ ...style }}
    >
      <div className={["lumina-auto-complete-input-cntnr"].join(" ")}>
        <label>{label}</label>
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder || "Start typing..."}
          {...(props.tabIndex !== undefined && { tabIndex: props.tabIndex })}
        />
        <button
          className={["lumina-auto-complete-dropdown-toggle"].join(" ")}
          onClick={handleDropdownToggle}
        >
          <ChevronDownIcon
            className={`lumin-auto-complete-dropdown-toggle-chevron ${
              isDropdownVisible
                ? "lumin-auto-complete-dropdown-toggle-chevron-rotate"
                : ""
            }`}
          />
        </button>
        {inputValue.length > 0 && (
          <button
            className={["lumina-autocomplete-clear-btn"].join(" ")}
            onClick={() => {
              setInputValue("");
              setSuggested(dataSet); // Reset to full dataset when cleared
            }}
          >
            &times;
          </button>
        )}
      </div>
      {isDropdownVisible && (
        <div
          className={[
            "lumina-auto-complete-suggested-cntnr",
            "lumina-auto-complete-dropdown"
          ].join(" ")}
        >
          {suggested.map((item, i) => (
            <div
              key={i}
              className={[
                "lumina-auto-complete-suggested-row",
                "lumina-auto-complete-dropdown-item"
              ].join(" ")}
              onClick={() => handleOptionClick(item)}
            >
              {renderItem
                ? renderItem(item)
                : dataSetType === "nested"
                  ? item[dataTargetKey]
                  : item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
