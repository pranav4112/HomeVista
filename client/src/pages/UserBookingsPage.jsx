import AccountNav from "../components/AccountNavbar/AccountNav";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../components/ImageSrc/PlaceImg";
import {Link, Navigate, useNavigate} from "react-router-dom";
import BookingDates from "../components/BookingSection/BookingDates";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../contextApi/UserContext";

export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    try{
      const token = localStorage.getItem('token');
      axios.get(import.meta.env.VITE_APP_API + '/bookings'+`?token=${token}`).then(response => {
        setBookings(response.data);
      });
    }
    catch(err){
      if(err.response.status === 401){
        toast.warning(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          });
          setUser(null);
          localStorage.removeItem('token');
          navigate('/login');
      }
    }
    
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="flex flex-col gap-4 md:mx-0 mx-3">
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex md:flex-row  flex-col md:gap-5 bg-bcgr text-txt rounded-2xl overflow-hidden hover:outline hover:outline-yellow-600">
            <div className="md:w-1/3 ">
              <PlaceImg place={booking.place} />
            </div>
            <div className="md:py-3 py-1 md:pr-3 md:grow flex flex-col md:gap-3 items-center text-gray-300">
              <h3 className="text-lg">{booking.place.title}</h3>
              <div className="md:text-xl text-sm">
                <BookingDates booking={booking} className="mb-2 mt-4 text-gray-400" />
              </div>
              <div className="flex gap-1 text-yellow-400 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span className="text-xl font-semibold">
                    Total price: ${booking.price}
                  </span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}