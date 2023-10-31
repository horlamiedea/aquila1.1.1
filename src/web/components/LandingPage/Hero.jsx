import heroSmall from '../../../assets/heroSmall.jpg';
import hero1 from '../../../assets/hero1.png';
import hero2 from '../../../assets/hero2.png';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    isSmallScreen ? (
      <div className="relative h-[26rem]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroSmall})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right center',
          }}
        ></div>
  
        <div className="absolute inset-0 text-grey flex flex-col justify-center items-center">
          <p className="text-4xl font-bold text-center">
            Seamlessly <br />
            <b className="text-gold">Secure </b>
            <br />
            Your Mobile <br />
            Applications
          </p>
          <button className="py-2 px-4 text-white bg-red rounded-lg mt-8">
            Start Free Trial
          </button>
        </div>
      </div>
    ) : (
      <section className="md:flex ">
        {/* Left side: Text */}
        <div className="md:w-1/2 md:h-[24rem] lg:h-[36rem] relative md:top-14 md:flex md:flex-col md:justify-center md:items-center  lg:flex lg:flex-col lg:justify-center lg:items-center">
          <div className="" >
            <p className="font-montserrat md:text-3xl lg:text-5xl md:text-grey md:leading-[3rem] lg:leading-[4rem] font-semibold text-grey">
              Seamlessly <br /> <b className="text-gold">Secure</b> Your <br /> Mobile<br /> Applications
            </p>
            <div className="md:flex mt-4">
            <a href="/signup">
           <button className="bg-red text-white py-2 px-4 rounded-lg text-sm">Start Free Trial</button>
              <button className="border border-red text-grey py-2 px-4 font-semibold rounded-md ml-6 text-sm">Learn more</button></a>
            </div>
          </div>
        </div>
  
        {/* Right side: Overlapping Images */}
        <div className="md:w-2/3 relative top-14 md:z-2 ">
          <img src={hero2} alt="Image 2" className="absolute  right-0 z-20 md:h-[24rem] md:w-[40rem] lg:h-[35rem] lg:w-[46rem]" />
          <img src={hero1} alt="Image 1" className="absolute md:w-[22rem] lg:w-[32rem] right-0 z-10 " />
        </div>
      </section>
  ));
};

export default HeroSection;



