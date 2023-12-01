import { useState, useEffect, useRef } from "react";
import Logo from "../../../assets/Aquila-Logo 1.png";
import "../../../App.css";

import { FiChevronDown } from "react-icons/fi";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [services, setServices] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setServices(false);
      }
    };
  
    // Attach the listener
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      // Clean up the listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <nav className="bg-white shadow-lg md:px-4 lg:px-12 fixed z-40 w-full font-inter  ">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="w-full flex justify-between items-center space-x-4">
          <div>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          <div className="w-[40%]  flex justify-between">
            <div className="flex items-center">
              <Link
                to="/login"
                className="lg:hidden md:hidden border-2 border-red text-grey text-sm font-semibold p-1 px-2  rounded-lg  "
              >
                Free Trial
              </Link>
            </div>
            <div className="md:hidden flex">
              <button
                onClick={toggleMenu}
                className="text-3xl pr-2 focus:outline-none text-grey"
              >
                {isOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-[100rem] lg:w-[100rem] xl:w-[200rem] md:flex">
          <div className="hidden md:flex space-x-10 flex-grow justify-center text-base font-medium items-center text-grey">
            <div
              onClick={() => setServices(!services)} ref={modalRef}
                
              className=" cursor-pointer flex gap-x-2 items-center relative"
            >
              <p className="text-grey font-semibold">Services</p>
              <FiChevronDown color="red" />
              {services && (
                <div className="absolute rounded-lg flex flex-col overflow-hidden drop-shadow-md w-40 bg-white h-auto top-14 z-50">
                  <Link
                    to="/scan"
                    className="py-3  text-grey hover:bg-grey2 px-4 font-medium  cursor-pointer"
                  >
                    Scan
                  </Link>
                  <Link
                    to="/protect"
                    className="py-3  text-grey hover:bg-grey2 px-4 font-medium  cursor-pointer"
                  >
                    Protect
                  </Link>
                  <Link
                    to="/monitor"
                    className="py-3  text-grey hover:bg-grey2 px-4 font-medium  cursor-pointer"
                  >
                    Monitor
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="#"
              className="hover:underline hover:underline-offset-8 hover:decoration-red hover:decoration-4 font-semibold text-grey "
            >
              Contact
            </Link>
            <Link
              to="#"
              className="hover:underline hover:underline-offset-8 hover:decoration-red hover:decoration-4 font-semibold text-grey  "
            >
              Blog
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="bg-red text-white font-semibold py-2 px-4 rounded-lg cursor-pointer"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="text-grey border-2 border-red font-semibold py-2 px-4 rounded-lg cursor-pointer"
            >
              Free Trial
            </Link>
          </div>
        </div>
        {/* small scrren */}

        <div
          className={`md:hidden absolute top-[4.5rem] right-0 bg-grey
           w-full py-4 text-grey h-screen  ${
             isOpen ? "flex flex-col px-6  " : "hidden"
           }`}
        >
          <div className=" h-[40rem] w-full flex flex-col items-center text-center">
            <Link
              to="#"
              className="w-[40%] py-2 px-4 rounded-lg text-white cursor-pointer hover:bg-grey2 hover:text-grey"
              onClick={toggleMenu2}
            >
              Services
              <span className="ml-4">{isOpen2 ? "▲" : "▼"}</span>
            </Link>
            {isOpen2 && (
              <div className="flex flex-col  ">
                <Link
                  to="/scan"
                  className=" py-2 my-2  rounded-lg text-white cursor-pointer hover:bg-grey2 hover:text-grey text-center"
                >
                  Scan
                </Link>
                <Link
                  to="/protect"
                  className=" py-2 my-2 px-3 rounded-lg text-white cursor-pointer hover:bg-grey2 hover:text-grey text-center"
                >
                  Protect
                </Link>
                <Link
                  to="/monitor"
                  className=" py-2 my-2 px-3 rounded-lg text-white cursor-pointer hover:bg-grey2 hover:text-grey text-center"
                >
                  Monitor
                </Link>
              </div>
            )}

            <Link
              to="/#"
              className="w-[40%] py-2 my-8 px-4 rounded-lg text-white cursor-pointer hover:bg-grey2 hover:text-grey"
            >
              Contact
            </Link>
            <Link
              to="/#"
              className="w-[40%] py-2 mb-8 px-4 rounded-lg text-white cursor-pointer hover:bg-grey2 hover:text-grey"
            >
              Blog
            </Link>

            <Link
              to="/login"
              className="w-[40%] bg-white text-black font-semibold py-2 px-4  rounded-lg "
            >
              Sign In
            </Link>
            <div className="h-24  flex justify-center items-center ">
              <div className="w-44 flex justify-between text-grey text-2xl ">
                <div className="w-12 h-12 rounded-full bg-grey2 hover:bg-grey hover:text-white  ">
                  <Link to="https://www.instagram.com/aquilasec/">
                    <FaInstagram className="mt-3 ml-3" />
                  </Link>
                </div>
                <div className="w-12 h-12 rounded-full bg-grey2 hover:bg-grey hover:text-white ">
                  <Link to="https://twitter.com/ETHNOSLTD">
                    <FaXTwitter className="mt-3 ml-3" />
                  </Link>
                </div>
                <div className="w-12 h-12 rounded-full bg-grey2 hover:bg-grey hover:text-white ">
                  <Link to="https://www.linkedin.com/company/aquilasec/">
                    <FaLinkedin className="mt-3 ml-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
