import {Link, useParams} from "react-router-dom";
import AccountNav from "../components/AccountNavbar/AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../components/ImageSrc/PlaceImg";

export default function PlacesPage() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_API + '/user/user-places').then(({data}) => {
      setPlaces(data);
    });
  }, []);
  
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/'+place._id}  className="flex gap-5 bg-bcgr text-txt rounded-2xl overflow-hidden">
            <div className="w-1/3">
              <PlaceImg place={place} />
            </div>
            <div className="p-5 pr-3 w-2/3 flex flex-col gap-3 text-gray-300">
              <h2 className="text-xl text-center">{place.title}</h2>
              <p className="mt-2 text-gray-400">{place.description}</p>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
}