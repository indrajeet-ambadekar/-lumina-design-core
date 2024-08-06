import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Toast.scss";
import { ToastContext } from "./toastContext";
import { Toast } from "./toast";

// Create a random ID
function generateUEID() {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ("000" + first.toString(36)).slice(-3);
  second = ("000" + second.toString(36)).slice(-3);

  return first + second;
}

// Utility to detect Next.js environment
function isNextJs() {
  // Check if `window` is available (it should be on the client side)
  if (typeof window === "undefined") {
    return true; // likely a server-side context
  }

  // Next.js might have specific globals, but checking `window` is a good start
  return false;
}

export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect environment
  const isNextJsApp = isNextJs();

  if (isNextJsApp) {
    // Throw an error or handle it for Next.js apps
    throw new Error(
      "The Toast component is not available for Next.js apps right now."
    );
  }

  const open = (content, timer) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: generateUEID(),
        content,
        type: "default",
        timer: timer ? Number(timer) : 5000
      }
    ]);

  const success = (content, timer) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: generateUEID(),
        content,
        type: "success",
        timer: timer ? Number(timer) : 5000
      }
    ]);

  const warn = (content, timer) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: generateUEID(),
        content,
        type: "warn",
        timer: timer ? Number(timer) : 5000
      }
    ]);

  const error = (content, timer) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: generateUEID(),
        content,
        type: "error",
        timer: timer ? Number(timer) : 5000
      }
    ]);

  const info = (content, timer) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: generateUEID(),
        content,
        type: "info",
        timer: timer ? Number(timer) : 5000
      }
    ]);

  const close = (id) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

  const contextValue = useMemo(
    () => ({ open, success, warn, error, info }),
    []
  );

  // Render portal only on client side
  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {isClient &&
        createPortal(
          <div className="lumina-toasts-wrapper">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                type={toast.type}
                close={() => close(toast.id)}
                timer={toast.timer}
              >
                {toast.content}
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};
