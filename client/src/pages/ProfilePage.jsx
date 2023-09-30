import {useContext, useState} from "react";
import {UserContext} from "../contextApi/UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import UserPlacesPage from "./UserPlacesPage.jsx";
import AccountNav from "../components/AccountNavbar/AccountNav.jsx";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post(import.meta.env.VITE_APP_API + '/user/logout');
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
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {/* {subpage === 'places' && (
        <UserPlacesPage />
      )} */}
    </div>
  );
}