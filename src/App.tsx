import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "./components/UserProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
