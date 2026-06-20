# EventHub - Event Ticket Booking System

A full-stack event ticket booking application built using the MERN stack. The application allows users to browse events, select seats, reserve them temporarily, and confirm bookings while preventing double booking through atomic database operations.

---

## Features

### Event Browsing

* Browse all available events.
* View detailed event information.
* Responsive event listing interface.

### Seat Reservation

* Interactive seat grid layout.
* Color-coded seat states.
* Select multiple seats simultaneously.
* Reserve seats for 10 minutes.

### Booking Flow

* Confirm reserved seats.
* Reservation countdown timer.
* Automatic reservation expiry.
* Prevent booking after reservation expiration.

### Concurrency Handling

* Prevent double booking.
* Atomic seat reservation using MongoDB transactions.
* Real-time seat availability updates.

### User Experience

* Modern responsive UI.
* Toast notifications.
* Loading indicators.
* Smooth animations using Framer Motion.

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Framer Motion
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

---

## Project Structure

```bash
event-ticket-booking
│
├── frontend
│   └── src
│       ├── api
│       ├── components
│       ├── pages
│       ├── routes
│       ├── services
│       ├── utils
│       └── App.jsx
│
├── backend
│   └── src
│       ├── config
│       ├── controllers
│       ├── jobs
│       ├── middlewares
│       ├── models
│       ├── routes
│       ├── scripts
│       ├── services
│       └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd event-ticket-booking
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

Start backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Application runs on:

```bash
http://localhost:5173
```

---

## Database Seeding

Populate sample events and seats:

```bash
cd backend
node src/scripts/seedDatabase.js
```

---

## API Endpoints

### Events

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/api/events`     | Get all events    |
| GET    | `/api/events/:id` | Get event details |

### Seats

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/api/seats/:eventId` | Get seats for an event |

### Reservations

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | `/api/reserve` | Reserve selected seats |

### Bookings

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| POST   | `/api/bookings` | Confirm booking |

---

## Seat Status Legend

| Status    | Meaning                    |
| --------- | -------------------------- |
| Available | Seat can be selected       |
| Selected  | Currently selected by user |
| Reserved  | Temporarily reserved       |
| Booked    | Permanently booked         |

---

## Design Decisions

### Preventing Double Booking

MongoDB transactions are used to guarantee atomic reservation operations. A seat can only be reserved if it is currently marked as available.

### Reservation Expiry

Reservations remain active for 10 minutes. A scheduled cleanup process automatically releases expired reservations and makes seats available again.

### Concurrency Control

Seat availability is verified inside database transactions before reservation confirmation, ensuring multiple users cannot reserve the same seat simultaneously.

---

## Assumptions

* User authentication was considered out of scope for this assignment.
* Reservation duration is fixed at 10 minutes.
* Users are expected to complete the booking from the reservation confirmation page before the reservation expires.
* Reserved seats are treated uniformly for all users because authentication is not implemented.
* Demo event data is generated using a seed script.

---

## Future Enhancements

* User authentication and authorization.
* Payment gateway integration.
* Real-time seat updates using WebSockets.
* Email notifications.
* Reservation recovery using persistent user sessions.

---

## Author

**Sweety Jaiswal**

Developed as part of the SortMyScene Full Stack Developer Hiring Assignment.
