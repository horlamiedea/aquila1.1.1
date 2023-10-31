
import { MdMail } from "react-icons/md";

import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Logo from "../../../assets/Aquila-Logo 1.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bottom-0 w-full   text-white bg-black overflow-hidden ">
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className=" flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-base text-center lg:text-left lg:text-xl sm:text-2xl">Let&apos;s help you get started.</p>
            <p className="text-xl lg:text-3xl sm:text-4xl mt-2">
              Try a free Vulnerability Scan.
            </p>
          </div>
          <div>
            <Link to="/signup">
              <button className="bg-red font-montserrat font-semibold text-white py-2 px-4 rounded-lg hover:bg-white hover:text-grey">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <hr className="w-4/5 border-t border-grey my-8 mx-auto" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <img src={Logo} alt="" className="mb-4 w-36 mx-auto lg:mx-0 " />
            <p className="text-white font-lato text-lg -mt-4 text-center lg:text-left ">
             Mobile Application Security Testing Platform
            </p>
            <div className="mt-8 mx-auto lg:mx-0 text-center lg:text-left mb-16 lg:mb-0 w-4/5">
              <p className="text-red text-2xl font-lato">About Us</p>
              <p className="font-lato text-lg">
                Advanced Mobile Security Application Testing Platform
              </p>
            </div>
            <div className="mt-8 text-red text-2xl font-lato text-center lg:text-left">
              Contact Us
            </div>
            <div className="flex flex-col mt-4 mb-16 lg:mb-0">
              
              <div className="flex items-center  mx-auto lg:mx-0">
                <div className="w-6 h-6 bg-red rounded-full flex items-center justify-center">
                  <MdMail />
                </div>
                <Link
                  to="mailto:support@aquilasec.io"
                  className="pl-4 hover:text-red font-lato text-lg"
                >
                  support@aquilasec.io
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="lg:mb-16 sm:mb-0 flex flex-col font-montserrat lg:mt-12 mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="text-2xl sm:text-2xl font-semibold text-red">
              RESOURCES
            </h2>
            <Link to="/" className="pt-2 mt-4 sm:pt-4 hover:text-red">
              Home
            </Link>
            <Link to="/#" className="pt-2 sm:pt-4 hover:text-red">
              Get In Touch
            </Link>
            <Link to="/user-guide" className="pt-2 sm:pt-4 hover:text-red">
              User Guide
            </Link>
          </div>

          {/* Column 3 */}
          <div className="lg:mb-16 sm:mb-0 flex flex-col mx-auto lg:mx-0 font-montserrat lg:mt-12 text-center lg:text-left">
            <h2 className="text-2xl sm:text-2xl font-semibold text-red">
              QUICK LINKS
            </h2>
            <Link to="/scan" className="pt-2 mt-4 sm:pt-4 hover:text-red">
              Scan
            </Link>
            <Link to="/protect" className="pt-2 sm:pt-4 hover:text-red">
              Protect
            </Link>
            <Link to="/monitor" className="pt-2 sm:pt-4 hover:text-red">
              Monitor
            </Link>
          </div>

          {/* Column 4 */}
          <div className="w-4/5 mx-auto md:w-full md:-mt-44 md:ml-[30rem] lg:ml-0 lg:mt-28 ">
            <p className="text-red text-lg font-lato font-extrabold capitalize lg:text-left text-center">
              Subscribe for more info
            </p>
            <input
              type="text"
              placeholder="Email"
              className="p-2 w-full sm:w-56 rounded-lg mt-2 text-grey outline-none"
            />
            <button className="bg-red text-white py-2 w-full sm:w-32 mt-4 rounded-lg cursor-pointer md:ml-12 lg:ml-0 hover:bg-black hover:border-2 hover:border-red">
              Subscribe
            </button>
          </div>
        </div>

     

        <p className="  text-lg lg:-mt-8 text-center pt-2 lg:text-right font-lato font-medium">
        Copyright &#169; all Rights Reserved, 2023.
        </p>
        <hr className="w-4/5  border-t border-grey my-8 mx-auto" />

        <div className=" flex justify-center items-center">
          <div className="w-28 flex justify-between text-red text-2xl ">
            <Link to="https://www.instagram.com/aquilasec/">
              <FaInstagram  className="hover:text-grey2"/>
            </Link>
            <Link to="https://twitter.com/ETHNOSLTD">
              <FaXTwitter  className="hover:text-grey2"/>
            </Link>
            <Link to="https://www.linkedin.com/company/aquilasec/">
              <FaLinkedin className="hover:text-grey2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
