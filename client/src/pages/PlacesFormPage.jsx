import PhotosUploader from "../components/PlaceFormSection/PhotosUploader.jsx";
import Perks from "../components/PlaceFormSection/Perks.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../components/AccountNavbar/AccountNav.jsx";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../contextApi/UserContext.jsx";

export default function PlacesFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(import.meta.env.VITE_APP_API + '/places/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl text-txt mb-2">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-400 text-sm mb-2">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    const token = localStorage.getItem('token');
    if (id) {
      // update
      try{
        await axios.put(import.meta.env.VITE_APP_API + '/places'+`?token=${token}`, {
          id, ...placeData
        });
        toast.success("Property updated", {
          position : "top-right",
          autoClose: 3000,
          theme: "dark",
          });
        setRedirect(true);
      }
      catch(err){
        toast.warning(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          });
          setUser(null);
          localStorage.removeItem('token');
          navigate('/login');
        
      }
      
    } else {
      // new place
      try{
        await axios.post(import.meta.env.VITE_APP_API + '/places'+`?token=${token}`, placeData);
        toast.success("Property Added successfully", {
        position : "top-right",
        autoClose: 3000,
        theme: "dark",
        });
      setRedirect(true);
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
        else if(err.response.status === 400){
          toast.error(`${err.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            });
        }
      }
      
    }

  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <div className=" rounded-2xl grid grid-cols-2 gap-3">
          <div className="bg-bcgr p-3 rounded-2xl">
            {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
            <input type="text" className="bg-dark_bg text-txt" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
          </div>

          <div className="bg-bcgr p-3 rounded-2xl">
            {preInput('Address', 'Address to this place')}
            <input type="text" className="bg-dark_bg text-txt" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address..."/>
          </div>
          
          <div className="bg-bcgr p-3 rounded-2xl col-span-2">
            {preInput('Photos','more = better')}
            <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
          </div>
          
          <div className="bg-bcgr p-3 rounded-2xl">
            {preInput('Description','description of the place')}
            <textarea className="bg-dark_bg text-txt" placeholder="Add description about this place..." value={description} onChange={ev => setDescription(ev.target.value)} />
          </div>
          
          <div className="bg-bcgr p-3 rounded-2xl">
            {preInput('Perks','select all the perks of your place')}
            <Perks selected={perks} onChange={setPerks} />
          </div>
          
          <div className="bg-bcgr p-3 rounded-2xl col-span-2">
            {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
            <div className="grid gap-3 grid-cols-2 ">
              <div>
                <h3 className="mt-2 mb-1">Check in time</h3>
                <input type="text"
                        className="bg-dark_bg text-txt" 
                      value={checkIn}
                      onChange={ev => setCheckIn(ev.target.value)}
                      placeholder="14"/>
              </div>
              <div>
                <h3 className="mt-2 mb-1">Check out time</h3>
                <input type="text"
                        className="bg-dark_bg text-txt" 
                      value={checkOut}
                      onChange={ev => setCheckOut(ev.target.value)}
                      placeholder="11" />
              </div>
              <div>
                <h3 className="mt-2 mb-1">Max number of guests</h3>
                <input type="number" className="bg-dark_bg text-txt" value={maxGuests}
                      onChange={ev => setMaxGuests(ev.target.value)}
                      placeholder="Maximum Guests..."/>
              </div>
              <div>
                <h3 className="mt-2 mb-1">Price per night</h3>
                <input type="number" className="bg-dark_bg text-txt" value={price}
                      onChange={ev => setPrice(ev.target.value)}
                      placeholder="Per night price.."/>
              </div>
            </div>
          </div>     

          <div className="bg-bcgr p-3 rounded-2xl col-span-2">
            {preInput('Extra info','house rules, terms/conditions, etc')}
            <textarea className="bg-dark_bg text-txt" placeholder="Add some extra info..."  value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
          </div>
          
          <div className=" col-span-2">
            <button className="primary my-4 ">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}