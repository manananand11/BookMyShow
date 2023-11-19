# Movie Booking API Documentation

This documentation outlines the endpoints and functionality of the Movie Booking API.

## Base URL

The base URL for the API is determined by the host and port the application is running on. By default, it is set to `http://localhost:8080/`. You can change the port by modifying the `PORT` environment variable.

## Endpoints

### 1. Book a Movie

**Endpoint**: POST `/api/booking`

This endpoint is used to book a movie and its associated seats at a specific slot.

**Request Body:**

- `movie` (String): The name of the movie.
- `seats` (Array of Strings): An array of seat numbers.
- `slot` (String): The time slot for the movie.

**Response:**

- If the booking is successful, it returns a JSON response with a success message and HTTP status 200.

```json
{
  "message": "Booking successful"
}
```

- If an error occurs during the booking process, it returns a JSON response with an error message and HTTP status 500.

```json
{
  "message": "Internal server error"
}
```

### 2. Retrieve the Last Booking

**Endpoint**: GET `/api/booking`

This endpoint is used to retrieve the details of the last booking made.

**Response:**

- If a booking is found, it returns the booking details as a JSON response with HTTP status 200.

```json
{
  "_id": "unique_booking_id",
  "movie": "Movie Name",
  "seats": ["Seat1", "Seat2"],
  "slot": "Time Slot"
}
```

- If no previous booking is found, it returns a JSON response with an error message and HTTP status 404.

```json
{
  "message": "No previous booking found"
}
```

- If an error occurs during the retrieval process, it returns a JSON response with an error message and HTTP status 500.

```json
{
  "message": "Internal server error"
}
```

## Getting Started

1. Start the Express application by running `node index.js`.

2. Use a tool like Postman or make HTTP requests to the specified endpoints to interact with the API.

## Example Usage

### Booking a Movie

- **Request:**

  ```http
  POST http://localhost:8080/api/booking
  Content-Type: application/json

  {
    "movie": "Avengers: Endgame",
    "seats": ["A1", "A2"],
    "slot": "14:00"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Booking successful"
  }
  ```

### Retrieving the Last Booking

- **Request:**

  ```http
  GET http://localhost:8080/api/booking
  ```

- **Response (If a booking exists):**

  ```json
  {
    "_id": "unique_booking_id",
    "movie": "Movie Name",
    "seats": ["Seat1", "Seat2"],
    "slot": "Time Slot"
  }
  ```

- **Response (If no booking exists):**

  ```json
  {
    "message": "No previous booking found"
  }
  ```

## Error Handling

The API handles errors by returning appropriate HTTP status codes and error messages as described in the respective endpoints' documentation.

For any further assistance, please refer to the code or contact the API developer.

Enjoy using the Movie Booking API!