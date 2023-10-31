
import Hacking1 from "../../../assets/Guide/hacking01.jpg";
import Hacking2 from "../../../assets/Guide/hacking02.jpg";
import Hacking3 from "../../../assets/Guide/hacking03.jpg";

function Intro() {
  return (
    <div className="w-[90%]  py-8 px-12 ">
     
      <p className="text-2xl pb-4 text-center ">
        Aquila Mobile Application Security Overview
      </p>
      {/* <p className="text-xl pb-4">Introduction</p> */}
      <p className="pb-4 text-justify">
        Aquila is a comprehensive software solution designed to scan, protect,
        and monitor mobile applications for vulnerabilities on both Android and
        iOS platforms. With the increasing usage of mobile applications and the
        growing threat landscape, it has become crucial for organizations to
        ensure the security of their mobile apps. Aquila offers a powerful set
        of features to identify vulnerabilities, protect against potential
        attacks, and continuously monitor mobile applications for ongoing
        security threats. This document provides an overview of Aquila's
        capabilities and how it can enhance the security of your mobile
        applications.
      </p>
      

      <div className=" flex flex-col justify-center items-center py-12">
        <p className="text-2xl pb-2 ">Common security threats to your apps</p>
        <p className="pb-4">
          Attacks can cost a lot to your business if proper security measures
          are not followed
        </p>
        <img src={Hacking1} alt="security threat" className="my-4" />
      </div>

      <div className=" flex flex-col justify-center items-center py-12">
        <p className="text-2xl pb-2">
          Most Apps are vulnerable to hacking attacks
        </p>
        <p className="pb-4 text-justify">
          Hackers have evolved so are the attacks which led to financial loss,
          impact on brand reputation and exposure to liability.
        </p>

        <img src={Hacking2} alt="security threat" className="my-4" />
      </div>


      <div className=" flex flex-col justify-center items-center py-12">
        <p className="text-2xl pb-2">
          Trusted Application Security Service
        </p>
        <p className="pb-4 text-center">
          With the most robust application security technology, our real time security gives you Faster, Accurate Run-Time Protection
        </p>

        <img src={Hacking3} alt="security threat" className="my-4" />
      </div>
      <p className="pb-4 text-justify">
        Aquila is a powerful software solution for mobile application security
        that helps organizations identify vulnerabilities, protect against
        potential threats, and continuously monitor the security posture of
        their mobile applications. By integrating Aquila into the development
        lifecycle, organizations can proactively identify and address security
        weaknesses, ensuring the safety and integrity of their mobile
        applications. With its comprehensive scanning, robust threat protection,
        and continuous monitoring capabilities, Aquila provides the necessary
        tools to enhance mobile app security in an evolving threat landscape.
      </p>
    </div>
  );
}

export default Intro;
