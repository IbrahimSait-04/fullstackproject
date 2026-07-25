import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import AdminHome from './admin/adminPages/AdminHome';
import UserLists from './admin/adminPages/UserLists';
import AdminLogin from './admin/adminComponents/AdminLogin';
import AddCar from './admin/adminPages/AddCar';
import CarList from './admin/adminPages/CarList';
import MyBooking from './pages/MyBooking';
import AllBookings from './admin/adminPages/AllBookings';

function App() {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      {/* Admin Routes */}
      <Route path='/adminLogin' element={<AdminLogin />} />
      <Route path='/adminhome' element={<AdminHome />} />
      <Route path='/getusers' element={<UserLists />} />
      <Route path='/addCar' element={<AddCar />} />
      <Route path='/allbooking' element={<AllBookings />} />

      {/*User Routes */}
      <Route path='/home' element={<Home />} />
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/myrentals' element={<MyBooking />} />
      </Routes> 
    </BrowserRouter>
   </div>
  );
}

export default App;
