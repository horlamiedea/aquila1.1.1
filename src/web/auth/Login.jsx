import { Link, useNavigate } from "react-router-dom";
import ImgLeft from "../../assets/a.png";
import ImgRight from "../../assets/aa.png";
import Logo from "../../assets/Aquila-Logo 1.png";
import LoginRightImage from "../../assets/SVGs.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import api from "../../services/api";
import { isEmail } from "../../dashboard/utils/UtilFunction";
import { LOGIN_USER } from "../../redux/slice/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const disPatch = useDispatch();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!email || !password) {
      return toast.error("Fill in email and password");
    }
    try {
      setIsLoading(true);
      const res = await api.post("/api/token/", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      disPatch(LOGIN_USER(res.data));
      toast.success("Login Successful");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      if (error) {
        setIsLoading(false);
      }
      if (error.response?.status === 401) {
        toast.error(`${error.response.data.detail}`);
        return;
      }
      toast.error("Network Error");
    }
  };

  
  return (
    <div className="flex relative  w-full justify-center items-center h-screen bg-grey2 text-grey ">
      <div className=" bg-white w-full z-10 shadow-lg md:w-[80%] h-auto py-8 md:rounded-md ">
        <div className="text-center md:text-left mt-8  md:mt-0 md:ml-20">
          <img src={Logo} className="w-[7rem] mx-auto md:mx-0" />
          <p>Log In to access Aquila</p>
        </div>
        <div className="flex gap-6 flex-col-reverse mx-6 md:flex-row justify-around items-center h-full md:mx-16">
          <div className="w-full md:w-[60%]">
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <label
                  htmlFor="password"
                  className="font-lato text-sm mb-1 ml-4 mt-3 text-grey"
                >
                  Work email*
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  value={email}
                  className={`py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2 ${
                    !email && !submitted ? "mb-3" : "mb-1"
                  }   py-2 pl-5 rounded-sm outline-none`}
                />
                {!email && submitted && !isEmail(email) && (
                  <p className="text-[10px] md:text-[12px] text-red mb-1 ml-3.5">
                    Invalid email or email field empty
                  </p>
                )}

                <label
                  htmlFor="password"
                  className="font-lato text-sm mb-1 ml-5 mt-2 text-grey"
                >
                  Password*
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  className={`py-2 pl-5  outline-none bg-white rounded-md border-2 border-grey2 ${
                    !password && submitted ? "" : " mb-4 "
                  }`}
                />
                {!password && submitted && (
                  <p className="text-[10px] md:text-[12px] text-red mb-2 ml-3.5">
                    Password field cannot be empty
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-red py-2 text-white rounded-md"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <div className="text-center text-[12px] mt-4">
                <Link to="/forget-password">Forgot Password?</Link>
                <p>
                  Do not have an Account?{" "}
                  <span>
                    <Link to="/signup">Sign Up Now</Link>
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[60%] md:w-[40%]">
            <div className="flex flex-col justify-center items-center">
              <img src={LoginRightImage} />
              <div className="text-center mt-6">
                <p>Protect Your Mobile Application</p>
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

export default Login;
