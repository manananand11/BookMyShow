import React, { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import data from "./data";
import MovieSelector from "./MovieSelector";
import SlotSelector from "./SlotSelector";
import SeatSelector from "./SeatSelector";
import LastBookingDetails from "./LastBookingDetails";
import BASE_URL from "./config";
const apiBookingUrl = `${BASE_URL}/api/booking`;

const App = () => {
  const dummyMovies = data.movies;
  const dummySlots = data.slots;
  const dummySeats = data.seats;

  // State to store user selections
  const [selectedMovie, setSelectedMovie] = useState(localStorage.getItem("movie") || null);
  const [selectedSlot, setSelectedSlot] = useState(localStorage.getItem("slot") || null);
  const [selectedSeats, setSelectedSeats] = useState(JSON.parse(localStorage.getItem("seats")) || {});
  const [lastBooking, setLastBooking] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch the last booking details from the API
    fetch(apiBookingUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "No previous booking found") {
          setLastBooking({});
        } else {
          setLastBooking(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching last booking:", error);
      });
  }, []);

  const initialSeatValues = {};
  for (const seat of dummySeats) {
    initialSeatValues[seat] = 0;
  }

  // Function to handle seat selection
  const handleSeatSelection = (seat, count) => {
    const updatedSeats = { ...selectedSeats, [seat]: count };
    setSelectedSeats(updatedSeats);
     // Store the updated seat selection in local storage
    localStorage.setItem("seats", JSON.stringify(updatedSeats));
  };

  // Function to handle the booking process
  const handleBooking = () => {
    const seatCounts = Object.values(selectedSeats);
    if (!selectedMovie) {
      alert("Please select a movie.");
      return;
    } else if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    } else if (!(seatCounts.some((count) => count > 0))) {
      alert("Please select at least one seat to book.");
      return;
    }
    const bookingData = {
      movie: selectedMovie,
      seats: selectedSeats,
      slot: selectedSlot,
    };

    fetch(apiBookingUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage(data.message);
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        // Clear user selections
        setSelectedMovie(null);
        setSelectedSlot(null);
        setSelectedSeats({});
        localStorage.removeItem("movie");
        localStorage.removeItem("slot");
        localStorage.removeItem("seats");
        setLastBooking({
          movie: selectedMovie,
          seats: selectedSeats,
          slot: selectedSlot,
        });
      })
      .catch((error) => {
        console.error("Error while making a booking:", error);
        setSuccessMessage("Booking failed");
      });
  };

  return (
    <div className={`container`}>
      <div className="row">
        <div className="col-8">
          {/* Component for selecting a movie */}
          <MovieSelector
            dummyMovies={dummyMovies}
            selectedMovie={selectedMovie}
            setSelectedMovie={(movie) => {
              setSelectedMovie(movie);
              localStorage.setItem("movie", movie);
            }}
          />
          {/* Component for selecting a time slot */}
          <SlotSelector
            dummySlots={dummySlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={(slot) => {
              setSelectedSlot(slot);
              localStorage.setItem("slot", slot);
            }}
          />
          {/* Component for selecting seats */}
          <SeatSelector
            dummySeats={dummySeats}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            handleSeatSelection={handleSeatSelection}
          />

          <div className="book-button">
            {/* Button to trigger the booking process */}
            <button onClick={handleBooking}>Book Now</button>
            {/* Display a success message if there is one */}
            {successMessage && <p>{successMessage}</p>}
          </div>
        </div>
{/* Component for displaying the last booking details */}
        <LastBookingDetails lastBooking={lastBooking} dummySeats={dummySeats} />
      </div>
    </div>
  );
};

export default App;
