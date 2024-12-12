import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import ProfilePage from "./components/UserProfile";
=======
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


>>>>>>> 1274d629bd19ee45bfda2ec870a2b099b4ce752c

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<ProfilePage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
