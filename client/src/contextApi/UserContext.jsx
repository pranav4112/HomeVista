import {createContext, useEffect, useState} from "react";
import axios from "axios";
// import {data} from "autoprefixer";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user) {
      axios.get(`${import.meta.env.VITE_APP_API}/user/profile?token=${token}`).then(({data}) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}