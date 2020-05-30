import React from "react";

const TicketReader = ({ ticketValue, removeTicket }) => {
  return (
    <div className="container">
      {ticketValue.map((ticket) => (
        <div key={ticket} className="card">
          <h3 onClick={() => removeTicket(ticket)} className="title">
            X
          </h3>
          <div className="circle">{ticket}</div>
        </div>
      ))}
      ;
    </div>
  );
};

export default TicketReader;
