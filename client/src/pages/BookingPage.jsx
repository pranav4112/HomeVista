import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../components/LocationLink/AddressLink";
import PlaceGallery from "../components/PhotoGallery/PlaceGallery";
import BookingDates from "../components/BookingSection/BookingDates";
import { UserContext } from "../contextApi/UserContext";

export default function BookingPage() {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    try{
      const token = localStorage.getItem('token');
      if (id) {
        axios.get(import.meta.env.VITE_APP_API + '/bookings'+`?token=${token}`).then(response => {
          const foundBooking = response.data.find(({_id}) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      }
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
    
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className="my-10">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-dark_bg my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-yellow-400 p-4 font-semibold text-xl text-dark_bg rounded-3xl">
          <div>Total price: <span className="font-bold">${booking.price}</span> </div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}