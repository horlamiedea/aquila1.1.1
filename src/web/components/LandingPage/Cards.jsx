// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon1 from "../../../assets/cardIcons (1).png";
import Icon1b from "../../../assets/Icon1b.png";
import Icon2 from "../../../assets/cardIcons (2).png";
import Icon2b from "../../../assets/Icon2b.png";
import Icon3 from "../../../assets/cardIcons (3).png";
import Icon3b from "../../../assets/viewfinder2.png";
import Icon4 from "../../../assets/cardIcons (4).png";
import Icon4b from "../../../assets/Icon4.png";

const cards = [
  {
    title: "Scan & Vulnerability Detection",
    body: "Aquila scans and detects vulnerabilities, also explains the nature of the vulnerabilities. it’s potential consequences and fundamental causes. This detailed description allows developers to have a clear understanding of the issue at hand.",
    icon: Icon3,
  },

  {
    title: " Protect Features Best Suited For Your App",
    body: "The website design boasts a robust security infrastructure,encompassing features such as tamper detection and response, user-friendly implementation, secure data storage, anti-emulator protection, prevention of screenshots, and utilization of obfuscation techniques to ensure comprehensive protection.",
    icon: Icon1,
  },

  {
    title: "Monitor Your Mobile App in Real Time",
    body: "Aquila monitors apps behaviour in real time and sends alert on any unusual activities when detected and take automatic actions to help protect your app.",
    icon: Icon4,
  },

  {
    title: "Mobile App Security Consultancy",
    body: " We are your go-to team for making mobile apps security dreams a reality. We blend expertise, creativity, and startegy that people love. Our solutions are unique ensuring it your vision and goals perfectly. Feel free to reach out to our customer service if need be.",
    icon: Icon2,
  },
];

const Cards = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 767);

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };

  const handleMouseEnter4 = () => {
    setIsHovered4(true);
  };

  const handleMouseLeave4 = () => {
    setIsHovered4(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmallScreen ? (
    <div>
      <div className="text-center px-11 font-inter ">
        <p className="text-2xl font-semibold text-grey">
          Embark on Your Journey to
        </p>
        <p className="text-2xl font-semibold text-gold">
          Mobile App Security Excellence!
        </p>
        <p className="pt-4 font-inter text-lg text-grey   ">
          Aquila is Africa’s first indigenous mobile security testing platform,
          It’s not just another security tool, but a cutting-edge security
          platform that offers advanced scanning, protection, and monitoring
          capabilities for mobile applications. It analyzes application source
          code, identify weaknesses, coding errors, and potential exploits.
        </p>
      </div>

      {/* Cards section */}
      <div className="flex flex-col h-full justify-center items-center bg-grey2  my-10 ">
        {cards.map((item, index) => (
          <div
            key={index}
            className=" w-[70%]  flex flex-col items-center text-center my-12 font-inter"
          >
            <div className="w-full flex justify-center ">
              <img
                src={item.icon}
                alt=""
                className="w-16 h-16   my-4 object-cover"
              ></img>
            </div>
            <p className="text-grey font-lato text-2xl font-semibold">
              {item.title}
            </p>

            <p className="font-inter pt-2 text-lg text-grey">{item.body}</p>
            <Link to="/" className="bg-red py-2 px-4 text-white mt-6">
              Free Training
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    
    <div className="  md:flex md:flex-col md:justify-center ">
      <div className=" md:flex md:justify-center md:items-center md:mx-12 md:mb-32">
        <div className=" md:w-[90%]  md:h-[30rem] md:flex md:flex-col md:justify-center lg:ml-8">
          <p className="text-grey font-montserrat  font-semibold md:text-3xl ">
            Embark on <br />
            Your Journey to <br />
            <p className="text-gold font-montserrat font-bold">
              Mobile App Security
            </p>
            Excellence!
          </p>
          <p className="md:w-[95%] lg:w-[65%] text-grey md:text-sm  md:mt-4 font-lato ">
            Aquila is Africa’s first indigenous mobile security testing
            platform, It’s not just another security tool, but a cutting-edge
            security platform that offers advanced scanning, protection, and
            monitoring capabilities for mobile applications. It analyzes
            application source code, identify weaknesses, coding errors, and
            potential exploits.
          </p>
        </div>
        <div className=" md:w-[110%] lg:w-full  md:flex  ">
          <div className=" md:h-[90%] md:w-full  md:mx-auto  ">
            <div className="md:w-full md:flex relative">
              {/* card 1 */}
              <div className="w-1/2">
                <div
                  className="md:w-full lg:w-[90%] md:bg-white px-4 py-10 flex-1  shadow-2xl rounded-lg text-grey relative  "
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`w-16 h-16 flex flex-col justify-center items-center border-4 border-red rounded-full transition-transform transform hover:bg-red ${
                      isHovered ? "group-hover:scale-110 bg-red" : ""
                    }`}
                  >
                    <p>
                      <img
                        src={isHovered ? Icon3b : Icon3}
                        alt="icon"
                        className="text-white transition-opacity opacity-100 "
                      />
                    </p>
                  </div>
                  <p className="text-lg py-2 font-montserrat font-normal">
                    Scan & Vulnerability Detection
                  </p>
                  <p className="text-sm mb-8 font-lato font-normal">
                    Aquila scans and detects vulnerabilities, also explains the
                    nature of the vulnerabilities. it’s potential consequences
                    and fundamental causes. This detailed description allows
                    developers to have a clear understanding of the issue at
                    hand.
                  </p>
                  <Link
                    to="/"
                    className="bg-red text-white py-2 px-4 rounded-md mb-4"
                  >
                    Read More
                  </Link>
                </div>
                {/* card 2 */}
                <div
                  className="md:w-full  lg:w-[90%] md:bg-white px-4 py-10 flex-1  shadow-2xl rounded-lg text-grey relative  md:mt-8"
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                >
                  <div
                    className={`w-16 h-16 flex flex-col justify-center items-center border-4 border-red rounded-full transition-transform transform hover:bg-red ${
                      isHovered2 ? "group-hover:scale-110 bg-red" : ""
                    }`}
                  >
                    <p>
                      <img
                        src={isHovered2 ? Icon4b : Icon4}
                        alt="icon"
                        className="text-white transition-opacity opacity-100 "
                      />
                    </p>
                  </div>
                  <p className="text-lg py-2 font-montserrat font-normal">
                    Monitor Your Mobile App in Real Time
                  </p>
                  <p className="text-sm mb-8 font-lato font-normal">
                    Aquila monitors apps behaviour in real time and sends alert
                    on any unusual activities when detected and take automatic
                    actions to help protect your app.
                  </p>
                  <Link
                    to="/"
                    className="bg-red text-white py-2 px-4 rounded-md mb-4"
                  >
                    Read More
                  </Link>
                </div>
              </div>

              <div className="w-1/2 md:absolute md:top-20 md:left-[13rem] lg:left-[15rem] xl:left-[22rem]">
                <div
                  className="md:w-full lg:w-[85%] md:bg-white px-4 py-10 flex-1  shadow-2xl rounded-lg text-grey relative"
                  onMouseEnter={handleMouseEnter3}
                  onMouseLeave={handleMouseLeave3}
                >
                  <div
                    className={`w-16 h-16 flex flex-col justify-center items-center border-4 border-red rounded-full transition-transform transform hover:bg-red ${
                      isHovered3 ? "group-hover:scale-110 bg-red" : ""
                    }`}
                  >
                    <p>
                      <img
                        src={isHovered3 ? Icon1b : Icon1}
                        alt="icon"
                        className="text-white transition-opacity opacity-100 "
                      />
                    </p>
                  </div>
                  <p className="text-lg py-2 font-montserrat font-normal">
                    Protect Features Best Suited For Your App
                  </p>
                  <p className=" text-sm mb-8 font-lato font-normal">
                    The website design boasts a robust security infrastructure,
                    encompassing features such as tamper detection and response,
                    user-friendly implementation, secure data storage,
                    anti-emulator protection, prevention of screenshots, and
                    utilization of obfuscation techniques to ensure
                    comprehensive protection.
                  </p>
                  <Link
                    to="/"
                    className="bg-red text-white py-2 px-4 rounded-md"
                  >
                    Read More
                  </Link>
                </div>
                <div
                  className="md:w-full lg:w-[85%] md:bg-white px-4 py-10 flex-1  shadow-2xl rounded-lg text-grey relative mt-8"
                  onMouseEnter={handleMouseEnter4}
                  onMouseLeave={handleMouseLeave4}
                >
                  <div
                    className={`w-16 h-16 flex flex-col justify-center items-center border-4 border-red rounded-full transition-transform transform hover:bg-red ${
                      isHovered4 ? "group-hover:scale-110 bg-red" : ""
                    }`}
                  >
                    <p>
                      <img
                        src={isHovered4 ? Icon2b : Icon2}
                        alt="icon"
                        className="text-white transition-opacity opacity-100 "
                      />
                    </p>
                  </div>
                  <p className="text-lg py-2 font-montserrat font-normal">
                    Mobile App Security Consultancy
                  </p>
                  <p className=" text-sm mb-8 font-lato font-normal">
                    We are your go-to team for making mobile apps security
                    dreams a reality. We blend expertise, creativity, and
                    startegy that people love. Our solutions are unique ensuring
                    it your vision and goals perfectly. Feel free to reach out
                    to our customer service if need be.
                  </p>
                  <Link
                    to="/"
                    className="bg-red text-white py-2 px-4 rounded-md"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
