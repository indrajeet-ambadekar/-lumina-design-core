import React from "react";
import { useEffect, useRef } from "react";
import "./Toast.scss";
import ExclamationTriangleIcon from "../../assets/icons/ExclamationTriangle.js";
import ThumbsUpIcon from "../../assets/icons/ThumbsUp.js";
import LightbulbAlt from "../../assets/icons/LightbulbAlt.js";
const useTimeout = (callback, delay) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.=
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    // Don't schedule if no delay is specified
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
};

export const Toast = (props) => {
  useTimeout(props.close, props.timer || 5000);
  const toastTypeMap = {
    default: null,
    success: (
      <span className={`lumina-toast-icon`}>
        <ThumbsUpIcon />
      </span>
    ),
    error: (
      <span className={`lumina-toast-icon`}>
        <ExclamationTriangleIcon />
      </span>
    ),
    warn: (
      <span className={`lumina-toast-icon`}>
        <ExclamationTriangleIcon />
      </span>
    ),
    info: (
      <span className={`lumina-toast-icon`}>
        <LightbulbAlt />
      </span>
    )
  };
  return (
    <div
      className={[
        "lumina-toast",
        `lumina-toast-${props.type || "default"}`,
        "lumina-toast"
      ].join(" ")}
      title={props.children}
    >
      {toastTypeMap[props.type || "default"]}
      <div className="lumina-toast__text">{props.children}</div>
      <div>
        <button
          onClick={props.close}
          className={["lumina-toast__close-btn"].join(" ")}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
