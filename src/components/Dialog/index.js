import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
export default ({ open, hide, ...props }) => {
  let needHeader = props.header || false;
  const handleClick = (event) => {
    if (event.target.closest(".lumina-design-dialog") === null) {
      hide();
    }
  };
  return open
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className={["lumina-design-dialog-overlay", "dialog-overlay"].join(
              " "
            )}
            onClick={hide}
          />
          <div
            className={[`lumina-design-dialog-wrapper`, "dialog-wrapper"].join(
              " "
            )}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            id={props.id || null}
            onClick={handleClick}
          >
            <div className={[`lumina-design-dialog`, "dialog"].join(" ")}>
              {needHeader && (
                <div
                  className={[
                    `lumina-design-dialog-header`,
                    `dialog-header`
                  ].join(" ")}
                >
                  <button
                    type="button"
                    className={[`dialog-close-btn`, "dialog-close-button"].join(
                      " "
                    )}
                    data-dismiss="dialog"
                    aria-label="Close"
                    onClick={hide}
                  >
                    &times;
                  </button>
                </div>
              )}
              <div
                className={[
                  `lumina-design-dialog-content`,
                  "dialog-content-wrapper"
                ].join(" ")}
              >
                {props.children}
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
