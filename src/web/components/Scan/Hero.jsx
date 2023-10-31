import scanHero from "../../../assets/scan/scanHero.jpg";




function Hero() {
  return (
    <div className="relative  top-16 h-[10rem] md:h-[14rem] lg:h-[18rem]">
      <img
        src={scanHero}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0  flex items-center justify-center text-white">
        <div className="">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold  font-lato ">AQUILA&apos;S SCAN</h1>
        </div>
      </div>
    </div>
  );
}

export default Hero;

