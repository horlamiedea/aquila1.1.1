import Logo from "../../assets/Aquila-Logo 1.png";
import { Link } from "react-router-dom";

const Verified = () => {
  return (
   <div >
     <div className="container" >
      
        <a href="/">
          <img
            src={Logo}
            alt="logo"
            className="ml-12 my-12"
          />
        </a>
     

      <div className="flex flex-col items-start ml-24 md:ml-10 sm:ml-8 ">
        <p className="w-[90%] text-3xl bg-red  py-4 px-4 rounded-lg text-white ml-6 sm:w-[80%] sm:text-xl">Account Verified</p>
        <div className=" p-6 ">
          <p className="my-4 text-2xl sm:text-xl">Your account has been verified</p>
          <p className="my-6 text-xl">Proceed to the login page</p>
          <p className="my-6 text-xl font-semibold">
            Remember to use the same email address you provided
          </p>
          <p className="my-6 text-xl">Click the button to go to the login screen</p>
          <div className="mt-16 mb-8">
          <Link to="/login" className="text-xl bg-red text-white rounded-lg py-4 px-8  " id="verifyBtn">
             Go to Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Verified;
