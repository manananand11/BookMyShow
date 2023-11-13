import React from "react";

const SlotSelector = ({ dummySlots, selectedSlot, setSelectedSlot }) => {
  return (
    <div className="slot-row">
      <h2>Select a Time Slot</h2>
      {dummySlots.map((slot, index) => (
        <button
          key={index}
          className={`slot-column ${
            selectedSlot === slot ? "slot-column-selected" : ""
          }`}
          onClick={() => setSelectedSlot(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default SlotSelector;
