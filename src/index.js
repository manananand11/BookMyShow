const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 8080;

// Endpoint to handle booking a movie
app.post('/api/booking', async (req, res) => {
    try {
        // Access the request body to retrieve movie, seats, and slot
        const { movie, seats, slot } = req.body;

        // Create a new booking entry
        const booking = new connection({
            movie,
            seats,
            slot
        });

        // Save the booking to the database
        await booking.save();

        // Return a success response
        res.status(200).json({ message: "Booking successful" });
    } catch (error) {
        // Handle any errors that occur during the booking process
        console.error("Error while making a booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Endpoint to retrieve the last booking
app.get('/api/booking', async (req, res) => {
    try {
        // Retrieving the last booking
        const lastBooking = await connection.findOne().sort({ _id: -1 }).exec();

        if (lastBooking) {
            // If a booking is found, return it as a JSON response
            res.status(200).json(lastBooking);
        } else {
            res.status(404).json({ message: "No previous booking found" });
        }
    } catch (error) {
         // Handle any errors that occur during the retrieval process
        console.error("Error while retrieving the last booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;   