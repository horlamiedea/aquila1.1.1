import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { BsChevronLeft } from "react-icons/bs";
import bg2 from "../../assets/monitor2.png";
import bg1 from "../../assets/monitor.png";

import Logo from "../../assets/Aquila-Logo 1.png";
import { Link } from "react-router-dom";
function Monitor() {
  return (
    <>
      <div className="bg-red flex flex-col md:flex md:flex-row">
          <Link to="/">
            <BsChevronLeft size={30} className="m-4 text-white " />
          </Link>
          <div className="w-full md:w-1/2 h-[36rem] md:h-screen flex flex-col justify-center items-center">


          
            <div className=" flex flex-col justify-center items-center ">
              <p className="  text-2xl font-lato font-semibold  text-white uppercase leading-relaxed text-center">
                Get Business Insights <br />& statistics into your <br />{" "}
                protected app with
              </p>
              <div className="flex justify-between w-64 bg-white p-2 rounded-lg text-2xl font-lato font-extrabold text-grey">

                <p className="text-red">AQUILA&apos;S</p> <p>MONITOR</p>
              </div>
            </div>
          
            <div
              className="absolute top-0 left-36 md:left-[38rem]   h-96 w-1/2 "
              style={{
                backgroundImage: `url(${bg1})`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="absolute bottom-0 left-0  h-52 w-1/2"
              style={{
                backgroundImage: `url(${bg2})`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
        </div>
        <div className="relative bg-white w-full md:w-1/2 h-[34rem] md:h-screen flex flex-col items-center pt-12 md:pt-64 md:mt-0">

          <img src={Logo} alt="logo" className="-mt-28" />
          <div className="text-grey text-center mt-8">
            <p className="uppercase text-xs font-lato">Stay tuned</p>
            <p className="uppercase text-4xl mt-8 font-lato font-bold">
              Coming Soon
            </p>
          </div>
          <div className="mt-20">
            <p className="text-grey text-xs mb-2 text-center">
              Join the waitlist today and get notified when we release this
              feature.
            </p>
            <div className="flex flex-col  md:flex md:flex-row">
              <input
                type="text"
                placeholder="Enter your email address"
                className="py-2 pl-4 pr-20 border border-[#ACACAC99] rounded-lg"
              />
              <button className="bg-grey text-white py-2 px-4 rounded-lg font-lato mt-4 md:mt-0 md:ml-4">
                Notify Me
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 ">
            <div className=" w-32 flex justify-between  text-sm  mx-auto">
              <div className="w-8 h-8 rounded-full bg-grey2 pt-2.5 pl-2 mb-4 hover:bg-grey">
                <a href="https://www.instagram.com/aquilasec/">
                  <FaInstagram color="#fff" />
                </a>
              </div>
              <div className="w-8 h-8 rounded-full bg-grey2 pt-2 pl-2 hover:bg-grey">
                <a href="https://twitter.com/ETHNOSLTD">
                  <FaXTwitter color="#fff" />
                </a>
              </div>
              <div className="w-8 h-8 rounded-full bg-grey2 pt-2.5 pl-2 hover:bg-grey">
                <a href="https://www.linkedin.com/company/aquilasec/">
                  <FaLinkedin color="#fff" />
                </a>
              </div>
            </div>
            <p className="text-grey mb-4 md:mb-0">
              Copyright &#169; all Rights Reserved, 2023.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Monitor;
