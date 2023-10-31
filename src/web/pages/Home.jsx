import Cards from "../components/LandingPage/Cards";
import Counter from "../components/LandingPage/Counter"
import HeroSection from "../components/LandingPage/Hero";
import Intro from "../components/LandingPage/Intro";
import Navbar from "../components/LandingPage/Navbar";
import Products from "../components/LandingPage/Services/Products";
import Blog from "../components/LandingPage/Blog";
import Footer from "../components/LandingPage/Footer";
import Bg from "../../assets/scan/bg2.png";
import ProductBg from "../../assets/products.png";
import ChatPopUp from "../Chat/ChatPopUp";

function Home() {
  return (
    <div className=" overflow-hidden">
      <Navbar />
      <HeroSection />
      
      <div
        className="md:bg-no-repeat md:bg-center-left md:inset-0 md:h-[100rem]  "
        style={{
          backgroundImage: `url(${Bg})`,
        }}
      >
        <Intro />
        <Cards />
<Counter />
      </div>


      <div className="md:mb-20 lg:mb-40  px-6 ">
        <div className="md:mt-52 lg:mt-28">
        <p className="text-grey text-xl lg:text-5xl md:text-3xl  font-semibold text-center">
          Improve Your Decision Making With{" "}
        </p>
        <p className="text-gold font-semibold lg:text-5xl md:text-3xl text-center">
          Comprehensive Vulnerability Reporting
        </p>
        </div>
      </div>
      <div
        className="bg-no-repeat bg-right bg-grey2 opacity-90 inset-0 lg:min-h-[10rem]  "
        style={{
          backgroundImage: `url(${ProductBg})`,
        }}
      >
        <Products />
      </div>
      <div
        className="bg-no-repeat bg-left inset-0 lg:h-[99rem]  overflow-hidden "
        style={{
          backgroundImage: `url(${Bg})`,
        }}
      >
        <Blog />
      <Footer />
      </div>
      <ChatPopUp/>
    </div>
  );
}

export default Home;
