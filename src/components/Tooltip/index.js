import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Tooltip = ({
  title,
  body,
  children,
  position,
  containerClass,
  theme
}) => {
  const tooltipRef = useRef(null);
  const tooltipTextRef = useRef(null);
  const [dynamicPosition, setDynamicPosition] = useState(position);

  useEffect(() => {
    const handlePosition = () => {
      if (tooltipRef.current && tooltipTextRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const tooltipTextRect = tooltipTextRef.current.getBoundingClientRect();

        if (tooltipRect.bottom + tooltipTextRect.height > window.innerHeight) {
          setDynamicPosition("top");
        } else {
          setDynamicPosition(position);
        }
      }
    };

    handlePosition();
    window.addEventListener("resize", handlePosition);
    return () => {
      window.removeEventListener("resize", handlePosition);
    };
  }, [position]);

  return (
    <div
      className={`tooltip ${containerClass} ${dynamicPosition ? `tooltip-${dynamicPosition}` : ""}`}
      ref={tooltipRef}
    >
      {children}
      <div
        className={`tooltiptext tooltiptext-${theme} tooltip-${dynamicPosition}`}
        ref={tooltipTextRef}
      >
        <div className="tooltip-title">{title}</div>
        {body && <div className="tooltip-body">{body}</div>}
      </div>
    </div>
  );
};

export default Tooltip;

Tooltip.defaultProps = {
  title: "sample",
  children: React.createElement("div"),
  position: "bottom",
  containerClass: "",
  theme: "light"
};

Tooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  position: PropTypes.string,
  containerClass: PropTypes.string,
  theme: PropTypes.string
};
