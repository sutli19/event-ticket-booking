# EventHub - Event Ticket Booking System

## Overview

EventHub is a full-stack event ticket booking application built using the MERN stack. The application enables users to browse events, reserve seats temporarily, and confirm bookings while ensuring that no two users can book the same seat simultaneously.

The system simulates a real-world ticket booking workflow by supporting temporary seat reservations with automatic expiration.

---

## Features

### Authentication

* Basic user authentication using browser localStorage.
* Protected routes for authenticated users.
* Login and logout functionality.
* Automatic redirection for authenticated users.

### Event Management

* Browse all available events.
* View detailed information for each event.

### Seat Reservation

* Interactive seat selection interface.
* Color-coded seat statuses:

  * Available
  * Selected
  * Reserved
  * Booked
* Multiple seat selection.
* Temporary seat reservation for 10 minutes.
* Reservation countdown timer.
* Reservation recovery for the same authenticated user.

### Booking

* Confirm reserved seats.
* Automatic release of expired reservations.
* Prevention of double booking using database transactions.

### User Experience

* Responsive user interface.
* Loading indicators and feedback messages.
* Error handling and validation.

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

---

## Project Structure

```text
event-ticket-booking/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── scripts/
│   └── package.json
│
└── README.md
```

---

## Running the Backend

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### 4. Start the backend server

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## Running the Frontend

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the frontend

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## Database Seeding

To populate sample events and seats:

```bash
cd backend
node src/scripts/seedDatabase.js
```

---

## API Endpoints

### Events

```http
GET /api/events
GET /api/events/:id
```

### Reservations

```http
POST /api/reserve
GET /api/reservations/user/:userId
```

### Bookings

```http
POST /api/bookings
```

---

## Assumptions

* Authentication is implemented using browser localStorage for simplicity.
* Password recovery and advanced account management are outside the scope of this assignment.
* Reserved seats remain locked for 10 minutes.
* Users are expected to complete booking before reservation expiry.
* Reservation recovery is supported only for the authenticated reservation owner.

---

## Design Decisions

### Preventing Double Booking

Double booking prevention is implemented using MongoDB transactions and seat status validation.

The booking flow works as follows:

1. Before reserving seats, the system validates that all selected seats are still available.
2. Seat updates and reservation creation are performed inside a MongoDB transaction.
3. If any selected seat is already reserved or booked, the entire transaction is aborted.
4. No partial updates occur, ensuring database consistency.
5. Expired reservations automatically release seats back to the available state.

This approach guarantees that multiple users cannot successfully reserve or book the same seat simultaneously.

### Architecture Decisions

* React component-based architecture was used to ensure modularity and reusability.
* Service layers were used on the backend to separate business logic from route handlers.
* Protected routes were implemented to secure authenticated pages.
* Axios was used for centralized API communication.

---

## Future Enhancements

* JWT-based authentication.
* Forgot password functionality.
* Real-time seat updates using WebSockets.
* Payment gateway integration.
* Admin dashboard for event management.

---

## Author

**Sweety Jaiswal**

B.Sc. Computer Science Student
MERN Stack Developer
