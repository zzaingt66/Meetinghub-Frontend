import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterForm } from "./components/Register";
import { RoomDetails } from "./components/RoomDetails";
import { Login } from "./components/Login";
import { BookingForm } from "./components/Booking";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/rooms/:roomId" element={<RoomDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking/:roomId" element={<BookingForm />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
