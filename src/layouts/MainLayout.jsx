import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header";
import { Outlet } from "react-router-dom"; 

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-[#FFF8EC] flex min-h-screen w-full items-stretch">
      <Sidebar />
      <div id="main-content" className="flex-1 flex flex-col min-w-0"> 
        <Header />
           <Outlet /> 
      </div>
    </div>
  );
}