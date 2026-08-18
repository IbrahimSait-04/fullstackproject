import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./admin/adminPages/AdminHome";
import UserLists from "./admin/adminPages/UserLists";
import AdminLogin from "./admin/adminComponents/AdminLogin";
import AddCar from "./admin/adminPages/AddCar";
import MyBooking from "./pages/MyBooking";
import AllBookings from "./admin/adminPages/AllBookings";
import ForgotPass from "./pages/ForgotPass";
import Profile from "./pages/Profile";
import ResetPass from "./pages/ResetPass";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddLicense from "./pages/AddLicense";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/getusers" element={<UserLists />} />
          <Route path="/addCar" element={<AddCar />} />
          <Route path="/allbooking" element={<AllBookings />} />

          {/*User Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myrentals" element={<MyBooking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/reset-password/:id/:token" element={<ResetPass />} />
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/license" element={<AddLicense />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
