import Header from "./components/Header/Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-5xl mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}
