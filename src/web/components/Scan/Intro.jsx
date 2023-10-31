function Intro() {
  return (
    <div className="md:w-full h-[44rem] md:h-[38rem] flex flex-col mt-24 md:flex md:justify-center">
      <div className="md:h-[26rem] md:w-full md:flex md:justify-center px-12  ">
        <div className=" md:w-1/2 md:flex md:items-center md:justify-center ">
          <div className=" text-grey md:w-[90%]">
            <p className="text-2xl md:text-3xl font-semibold font-lato md:text-left text-center  ">
              Overview of Aquila’s Scan feature
            </p>
            <p className="text-lg md:text-xl mt-4 font-lato md:text-left text-justify ">
              Aquila employs sophisticated static scanning techniques to detect
              potential vulnerabilities in mobile applications. It analyzes the
              applications source code, identifying security weaknesses, coding
              errors, and potential exploits. The tool covers a wide range of
              vulnerabilities, including those specified by the OWASP - Open Web
              Application Security Project guidelines.
            </p>
          </div>
        </div>
        <div className=" md:h-full md:w-1/2 flex justify-center">
          <img
            src="http://res.cloudinary.com/da7zudna9/image/upload/v1695595177/magwvhhlpgfqpltsbndp.png"
            alt="scan screenshot"
            className="w-4/5 mt-12 md:mt-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Intro;
