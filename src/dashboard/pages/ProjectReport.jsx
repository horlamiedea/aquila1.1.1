import { BiChevronDown} from "react-icons/bi";
import Navbar from "../components/nav/Navbar";

import { BsAndroid2, BsFillFolderFill } from "react-icons/bs";
import { useState } from "react";

// const datas = [
//   {
//     category: "LoremIpsum dolor Sit amet consectur",
//     severity: "meduim",
//   },
//   {
//     category: "LoremIpsum dolor Sit amet consectur",
//     severity: "meduim",
//   },
//   {
//     category: "LoremIpsum dolor Sit amet consectur",
//     severity: "meduim",
//   },
//   {
//     category: "LoremIpsum dolor Sit amet consectur",
//     severity: "meduim",
//   },
// ];

const ProjectReport = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-grey2 h-screen">
      <Navbar />
      <div className="w-[80%] mx-auto h-full pt-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <BsFillFolderFill />
            <p>Kuda Bank</p>
          </div>
        </div>

        <div className="shadow-md bg-white w-full h-[7rem] rounded-md flex flex-col justify-center pl-10 ">
          <div className="flex gap-14">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-gold rounded-full p-2">
                <BsAndroid2 size={20} color="white" />
              </div>
              <div className="">
                <p>kuda_bank_v1.1_apk</p>
                <p>Lite</p>
              </div>
            </div>
            <div className="">
              <p>platorm</p>
              <p>Android</p>
            </div>
            <div className="">
              <p>Size</p>
              <p>32MB</p>
            </div>
            <div className="">
              <p>Scan Type</p>
              <p>Static Analysis</p>
            </div>
            <div className="">
              <p>MD5</p>
              <p>00000000000001</p>
            </div>
          </div>
          <div className="flex gap-3 ml-12 my-1 text-sm">
            <button className="bg-gold py-1 px-2 rounded-md text-white">
              Download
            </button>
            <button className="bg-gold py-1 px-2 rounded-md text-white">
              Send to Mail
            </button>
            <button className="bg-gold py-1 px-2 rounded-md text-white">
              Rescan
            </button>
          </div>
        </div>
        <div className="flex bg-accent justify-between gap-1 w-full mt-4 h-full">
          <div className="w-[30%] flex flex-col  bg-white">
            <div className="p-4">
              <p>Vulnerabilities (9)</p>
            </div>
            <div className="px-4 flex flex-col">
              <div
                onClick={() => setShow(!show)}
                className="flex justify-between mb-3"
              >
                <p>High</p>
                <div className="flex gap-1 items-center">
                  <p className="bg-red text-sm px-1.5 text-white">3</p>
                  <BiChevronDown className={`${show ? "rotate-180" : ""}`} />
                </div>
              </div>
             {show && <div className="duration-1000">
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
              </div>}
            </div>
            <div className="p-4 flex flex-col">
              <div
                onClick={() => setShow(!show)}
                className="flex justify-between mb-3"
              >
                <p>High</p>
                <div className="flex gap-1 items-center">
                  <p className="bg-red text-sm px-1.5 text-white">3</p>
                  <BiChevronDown className={`${show ? "rotate-180" : ""}`} />
                </div>
              </div>
             {show && <div className="duration-1000">
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
              </div>}
            </div>
            <div className="p-4 flex flex-col">
              <div
                onClick={() => setShow(!show)}
                className="flex justify-between mb-3"
              >
                <p>High</p>
                <div className="flex gap-1 items-center">
                  <p className="bg-red text-sm px-1.5 text-white">3</p>
                  <BiChevronDown className={`${show ? "rotate-180" : ""}`} />
                </div>
              </div>
             {show && <div className="duration-1000">
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
                <div className=" text-sm bg-grey2 p-2 my-1 rounded-md">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex gap-2 items-center">
                    <div className="bg-red w-0.5 h-4"></div>
                    <p>Severity : High</p>
                  </div>
                </div>
              </div>}
            </div>
          </div>
          <div className="w-[80%] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectReport;
