import { Link } from "react-router-dom";
import ImgLeft from "../../assets/a.png";
import ImgRight from "../../assets/aa.png";
import Logo from "../../assets/Aquila-Logo 1.png";
import LoginRightImage from "../../assets/SVGss.png";

import { useState } from "react";
// import ResetPassword from "assets/forgot-password.svg";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);

    if (!email) return;

    setIsLoading(true);

    try {
      const response = await api.post("/auth/request-password-reset/", {
        email,
      });

      console.log(response);

      toast.success("Check email for verification");
    } catch (err0r) {
      if (error.response?.status === 400) {
        setError(error.response.data.error);
        toast.error(`${error.response.data.error}`);
      } else {
        setError("Network Error");
        toast.error("Network Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex relative w-full justify-center items-center h-screen bg-grey2 text-grey ">
      <div className=" bg-white w-full z-10 shadow-lg md:w-[80%]  md:h-auto py-8 md:rounded-md ">
              <div className="text-center md:absolute   md:text-left  md:mt-0 md:ml-16">
                <img src={Logo} className="w-[7rem] mx-auto md:mx-0" />
                <p>Reset your password</p>
              </div>
        <div className="  flex flex-col-reverse mx-6 md:flex-row justify-around md:mt-6 items-center h-full md:mx-10">
          <div className="w-full md:w-[60%]">
            <div className="flex flex-col justify-center">

              <form onSubmit={handleSubmit}>
                <input
                  id="foretPasswordEmailInput"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Enter Email"
                  className={`bg-grey2 ${
                    !email && clicked ? "mb-1" : "mb-3"
                  } mt-0 md:mt-5 py-3 pl-5 rounded-sm outline-none w-full`}
                />
                {!email && clicked && (
                  <p className="text-[10px] md:text-sm text-secondary2 ml-3 mb-3 text-red">
                    Email input field cannot be empty
                  </p>
                )}
                <button
                  id="forgetPasswordBtn"
                  type="submit"
                  disabled={isLoading}
                  className="bg-red py-2 text-white rounded-sm w-full"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>

              <div className="text-center text-[12px] mt-4">
                <Link to="/login">Go back to Login</Link>
              </div>
            </div>
          </div>
          <div className="w-[60%] md:w-[40%] mb-10 md:mb-0">
            <div className="flex flex-col justify-center items-center">
              <img src={LoginRightImage} />
              <div className="text-center mt-6">
                <p>Scan Your Mobile Applications</p>
                <p className="text-[12px] w-[15rem]">
                  Detects Vulnerabilities such as weak authenticatin, reverse
                  engineering and insufficient encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img src={ImgLeft} className="absolute left-0 h-screen" />
      <img src={ImgRight} className="absolute right-0   h-screen" />
      <img />
    </div>
  );
};

export default ResetPassword;
