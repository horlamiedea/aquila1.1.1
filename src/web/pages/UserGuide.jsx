import { useState } from "react";
import Footer from "../components/LandingPage/Footer";
import Navbar from "../components/LandingPage/Navbar";
import Intro from "../components/Guide/Intro";
import KeyFeatures  from "../components/Guide/KeyFeatures";
import UserFlow from "../components/Guide/UserFlow";
import Dashboard from "../components/Guide/Dashboard";


const UserGuide = () => {
    const [activeLink, setActiveLink] = useState("introduction");
  
    const handleNavLinkClick = (link) => {
      setActiveLink(link);
    };
  
    const renderContent = () => {
      switch (activeLink) {
        case "introduction":
          return <Intro />;
        case "keyFeatures":
          return <KeyFeatures />;
        case "userFlow":
          return <UserFlow />;
        case "dashboard":
          return <Dashboard />;
        default:
          return null;
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <div className="flex flex-1 mt-20">
          <div className="w-1/4 fixed h-full bg-gray-200">
            <nav className="flex flex-col p-4 space-y">
              <button
                className={`p-2 mb-2 rounded ${
                  activeLink === "introduction"
                    ? "border-l-4 border-indigo-500 bg-gray-300 text-left pl-4    "
                    : "text-left pl-4"
                }`}
                onClick={() => handleNavLinkClick("introduction")}
              >
                Introduction
              </button>
              <button
                className={`p-2 mb-2 rounded ${
                  activeLink === "keyFeatures"
                    ? "border-l-4 border-indigo-500 bg-gray-300 text-left pl-4"
                    : "text-left pl-4 "
                }`}
                onClick={() => handleNavLinkClick("keyFeatures")}
              >
                Key Features
              </button>
              <button
                className={`p-2 mb-2 rounded ${
                  activeLink === "userFlow"
                    ? "border-l-4 border-indigo-500 bg-gray-300 text-left pl-4"
                    : "text-left pl-4 "
                }`}
                onClick={() => handleNavLinkClick("userFlow")}
              >
                User Flow
              </button>
              <button
                className={`p-2 mb-2 rounded ${
                  activeLink === "dashboard"
                    ? "border-l-4 border-indigo-500 bg-gray-300 text-left pl-4"
                    : "text-left pl-4"
                }`}
                onClick={() => handleNavLinkClick("dashboard")}
              >
                Dashboard
              </button>
            </nav>
          </div>
          <div className="w-3/4 ml-[25%] overflow-y-auto">
            {renderContent()}
          </div>
        
        </div>
        <div className=" mt-auto z-10"> 
        <Footer/>
  
        </div>
      </div>
    );
  };
  
  export default UserGuide;