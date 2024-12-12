import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "./components/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageDetailCard from "./components/pageDetailsCard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/pagecard" element={<PageDetailCard />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
