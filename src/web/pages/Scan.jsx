import Navbar from "../components/LandingPage/Navbar"
import Hero from "../components/Scan/Hero"
import Bg from "../../assets/scan/bg2.png"
import Intro from "../components/Scan/Intro"
import ComprehensiveReporting from "../components/Scan/ComprehensiveReporting"
import CardGrid from "../components/Scan/Features"
import Footer from "../components/LandingPage/Footer"
// import ChatPopUp from "../Chat/ChatPopUp"

function Scan() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <div
      className="md:bg-no-repeat md:bg-center-left md:inset-0 md:mt-40   md:h-[172rem]   "
      style={{
        backgroundImage: `url(${Bg})`,
        
      }}
    >
      <Intro/>
      <ComprehensiveReporting/>
      <CardGrid/>
    <Footer/>
    </div>
    {/* <ChatPopUp/> */}

    </div>
  )
}

export default Scan
