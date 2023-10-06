import {createContext, useEffect, useState} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {data} from "autoprefixer";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user && token!==null) {
      axios.get(import.meta.env.VITE_APP_API + '/user/profile'+`?token=${token}`)
      .then(({data}) => {
        setUser(data);
        setReady(true);
        // console.log('user',user);
      })
      .catch(err => {
        console.log(err.response.data.message);
        toast.warning(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          });
        localStorage.removeItem('token');
        navigate('/login');
      });
      
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser,ready,setReady}}>
      {children}
    </UserContext.Provider>
  );
}