import {useContext, useState} from "react";
import {UserContext} from "../contextApi/UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import UserPlacesPage from "./UserPlacesPage.jsx";
import AccountNav from "../components/AccountNavbar/AccountNav.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post(import.meta.env.VITE_APP_API + '/user/logout');
    toast.success("Logged out successfully", {
      position : "top-right",
      autoClose: 3000,
      theme: "dark",
      });
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className=" flex gap-4 flex-col justify-center items-center  text-lg max-w-lg mx-auto">
          <p className="mb-3">Username : <span className="text-lg font-semibold text-yellow-400">{user.name}</span> </p>
          <p >Email : <span className="text-lg font-semibold text-yellow-400">{user.email}</span> </p>
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
    </div>
  );
}