import file from "../../../assets/scan/terms-24.png";
import file2 from "../../../assets/scan/file.png";
function ComprehensiveReporting() {
  return (
    <div className="bg-grey h-[99rem]  md:h-auto ">
      <p className="text-white md:text-5xl md:text-center lg:uppercase py-8 md:py-12  md:font-semibold font-lato text-3xl text-center ">
        Comprehensive Vulnerability Reporting
      </p>
      
      
      <div className=" md:w-full  flex flex-col-reverse md:flex-row md:items-center mt-12 md:mt-4 md:px-12 lg:px-32">
        <div className="md:w-full">
          <p className="md:w-4/5 text-white md:py-8 text-xl  font-lato  md:text-left px-8 lg:px-0 mt-4 md:mt-0">
            By leveraging Aquilas powerful vulnerability detection capabilities,developers can proactively identify and address security weaknesses in their mobile applications. With our advanced static analysis techniques, comprehensive coverage, adherence to industry standards,and seamless integration, Aquila equips developers with the tools they need to build secure and resilient applications. Take the proactive approach to mobile application security with Aquilas
            vulnerability detection. Safeguard your applications and protect your users sensitive data from potential threats. Start your journey
            towards enhanced application security today.
          </p>
        </div>
        <div className="md:w-1/4 flex justify-center md:items-center md:mt-0 ">
          <img src={file} alt=""  />
        </div>
      </div>
      
      
      
      
      
      
      <div className="md:py-12">
        <div className=" md:w-full  flex flex-col md:flex-row md:items-center mt-12 md:mt-4 md:px-12 lg:px-32">
          <div className="md:w-3/4 flex justify-center md:items-center">
            <img src={file2} alt="" />
          </div>
          <div className="md:w-full">
            <p className="md:w-full text-white md:py-8 text-xl  font-lato  md:text-left px-8 lg:px-0 mt-4 md:mt-0">
              When it comes to mobile application security, identifying and
              addressing vulnerabilities is of utmost importance. At Aquila, our
              web-based software goes the extra mile by providing comprehensive
              vulnerability reporting capabilities. With Aquila, developers can
              effectively enhance the security and robustness of their mobile
              applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComprehensiveReporting;
