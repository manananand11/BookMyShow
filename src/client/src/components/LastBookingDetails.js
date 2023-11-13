import React from "react";

const LastBookingDetails = ({ lastBooking, dummySeats }) => {
  return (
    <div className="col-4">
      <div className="last-order">
        <h2>Last Booking Details</h2>
        {lastBooking ? (
          <div>
            <div>
              <strong>Seats</strong>
              {dummySeats.map((seat, index) => (
                <div key={index}>
                  {`${seat}: ${lastBooking.seats ? lastBooking.seats[seat] || 0 : 0}`}
                </div>
              ))}
            </div>
            <div>
              <strong>Slot: </strong> {lastBooking.slot || "N/A"}
            </div>
            <div>
              <strong>Movie: </strong> {lastBooking.movie || "N/A"}
            </div>
          </div>
        ) : (
          "No previous booking found"
        )}
      </div>
    </div>
  );
};

export default LastBookingDetails;
