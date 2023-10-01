import "./App.css";
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import {UserContextProvider} from "./contextApi/UserContext";
import ProfilePage from "./pages/ProfilePage.jsx";
import UserPlacesPage from "./pages/UserPlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import UserBookingsPage from "./pages/UserBookingsPage";
import BookingPage from "./pages/BookingPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <ToastContainer/>
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<UserPlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<UserBookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    </>
  )
}

export default App
