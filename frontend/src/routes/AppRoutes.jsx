import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventListPage from "../pages/EventListPage";
import EventDetailPage from "../pages/EventDetailPage";
import SeatSelectionPage from "../pages/SeatSelectionPage";
import BookingConfirmationPage from "../pages/BookingConfirmationPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventListPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/events/:id/seats" element={<SeatSelectionPage />} />
        <Route path="/booking/success" element={<BookingConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;