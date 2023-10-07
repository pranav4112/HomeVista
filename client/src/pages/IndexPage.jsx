import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../components/ImageSrc/Image.jsx";

export default function IndexPage() {
  const [places,setPlaces] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_API + '/places').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 rounded-2xl grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} className="hover:scale-105 transition-transform">
          <div className="mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
            )}
          </div>
          <div className="text-txt">
            <h2 className="font-bold  text-base lg:text-lg">{place.address}</h2>
            <h3 className=" text-base lg:text-md text-gray-400">{place.title}</h3>
            <div className="mt-2">
              <span className="font-bold text-base lg:text-lg text-yellow-400">${place.price}</span> per night
            </div>
          </div>
          
        </Link>
        
      ))}
    </div>
  );
}
