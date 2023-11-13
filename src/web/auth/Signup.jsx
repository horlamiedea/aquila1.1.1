import ImgLeft from "../../assets/a.png";
import ImgRight from "../../assets/aa.png";
import Logo from "../../assets/Aquila-Logo 1.png";
import LoginRightImage from "../../assets/SVGsreg.png";
import { useEffect, useState } from "react";
// import api from "../../services/api";
import { BiSolidChevronDown } from "react-icons/bi";
import { toast } from "react-toastify";


import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../services/baseUrl";

// const COMPANY_REGEX = /^[A-Za-z0-9 ]*$/;
const COMPANY_REGEX =/^[a-zA-Z0-9 ]{1,}$/;


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USERNAME_REGEX = /^.{4,}$/;
const FIRSTNAME_REGEX = /^.{4,}$/;
const LASTNAME_REGEX = /^.{4,}$/;
const JOBTITLE_REGEX = /^.{2,}$/;
const PHONENUMBER_REGEX = /^\+\d{1,4}\d*$/;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const [user, setUser] = useState("");
  
  const [submitted, setSubmitted] = useState(false);
  const [showText, setShowText] = useState(false);
  const [storedEmail, setStoredEmail] = useState("")

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [validJobTitle, setValidJobTitle] = useState(false);
  const [jobTitleFocus, setJobTitleFocus] = useState(false);

  // const [lastname, setLastname] = useState("");
  // const [validLastName, setValidLastName] = useState(false);
  // const [lastnameFocus, setLastnameFocus] = useState(false);


  // const [jobtitle, setJobtitle] = useState("");
  // const [validJobTitle, setValidJobTitle] = useState(false);
  // const [jobtitleFocus, setJobtitleFocus] = useState(false);



  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [company, setCompany] = useState("");
  const [validCompany, setValidCompany] = useState(false);
  const [companyFocus, setCompanyFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // useEffect(() => {
  //   usernameRef.current.focus();
  // }, []);

  
  useEffect(() => {
    setValidFirstName(FIRSTNAME_REGEX.test(firstName));
  }, [firstName]);
  
  useEffect(() => {
    setValidLastName(LASTNAME_REGEX.test(lastName));
  }, [lastName]);
  
  useEffect(() => {
    setValidName(USERNAME_REGEX.test(username));
  }, [username]);


  useEffect(() => {
    setValidJobTitle(JOBTITLE_REGEX.test(jobTitle));
  }, [jobTitle]);



 

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidCompany(COMPANY_REGEX.test(company));
  }, [company]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setValidPhoneNumber(PHONENUMBER_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      !firstName ||
      !lastName ||
      !username ||
      !jobTitle ||
      !email ||
      !lastName ||
      !jobTitle ||
      !password ||
      !company ||
      !matchPassword ||
      !phoneNumber
    ) {
      return toast.error("Fill all fields");

    }
    if (
      !validMatch ||
      !validPassword ||
      !validEmail ||
      !validCompany ||
      !validPhoneNumber ||
      !validFirstName ||
      !validJobTitle ||
      !validLastName
    )
      return;
    try {

      setIsLoading(true);
      setStoredEmail(email)
      await axios.post(`${baseURL}/auth/register/`, {
        first_name: firstName,
        last_name: lastName,
        username,
        job_title: jobTitle,
        email,
        company,
        password,
        phone_number: phoneNumber,
      });

      // toast.success("Account Created, check email for verification");
      setFirstName("");
      setLastName("");
      setUsername("");
      setJobTitle("");
      setEmail("");
      setCompany("");
      setMatchPassword("");
      setPassword("");
      setPhoneNumber("");
      setIsLoading(false);
      setSubmitted(false);
      // navigate("/verified");
      setShowText(true)
    } catch (error) {
      if (error) {
        setIsLoading(false);
       
      }
      if (error.response?.status === 400) {
        if (error.response.data.errors.email) {
          toast.error(`${error.response.data.errors.email[0]}`);
          return;
        }
        if (error.response.data.errors.phone_number) {
          toast.error(`${error.response.data.errors.phone_number[0]}`);
          return;
        }
        if (error.response.data.errors.company) {
          toast.error(`${error.response.data.errors.company[0]}`);
          return;
        }
      }
      if (error.response?.status === 401) {
        toast.error(`${error.response.data.detail}`);
        return;
      }
      toast.error("Network Error");
    }
  };
  

  return (
    <div className="flex relative w-full justify-center items-center h-screen bg-grey2 text-grey ">
      <div className=" bg-white w-full z-10 shadow-lg md:w-[70%] h-auto py-8 lg:rounded-md relative ">

      {showText && 
      <div className=" min-w-fit absolute  top-32 lg:top-8 md:top-6 right-6  md:right-4 lg:right-12  py-3 px-5 bg-accent rounded-lg"> 
       <p>Verification link has been sent to</p> <p className="font-semibold text-grey">{storedEmail}</p> 
      </div>}
        <div className="text-center md:text-left mt-40 md:mt-0 md:ml-20">
          <img src={Logo} className="w-[7rem] mx-auto md:mx-0" />
          <p className="text-sm md:text-lg">
            Start with your free <br/>account Today
          </p>
        </div>
        <div className=" flex flex-col-reverse mx-6 md:flex-row justify-around items-center h-full md:mx-10">
          <div className="w-full md:w-[50%]">
            <div className="flex flex-col justify-center">
              <div className="flex  flex-col gap-2 justify-between md:flex-row">
                <div className="flex flex-col w-4/5 md:w-1/2">
                  <label
                    htmlFor="FirstName"
                    className="font-lato text-sm mb-1 ml-2 text-grey mt-2"
                  >
                    First name*
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
                  />
                  <p
                    id="uidnote"
                    className={
                      (firstName &&
                        !validFirstName &&
                        (!firstNameFocus || submitted)) ||
                      (!firstName && submitted && !validFirstName)
                        ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                        : "hidden"
                    }
                  >
                    FirstName must be at least 4 characters
                  </p>
                </div>

                <div className="flex flex-col w-4/5 md:w-1/2">
                  <label
                    htmlFor="Last Name"
                    className="font-lato text-sm mb-1 ml-2 mt-2 text-grey"
                  >
                    Last name*
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                    onChange={(e) => setLastName(e.target.value)}
                    className=" py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
                  />
                  <p
                    id="uidnote"
                    className={
                      (lastName &&
                        !validLastName &&
                        (!lastNameFocus || submitted)) ||
                      (!lastName && submitted && !validLastName)
                        ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                        : "hidden"
                    }
                  >
                    Last name must be at least 4 characters
                  </p>
                </div>
              </div>



              <div className="flex gap-2 justify-center flex-col md:flex-row">
              <div className="flex flex-col  w-4/5 md:w-1/2">
              <label
                    htmlFor="Work Email"
                    className="font-lato text-sm mb-1 ml-2 mt-2 text-grey"
                  >
                   Username*
                  </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                
                className=" py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
              />
              <p
                id="uidnote"
                className={
                  (username && !validName && (!usernameFocus || submitted)) ||
                  (!username && submitted && !validName)
                    ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                    : "hidden"
                }
              >
             Username must be atleast four characters
              </p>

              </div>

              <div className="flex flex-col w-4/5 md:w-1/2">
              <label
                    htmlFor="Job Tittle"
                    className="font-lato text-sm mb-1 ml-2 mt-2 text-grey"
                  >
                    Job Title*
                  </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onFocus={() => setJobTitleFocus(true)}
                onBlur={() => setJobTitleFocus(false)}
                
                className=" py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
              />
              <p
                id="uidnote"
                className={
                  (jobTitle && !validJobTitle && (!jobTitleFocus || submitted)) ||
                  (!jobTitle && submitted && !validJobTitle)
                    ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                    : "hidden"
                }
              >
                Use a valid job Title
              </p>

              </div>
              </div>
              <div className="flex flex-col  w-4/5 md:w-full">
              <label
                    htmlFor="Work Email"
                    className="font-lato text-sm mb-1 ml-2 mt-2 text-grey"
                  >
                    Work Email*
                  </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                
                className=" py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
              />
              <p
                id="uidnote"
                className={
                  (email && !validEmail && (!emailFocus || submitted)) ||
                  (!email && submitted && !validEmail)
                    ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                    : "hidden"
                }
              >
                Use a valid Business Email Address
              </p>

              </div>

              <div className="flex gap-2 justify-between flex-col md:flex-row">
                <div className="flex flex-col w-4/5 md:w-1/2">
                <label
                    htmlFor="Phone Number"
                    className="font-lato text-sm mb-1 ml-2 mt-2 text-grey"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onFocus={() => setPhoneNumberFocus(true)}
                    onBlur={() => setPhoneNumberFocus(false)}
                    
                    className=" py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
                  />
                  <p
                    id="pwdnote"
                    className={
                      (phoneNumber &&
                        !validPhoneNumber &&
                        (!phoneNumberFocus || submitted)) ||
                      (!phoneNumber && submitted && !validPhoneNumber)
                        ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                        : "hidden"
                    }
                  >
                    Invalid Phone number or must contain country code
                  </p>
                </div>
                <div className="flex flex-col w-4/5 md:w-1/2">
                <label
                    htmlFor="Company Name"
                    className="font-lato text-sm mb-1 ml-2 mt-2 text-grey"
                  >
                    Company name*
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    onFocus={() => setCompanyFocus(true)}
                    onBlur={() => setCompanyFocus(false)}
                    
                    className="py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
                  />
                  <p
                    id="uidnote"
                    className={
                      (company &&
                        !validCompany &&
                        (!companyFocus || submitted)) ||
                      (!company && submitted)
                        ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                        : "hidden"
                    }
                  >
                    Company Name cannot include special charaters
                  </p>
                </div>
              </div>
              <div className="flex gap-2  justify-between flex-col md:flex-row">
                <div className="flex flex-col w-4/5 md:w-1/2 ">
                <label
                    htmlFor="password"
                    className="font-lato text-sm mb-1 ml-2 mt-2 text-grey"
                  >
                    Password*
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    
                    className="py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
                  />
                  <p
                    id="pwdnote"
                    className={
                      (password &&
                        !validPassword &&
                        (!passwordFocus || submitted)) ||
                      (!password && submitted && !validPassword)
                        ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                        : "hidden"
                    }
                  >
                    Password must be atleast 8 characters, uppercase, lowercase,
                    numbers and special character.
                  </p>
                </div>
                <div className="flex flex-col w-4/5 md:w-1/2">
                <label
                    htmlFor="password"
                    className="font-lato text-sm mb-1 ml-2 mt-2 text-grey"
                  >
                    Confirm Password*
                  </label>
                  <input
                    type="password"
                    value={matchPassword}
                    id="confirm_pwd"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                   
                    className="py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2"
                  />
                  <p
                    id="uidnote"
                    className={
                      (matchPassword && !validMatch) ||
                      (!matchPassword && submitted)
                        ? "inline-block text-red text-[10px] ml-1  text-left md:ml-4  w-full md:text-[12px]"
                        : "hidden"
                    }
                  >
                    Must match the first password input field.
                  </p>
                </div>
              </div>

              
              <div className="w-4/5 md:w-full">
              <div className="flex  mt-2   items-center px-2 py-2 pl-5  outline-none bg-white  rounded-md border-2 border-grey2 w-4/8">
             
             <select className="appearance-none  text-grey  border-none w-full focus:outline-none ">
               <option value="">How did you hear about Aquila</option>
               <option value="linkedIn">LinkedIn</option>
               <option value="facebook">Facebook</option>
               <option value="Instagram">Instagram</option>
               <option value="twitter">Twitter</option>
               <option value="word of mouth">Word of Mouth</option>
             </select>
             <BiSolidChevronDown />
           </div>
           <button
             onClick={handleSubmit}
             className="bg-red py-2 mt-2 text-white rounded-sm w-full"
           >
             {isLoading ? (
               <i className="fa-solid fa-spinner fa-spin-pulse"></i>
             ) : (
               "Sign Up"
             )}
           </button>
              </div>
              <div className="text-center text-[12px] mt-4">
                <Link to="/login">Already a User? Login</Link>
              </div>
            </div>
          </div>
          <div className="w-[60%] md:w-[35%] my-4 md:my-0 ">
            
            <div className="flex flex-col justify-center items-center">
              <img src={LoginRightImage} />
              <div className="text-center mt-6">
                <p>Scan Your Mobile Applications</p>
                <p className="text-[12px] w-[15rem]">
                  Detects Vulnerabilities such as weak authentication, reverse
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

export default Signup;
