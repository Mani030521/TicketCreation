import React, { Fragment, useRef } from "react";

const TypeBox = React.forwardRef((props, ref) => {
  const { onHandleChange, onKeyDown, disabledFlag, ticketValue } = props;

  return (
    <Fragment>
      <input
        placeholder="Enter a six digit Number"
        type="text"
        ref={ref}
        maxLength={6}
        value={ticketValue}
        onChange={(event) => onHandleChange(event)}
        className="TypingBox"
      />
    </Fragment>
  );
});

export default TypeBox;
