import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../contextApi/UserContext.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(import.meta.env.VITE_APP_API + "/user/login", {email,password});
      console.log(data);
      setUser(data.user);
      toast.success(`Welcome ${data.user.name}`, {
        position : "top-right",
        autoClose: 3000,
        theme: "dark",
        });
        localStorage.setItem('token', data.token);
      setRedirect(true);
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        });
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 md:flex-1 lg:py-0 "> 
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-bcgr border-gray-500">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                    <input type="email" name="email" id="email" className="block w-full p-2.5 sm:text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="your@email.com" required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="block w-full p-2.5 sm:text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border rounded bg-gray-700 border-gray-600 focus:ring-primary ring-offset-gray-800" required="" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-300">Remember me</label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium  hover:underline text-primary">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-400 hover:bg-yellow-500 focus:ring-primary">Sign in</button>
                <p className="text-sm font-light text-gray-400">
                    Don't have an account yet? <Link to="/register" className="font-medium hover:underline text-primary">Sign up</Link>
                </p>
            </form>
        </div>
      </div>
    </div>
  );
}