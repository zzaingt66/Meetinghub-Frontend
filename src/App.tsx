import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "./components/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterForm } from "./components/Register";
import { RoomDetails } from "./components/RoomDetails";
import { Login } from "./components/Login";
import { BookingForm } from "./components/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/rooms/:roomId" element={<RoomDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking/:roomId" element={<BookingForm />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
