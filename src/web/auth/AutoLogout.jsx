

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT_USER } from "../../redux/slice/auth";
import { Link, useNavigate } from "react-router-dom";

const AutoLogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) return;

    let timer;

    const handleInactivity = () => {
   
      localStorage.removeItem("user");
      localStorage.removeItem("report");
      localStorage.removeItem("currentProject");
      localStorage.setItem("isLoggedIn", "false");
      dispatch(LOGOUT_USER());

      setIsModalOpen(true);
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleInactivity,  1800000); 
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [dispatch]);

  const redirectToLogin = () => {
    setIsModalOpen(false);
    navigate("/login");
  };


  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-grey bg-opacity-50 overflow-y-auto  z-50 flex justify-center items-center">
          <div className="bg-white w-1/2 rounded-lg text-grey">
            <p className="py-2 px-4 font-montserrat font-semibold">
              SESSION EXPIRED
            </p>
            <hr className="text-grey2"/>
            <p className="py-2 px-4">
              Your session has expired due to inactivity. You have been
              automatically logged out
            </p>
            <p className="p-4 text-3xl font-semibold">00 : 00</p>
            <p className="py-2 px-4">
              To start a new session, select{" "}
              <Link to="/login" className="font-montserrat font-semibold ">
                Login
              </Link>
            </p>
            <hr className="text-grey2"/>
            <div className="flex justify-end py-2 px-4">
              <button
                onClick={redirectToLogin}
                id="ok-btn"
                className="bg-red text-white py-2 px-4 rounded-lg"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoLogoutComponent;
