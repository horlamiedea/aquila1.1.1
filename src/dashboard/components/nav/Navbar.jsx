import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import Logo from "../../../assets/Aquila-Logo 1.png";
import api from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ADD_PROFILE } from "../../../redux/slice/appState";
import ProfileUpdateForm from "../../../web/auth/profileForm";
import { useState } from "react";




const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.appState.profile);

  const dispatch = useDispatch();






  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      dispatch(ADD_PROFILE(res.data));

      if (res?.data?.last_name === null) {
        setShowModal(true);
      }
      
      console.log(res, 'res')
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    fetchProfile()  
  }, []);





  return (
    <div className="relative">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-xl mx-4">
          
            
              <ProfileUpdateForm  />
           
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
              <AiFillAppstore color="red" /> <span className="hidden md:block">All Apps</span>
            </Link>
            <BiBell color="red" className="cursor-pointer " />
            <div className="flex justify-center items-center gap-1 cursor-pointer ">
              <span>{user?.username}</span>
              {/* <BiSolidChevronDown /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;