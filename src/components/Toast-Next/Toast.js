import React from "react";
import PropTypes from "prop-types";
import "./Toast.scss";

const Toast = ({ type, content }) => {
  return <div className={`toast toast-${type}`}>{content}</div>;
};

Toast.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default Toast;
