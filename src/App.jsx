import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/* import Home from './pages/Home';
 */ import Login from "./pages/Login";
import Register from "./pages/Register";
/* import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import RoomDetails from './pages/RoomDetails'; */

export default function App() {
  return (
    <Router>
      <Routes>
        {/*         <Route path="/" element={<Home />} />
         */}{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/room/:id" element={<RoomDetails />} /> */}
      </Routes>
    </Router>
  );
}
