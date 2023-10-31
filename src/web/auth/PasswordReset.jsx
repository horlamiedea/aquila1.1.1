import ImgLeft from "../../assets/a.png";
import ImgRight from "../../assets/aa.png";
import Logo from "../../assets/Aquila-Logo 1.png";
import LoginRightImage from "../../assets/SVGss.png";


import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";


const getTokenFromURL = () => {
  return new URLSearchParams(window.location.search).get("token");
};

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function PasswordReset() {
    const navigate = useNavigate();

    const errRef = useRef();
    const [password, setPassword] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
 
    const [clicked, setClicked] = useState(false);
    const [token, setToken] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setToken(getTokenFromURL());
    }, []);
  
    useEffect(() => {
      setValidPwd(PWD_REGEX.test(password));
      setValidMatch(password === matchPwd);
    }, [password, matchPwd]);
  
    useEffect(() => {
      setErrMsg("");
    }, [password, matchPwd]);
  
   
  
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setClicked(true);
  
      if (!password || !validPwd || !validMatch || !matchPwd) {
        return;
      }
  
      setIsLoading(true);
  
      try {
        const response = await api.post(
          '/auth/set-new-password/',
          { token, password, password1: matchPwd }
        );
  
        console.log(response);
  
        toast.success("Password reset successfully");
        navigate("/login");
      } catch (error) {
        if (error) {
          setIsLoading(false);
        }
        if (error) {
          console.log(error, "new");
          // toast.error(`${error.response.data.error}`);
          return;
        }
        toast.error("Network Error");
      } finally {
        setIsLoading(false);
      }
    };
  

  return (
    <div className="flex relative w-full justify-center items-center h-screen bg-grey2 ">
      <div className=" bg-white w-full z-10 shadow-lg md:w-[80%] h-auto py-8 md:rounded-md ">
      <div className="text-center md:text-left mt-8  md:mt-0 md:ml-20">
                <img src={Logo} className="w-[7rem] mx-auto md:mx-0" />
                <p>Reset your Password</p>
              </div>
        <div className="flex gap-6 flex-col-reverse mx-6 md:flex-row justify-around items-center h-full md:mx-16">
        <div className="w-full md:w-[60%]">
            <div className="flex flex-col justify-center">
           

              <form onSubmit={handleSubmit}>
             
                <input
                  id="resetPassword"
                  
                  type="password"
                  placeholder="Set New Password"
                  
                  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="bg-grey2  my-5 py-2 pl-5 rounded-sm outline-none w-full"
                 
                
                 
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                {!password && clicked && (
                  <p className="text-[10px] md:text-[12px] text-red mb-1 ml-3.5">
                    Password input field cannot be empty
                  </p>
                )}

                
                <input
                  id="resetPasswordConfirmation"
                  type="password"
                  placeholder="Confirm New Password"
                  
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  name="confirmPassword"
                  className="bg-grey2  mb-5 py-2 pl-5 rounded-sm outline-none w-full"
                  
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
  <p
                  id="confirmnote"
                  className={
                    (matchFocus && !validMatch && matchPwd) ||
                    (!matchPwd && clicked)
                      ? "inline-block text-red text-sm text-left w-full ml-4"
                      : "hidden"
                  }
                >
                  Must match the first password input field.
                </p>
                <button
                  id="resetPasswordBtn"
                  type="submit"
                  className="bg-red py-2 text-white rounded-sm w-full"

                  disabled={isLoading}
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
          <div className=" w-[40%]">
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
}

export default PasswordReset;
