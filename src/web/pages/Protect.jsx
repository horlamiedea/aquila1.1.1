import Navbar from "../components/LandingPage/Navbar"
import Hero from "../components/Protect/Hero"
import Bg from "../../assets/scan/bg2.png"
import Products from "../../assets/products.png"
import Footer from "../components/LandingPage/Footer"
import Intro from "../components/Protect/Intro"
import ReverseEngineering from "../components/Protect/ReverseEngineering"
import TamperProtection from "../components/Protect/TamperProtection"
import Code from "../components/Protect/Code"
import Suite from "../components/Protect/Suite"
// import ChatPopUp from "../Chat/ChatPopUp"

function Scan() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <p className="text-center text-grey mt-32 text-2xl px-8 md:text-4xl font-semibold font-lato">
        SHIELD YOUR <b className="text-gold  ">MOBILE APPLICATION</b>{" "}
        <br />
        FROM ITS BINARY FILE
      </p>
      <div
      className="bg-no-repeat bg-center-left inset-0 h-[90rem] md:h-[73rem] lg:h-[78rem] "
      style={{
        backgroundImage: `url(${Bg})`,
        marginTop:'32px'
      }}
    >
     <Intro/>
     <ReverseEngineering/>
    </div>
     <TamperProtection/>
     <div
      className="md:bg-no-repeat md:bg-right md:inset-0 md:h-[35rem] lg:h-[60rem] "
      style={{
        backgroundImage: `url(${Products})`,
      }}
    >
     <Code/>
     <Suite/>
    </div>
    <Footer/>
    {/* <ChatPopUp/> */}

    </div>
  )
}

export default Scan
