import React from "react";

const ErrorAlert = ({ message, onErrorClose }) => {
  return (
    <div className="Alert">
      <span className="SpanBtn" onClick={() => onErrorClose()}>
        x
      </span>
      <p>{message}</p>
    </div>
  );
};

export default ErrorAlert;
