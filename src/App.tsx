import { Route , Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";

export default function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
  );
}
