import React, { useState, useRef, Suspense, Fragment, useReducer } from "react";
import InputButtons from "./InputButtons";
import TypeBox from "./TypeBox";
import AddButton from "./AddButton";

const ErrorAlert = React.lazy(() => import("./ErrorAlert"));
const TicketReader = React.lazy(() => import("./TicketReader"));

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((value) => value !== action.payload);
    default:
      return [...state];
  }
};

const App = () => {
  const [ticketValue, setTicketValue] = useState("");
  const [imageFlag, setImageFlag] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    flag: false,
    message: "",
  });
  const [arrayTicket, dispatch] = useReducer(reducer, []);
  const ref = useRef();

  const onSubmit = () => {
    if (ticketValue.length === 6) {
      if (arrayTicket.includes(ticketValue)) {
        setErrorDetails({
          flag: true,
          message: "Ticket is already added",
        });
      } else {
        setErrorDetails({ flag: false, message: "" });
        dispatch({ type: "ADD", payload: ticketValue });
        setTicketValue("");
      }
    } else if (ticketValue.length === 0) {
      setErrorDetails({
        flag: true,
        message: "Ticket Should not be empty",
      });
    } else {
      setErrorDetails({
        flag: true,
        message: "Ticket Should be equal to 6",
      });
    }
  };

  const removeTicket = (value) => {
    dispatch({ type: "REMOVE", payload: value });
  };

  const onHandleChange = (event, buttonTypedValue) => {
    if (isNaN(event && event.target.value)) {
      setErrorDetails({
        flag: true,
        message: "Should be a Number",
      });
    } else {
      if (buttonTypedValue === "delete") {
        setTicketValue("");
      } else if (buttonTypedValue === "backspace") {
        setTicketValue(ticketValue.slice(0, -1));
      } else {
        setTicketValue(
          buttonTypedValue !== undefined
            ? ticketValue + buttonTypedValue.toString()
            : event && event.target.value
        );
      }
    }
  };

  const generateFromLoader = () => {
    let timeout;
    clearTimeout(timeout);
    setImageFlag(true);
    timeout = setTimeout(() => {
      setTicketValue(Math.floor(100000 + Math.random() * 900000).toString());
      ref.current.focus();
      setImageFlag(false);
    }, 1000);
  };
  return (
    <Fragment>
      <div className="MainContainer">
        {errorDetails.flag ? (
          <Suspense fallback={<div>Loading...</div>}>
            <div className="ErrorAlert">
              <ErrorAlert
                message={errorDetails.message}
                onErrorClose={() =>
                  setErrorDetails({ flag: false, message: "" })
                }
              />
            </div>
          </Suspense>
        ) : null}
        <TypeBox
          ticketValue={ticketValue}
          ref={ref}
          onHandleChange={onHandleChange}
        />
        <div>
          <div className="inline">
            <InputButtons
              onHandleChange={(undefined, value) =>
                onHandleChange(undefined, value)
              }
            />
          </div>
          <div className="inline">
            <div
              onClick={generateFromLoader}
              className={imageFlag ? "loaderAnimation" : "loader"}
            />
            <p>Generate your Ticket</p>
          </div>
        </div>
        <AddButton onSubmit={onSubmit} />
        <div>
          {arrayTicket.length > 0 ? (
            <Fragment>
              <hr />
              <Suspense fallback={<div>Loading...</div>}>
                <TicketReader
                  removeTicket={(value) => removeTicket(value)}
                  ticketValue={arrayTicket}
                />
              </Suspense>
            </Fragment>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default App;
