import { Link, useNavigate } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import { BiBell, BiSolidChevronDown } from "react-icons/bi";
import Logo from "../../../assets/Aquila-Logo 1.png";
import api from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { ADD_PROFILE } from "../../../redux/slice/appState";
import ProfileUpdateForm from "../../../web/auth/profileForm";
import { useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const user = useSelector((state) => state.appState.profile);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // const {refresh} = JSON.parse(localStorage.getItem("user"))

    try {
      // await api.post("/auth/logout/", {refresh})
      localStorage.removeItem("user");
      localStorage.removeItem("report");
      localStorage.removeItem("currentProject");
      toast.success("You have been Logged out")
      navigate("/")
    } catch (error) {
      console.log(error);
    }

   
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
  
    // Attach the listener
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      // Clean up the listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      dispatch(ADD_PROFILE(res.data));

      if (res?.data?.last_name === null) {
        setShowModal(true);
      }

 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="relative">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-xl mx-4">
            <ProfileUpdateForm />
          </div>
        </div>
      )}
      <div className="fixed bg-white w-full h-16 shadow-md z-20 ">
        <div className="flex items-center justify-between w-[80%] mx-auto mt-3 ">
          <Link to="/">
            <img
              src={Logo}
              alt="aquila_logo"
              className="w-[5rem] md:w-[5rem] cursor-pointer bg-white "
            />
          </Link>
          <div className="flex items-center gap-2 justify-center md:gap-3">
            <Link
              to="/dashboard"
              className="flex justify-center items-center gap-1"
            >
              <AiFillAppstore color="red" />{" "}
              <span className="hidden md:block">All Apps</span>
            </Link>
            <BiBell color="red" className="cursor-pointer " />
            <div
              onClick={() => setOpenDropdown(!openDropdown)}  ref={modalRef}
              className="flex justify-center relative items-center gap-1 cursor-pointer "
            >
              <span>{user?.username}</span>
              <BiSolidChevronDown color="red" />
              {openDropdown && <div className="absolute  duration-500 rounded-lg flex flex-col right-2  drop-shadow-md w-28 md:right-1 bg-grey2 h-12 top-8 z-50">
                <p onClick={handleLogout} className="pl-3 py-2">Logout</p>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
