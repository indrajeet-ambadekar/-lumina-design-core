import React, { useEffect, useState } from "react";
import "./index.scss";
export default ({ ...props }) => {
  if (!Array.isArray(props?.options)) {
    throw new Error(
      `Options elements to a TabSelect are required in the form of an array`
    );
  }
  const [activeValue, setActiveValue] = useState(
    props.options.find((x) => x.value === props.value)?.value
  );
  useEffect(() => {
    setActiveValue(props.options.find((x) => x.value === props.value)?.value);
  }, [props.value]);
  return (
    <div
      className={["lumina-tab-select-wrapper", props?.className || ""].join(
        " "
      )}
      id={props.id || null}
      data-testid={props?.testId || null}
    >
      <div
        className={[
          "lumina-tab-select-label",
          props?.labelClassName || ""
        ].join(" ")}
      >
        {props.children}
      </div>
      <div className="lumina-tab-select-option-container">
        {(props?.options || []).map((_item, i) => (
          <div
            key={i}
            className={[
              "lumina-tab-select-option",
              activeValue === _item.value
                ? [
                    "lumina-tab-select-option-selected",
                    props.activeOptionClassName || ""
                  ].join(" ")
                : "",
              props?.optionClassName || ""
            ].join(" ")}
            onClick={() => props.onChange(_item.value)}
          >
            {_item.icon ? _item.icon : ""}
            <span>{_item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
