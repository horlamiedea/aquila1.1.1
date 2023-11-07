


import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const COMPANY_REGEX = /^[a-zA-Z0-9\s\-!@#$%^&*()_+={}[\]:;"'<>,.?/|]*$/;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const FIRSTNAME_REGEX = /^.{4,}$/;
const LASTNAME_REGEX = /^.{4,}$/;
const JOBTITLE_REGEX = /^.{2,}$/;
const PHONENUMBER_REGEX = /^\+\d{1,4}\d*$/;


const ProfileUpdateForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const [user, setUser] = useState("");
  
    const [submitted, setSubmitted] = useState(false);
    
    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);
  
    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);
  

  
    const [jobTitle, setJobTitle] = useState("");
    const [validJobTitle, setValidJobTitle] = useState(false);
    const [jobTitleFocus, setJobTitleFocus] = useState(false);
  
    const [phoneNumber, setPhoneNumber] = useState("");
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);
  
    const [company, setCompany] = useState("");
    const [validCompany, setValidCompany] = useState(false);
    const [companyFocus, setCompanyFocus] = useState(false);
  
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
  
   
  
    // const [originalEmail, setOriginalEmail] = useState(null);
  
    useEffect(() => {
      setValidFirstName(FIRSTNAME_REGEX.test(firstName));
    }, [firstName]);
  
    useEffect(() => {
      setValidLastName(LASTNAME_REGEX.test(lastName));
    }, [lastName]);
  
    
  
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
      setValidPhoneNumber(PHONENUMBER_REGEX.test(phoneNumber));
    }, [phoneNumber]);
  
   
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await api.get("/auth/profile/"); 
          setEmail(response.data.email);
          // setOriginalEmail(response.data.email);
          
        } catch (error) {
          toast.error("Failed to fetch user profile.");
        }
      };
  
      fetchUserProfile();
    }, []);
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setSubmitted(true)
      
      const payload = {
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle,
        company,
        phone_number: phoneNumber,
      };
  
      // if (email !== originalEmail) { // Only add email to the payload if it's changed
      //   payload.email = email;
      // }
  
      try {
        await api.patch("/auth/profile/", payload);
        toast.success("Profile Updated Successfully!");
        setIsLoading(false);
        navigate('/login');
      } catch (error) {
        setIsLoading(false);
        if (error.response?.status === 400) {
          toast.error(error.response.data.email[0]); 
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    };
  
    return (


    <>
      
      <form onSubmit={handleUpdate}>
      <div className="flex flex-col justify-center">
        <p className="py-2 font-semibold">Please update your profile</p>
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
                  

                  <div className="flex flex-col w-4/5 md:w-full">
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
                        (jobTitle &&
                          !validJobTitle &&
                          (!jobTitleFocus || submitted)) ||
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
                    // onChange={(e) => setEmail(e.target.value)}
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
                {/* <div className="flex gap-2  justify-between flex-col md:flex-row">
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
                      Password must be atleast 8 characters, uppercase,
                      lowercase, numbers and special character.
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
                </div> */}

                <div className="w-4/5 md:w-full">
                 

                  <button
                    
                    className="bg-red py-2 mt-6 text-white rounded-sm w-full "
                  >
                    {isLoading ? (
               <i className="fa-solid fa-spinner fa-spin-pulse"></i>
             ) : (
               "Update Profile"
             )}
                  </button>
                </div>
              </div>
      </form>
      
    </>)
}

  export default ProfileUpdateForm;