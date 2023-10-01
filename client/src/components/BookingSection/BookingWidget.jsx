import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "../../contextApi/UserContext.jsx";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookingWidget({place}) {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);


  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    try{
      const response = await axios.post(import.meta.env.VITE_APP_API  + '/bookings', {
        checkIn,checkOut,numberOfGuests,name,phone,
        place:place._id,
        placeOwner : place.owner,
        price:numberOfNights * place.price,
      });
      toast.success('Booked Successfully', {
        position : "top-right",
        autoClose: 3000,
        theme: "dark",
        });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    }
    catch (error) {
      if(error.response.status === 401){
        toast.warning(`${error.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          });
        setRedirect("/login");
      }
      else{
        toast.warning(`${error.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          });
      }
    } 
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-bcgr shadow p-4 rounded-2xl">
      <div className="text-2xl text-yellow-400 text-center">
        Price: ${place.price} / per night
      </div>
      <div className="rounded-2xl mt-4">
        <div className="flex justify-around">
          <div className="py-3 px-4 mr-5 border-r-2 border-gray-500">
            <label htmlFor="datein" >Check in:</label>
            <input type="date" id="datein"
                  className="rounded-2xl bg-dark_bg mt-3 border-gray-500 text-gray-400"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="py-3 px-4">
            <label htmlFor="dateout">Check out:</label>
            <input type="date" id="dateout" className="rounded-2xl bg-dark_bg mt-3 border-gray-500 text-gray-400" value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
        </div>

        <div className="py-3 px-4 border-t mt-3">
          <label htmlFor="guest">Number of guests:</label>
          <input type="number" id="guest"
                 placeholder="Enter total guest"
                 className=" bg-dark_bg text-gray-400"
                 value={numberOfGuests}
                 onChange={ev => setNumberOfGuests(ev.target.value)}/>
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <div>
              <label htmlFor="name">Your full name:</label>
              <input type="text" id="name"
                    className="bg-dark_bg text-gray-400"
                    value={name}
                    placeholder="Enter your name"
                    onChange={ev => setName(ev.target.value)}/>
            </div>
            <div className="mt-3">
            <label htmlFor="phone">Phone number:</label>
              <input type="tel" id="phone"
                      className="bg-dark_bg text-gray-400"
                      placeholder="Enter phone no..."
                    value={phone}
                    onChange={ev => setPhone(ev.target.value)}/>
            </div>
            
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-3">
        Book this place
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}