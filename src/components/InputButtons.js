import React, { Fragment } from "react";

const InputButtons = ({ onHandleChange }) => {
  const backSpace = () => <i id="backspace" className="fas fa-backspace"></i>;
  const deletePNG = () => <i id="delete" className="far fa-trash-alt"></i>;
  const tempArray = [7, 8, 9, 4, 5, 6, 1, 2, 3, backSpace(), 0, deletePNG()];
  return (
    <Fragment>
      <div className="ButtonMainContainer">
        {tempArray.map((buttonData) => (
          <div key={Math.random()} className="ButtonContainer">
            <button
              onClick={
                buttonData.props
                  ? () => onHandleChange(null, buttonData.props.id)
                  : () => onHandleChange(null, buttonData)
              }
              className="Buttons"
            >
              {buttonData}
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default InputButtons;
