import React from "react";

const SeatSelector = ({ dummySeats, selectedSeats, setSelectedSeats, handleSeatSelection }) => {
  return (
    <div className="seat-row">
      <h2>Select the seats</h2>
      {dummySeats.map((seat, index) => (
        <div
          className={`seat-column ${selectedSeats[seat] ? "seat-column-selected" : ""}`}
          key={index}
        >
          <label className="l-w">Type {seat}</label>
          <input
            type="number"
            value={selectedSeats[seat] || 0}
            onChange={(e) => handleSeatSelection(seat, parseInt(e.target.value))}
            min="0"
          />
        </div>
      ))}
    </div>
  );
};

export default SeatSelector;
