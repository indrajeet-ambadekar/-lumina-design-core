import React, { Fragment } from "react";
import "./index.scss";
import CheckIcon from "../../assets/icons/Check.js";
import ExclamationTriangleIcon from "../../assets/icons/ExclamationTriangle.js";
export default ({ ...props }) => {
  let {
    className,
    style,
    id,
    mode,
    type,
    size,
    value,
    label,
    total,
    strokeWidth,
    success,
    error
  } = props;

  if (mode === "radial") {
    if (Number(size) < 40) {
      throw new Error(`Radial Progress Indicator needs a minimum size of '40'`);
    }
    return (
      <div
        className={["lumina-progress-radial", className || ""].join(" ")}
        style={{
          ...style,
          width: Number(size) || 50,
          height: Number(size) || 50
        }}
        id={id || null}
      >
        <CircularProgressBar
          strokeWidth={Number(strokeWidth) || 3}
          sqSize={Number(size) || 50}
          value={value}
          type={type || "step"}
          total={total}
          success={success}
          error={error}
        />
        {success && (
          <div
            className={[
              "lumina-progress-status",
              "lumina-progress-status-green"
            ].join(" ")}
          >
            <CheckIcon />
          </div>
        )}
        {error && (
          <div
            className={[
              "lumina-progress-status",
              "lumina-progress-status-red"
            ].join(" ")}
          >
            <ExclamationTriangleIcon />
          </div>
        )}
      </div>
    );
  } else if (mode === "linear") {
    if (Number(size) < 40) {
      throw new Error(`Linear Progress Indicator needs a minimum size of '5'`);
    }
    let _percentage = formatNumber((Number(value) / Number(total)) * 100);
    return (
      <div
        className={["lumina-progress-linear", className || ""].join(" ")}
        style={{ ...style }}
        id={id || null}
      >
        <div
          className={[
            "lumina-prgs-lnr-fill",
            _percentage === 100 ? "lumina-prgs-lnr-fill-complete" : ""
          ].join(" ")}
          style={{
            height: Number(strokeWidth) || 5,
            width: `${_percentage}%`
          }}
        ></div>
        {label != null ? (
          <span className="lumina-prgs-lnr-label">{label}</span>
        ) : (
          ""
        )}
        {label != null ? (
          <span className="lumina-prgs-lnr-value">{_percentage}%</span>
        ) : (
          ""
        )}
      </div>
    );
  }
};

class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _getLabel = (_percentage) => {
    if (!this.props.success && !this.props.error) {
      return this.props.type === "percentage"
        ? `${_percentage}%`
        : `${this.props.value}/${this.props.total}`;
    } else if (!this.props.success && this.props.error) {
      return "";
    } else if (this.props.success && !this.props.error) {
      return "";
    }
  };
  render() {
    let _percentage =
      (Number(this.props.value) / Number(this.props.total)) * 100;
    const sqSize = this.props.sqSize;
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * _percentage) / 100;
    return (
      <>
        <svg
          width={this.props.sqSize}
          height={this.props.sqSize}
          viewBox={viewBox}
        >
          <circle
            className="circle-background"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`}
          />
          <circle
            className={
              _percentage < 100
                ? "circle-progress"
                : `circle-progress${this.props.success ? "-complete" : ""}`
            }
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`}
            transform={`rotate(-90 ${this.props.sqSize / 2} ${
              this.props.sqSize / 2
            })`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }}
          />
          <text
            className={
              _percentage < 100
                ? "circle-text"
                : `circle-text${this.props.success ? "-complete" : ""}`
            }
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
          >
            {this._getLabel(_percentage)}
          </text>
        </svg>
      </>
    );
  }
}
CircularProgressBar.defaultProps = {
  sqSize: 100,
  percentage: 25,
  strokeWidth: 5
};

function formatNumber(number) {
  if (Number.isInteger(number)) {
    return number; // Return integer as is
  } else {
    // Round to 2 decimal places for decimal numbers
    return Math.round(number * 100) / 100;
  }
}
