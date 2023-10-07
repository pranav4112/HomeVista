import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../components/BookingSection/BookingWidget";
import PlaceGallery from "../components/PhotoGallery/PlaceGallery";
import AddressLink from "../components/LocationLink/AddressLink";
import PerksIcons from "../components/PlaceFormSection/PerksIcons";

export default function PlacePage() {
  const {id} = useParams();
  const [place,setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`${import.meta.env.VITE_APP_API}/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';



  return (
    <div className=" mt-2 md:mt-8 bg-dark_bg text-gray-300 lg:-mx-20 md:-mx-9 -mx-6 rounded-lg px-8 pt-8 grid grid-cols-1 md:grid-cols-2 md:grid-flow-row gap-4">
      <div className="md:col-span-2 rounded-2xl">
        <PlaceGallery place={place}  />
      </div>
      <div className="bg-bcgr rounded-2xl p-5  text-gray-300 md:row-span-1">
        <h2 className="font-semibold text-2xl">{place.title}</h2>
        <AddressLink>{place.address}</AddressLink>
      </div>

      <div className="bg-bcgr md:row-span-3 rounded-2xl">
        <BookingWidget place={place} />
      </div>

      <div className="md:row-span-2 bg-bcgr rounded-2xl p-5">
          <h2 className="font-semibold mb-4 text-2xl ">Description</h2>
          <p className="block text-gray-400">{place.description}</p>         
      </div>

      <div className="md:row-span-1 bg-bcgr rounded-2xl p-5">
        <p>Check-in: {place.checkIn}</p><br/>
        <p>Check-out: {place.checkOut}</p><br/>
        <p>Max number of guests: {place.maxGuests}</p>
      </div> 

      <div className="md:row-span-2 bg-bcgr rounded-2xl p-5">
        <h2 className="font-semibold text-2xl mb-4">Perks offered</h2>
        {place.perks.length > 0 && place.perks.map((perk) => {
          return(
            <div className="flex flex-row gap-3 p-2  font-medium text-xl text-gray-400 border-b-2 border-gray-700">
              <PerksIcons name={perk}/>
              {perk}
            </div>
          )
        })}
      </div>

      <div className="md:row-span-1 bg-bcgr rounded-2xl p-5">
        <h2 className="font-semibold text-2xl mb-4">Extra info</h2>
        <div className="mb-4 text-gray-400">{place.extraInfo}</div>
      </div>
    </div>
  );
}
