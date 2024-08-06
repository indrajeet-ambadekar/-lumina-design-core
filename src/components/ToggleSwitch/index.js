import React from "react";
import "./index.scss";
const ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  optionLabels,
  small,
  disabled,
  className,
  tabIndex
}) => {
  function handleKeyPress(e) {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    onChange(!checked);
  }

  return (
    <div className={[`toggle-switch`, `${className}`].join(" ")}>
      <input
        type="checkbox"
        name={name}
        className={[`toggle-switch-checkbox`].join(" ")}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        {...(tabIndex !== undefined && { tabIndex: tabIndex })}
      />
      {id ? (
        <label
          className={[`toggle-switch-label`].join(" ")}
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor={id}
        >
          <span
            className={
              disabled
                ? [`toggle-switch-inner`, `toggle-switch-disabled`].join(" ")
                : [`toggle-switch-inner`].join(" ")
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={
              disabled
                ? [`toggle-switcher`, `toggle-switch-disabled`].join(" ")
                : [`toggle-switcher`].join(" ")
            }
            tabIndex={-1}
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
          />
        </label>
      ) : null}
    </div>
  );
};

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ["Yes", "No"]
};

export default ToggleSwitch;
