import { PiAndroidLogo } from "react-icons/pi";
import { SiIos } from "react-icons/si";
import { useSelector } from "react-redux";
import icon from "../../../assets/sticker-24.png"


const ScanCom = () => {
    const { reports } = useSelector(
        (state) => state.appState
      );
      const file = true
  return (
    <div className="">
        <div
          className={`shadow-lg bg-white w-full mb-10  h-[25rem] rounded-md flex ${
            file ? "flex-col" : ""
          } mb-5 justify-center items-center`}
        >
          <div className="w-[90%] md:w-[80%] h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2 mt-5">
              <PiAndroidLogo />
              <p>APK</p>
            </div>
            <hr className="bg-grey2" />
            <p className="my-3">Vulnerabiities Assessment</p>
            <div className="w-full bg-grey2 h-[70%] rounded-xl">
              {reports?.data?.apk.length > 0 ? <div className="w-[90%]  flex flex-col mx-auto">
                <div className="flex items-center gap-2 mt-6 mb-4">
                  <div className="w-[3px] h-[2rem] bg-red"></div>
                  <div className="flex flex-col">
                    <p className="text-[10px]">SECURITY SCORE</p>
                    <p>(Poor) F</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-col mt-5">
                  <p className="text-[10px]">ASSESSMENT DATE</p>
                  <p>{reports?.data?.apk[0].TIMESTAMP}</p>
                </div>
                <div className="flex flex-col my-5">
                  <p className="text-[10px]">ASSESSMENT TYPE</p>
                  <p>Aquila</p>
                </div>
                <hr />
                <div className="flex gap-1 md:gap-4 text-[10px] mt-5 md:text-sm">
                  <p >SEVERITY:</p>
                  <p className="border bottom-1  p-1 md:px-3 rounded-lg border-red">
                    High: {reports?.data?.apk[0].HIGH}
                  </p>
                  <p className="border bottom-1  p-1 md:px-3 rounded-lg border-[#007EC6]">
                    Medium: {reports?.data?.apk[0].WARNING}
                  </p>
                  <p className="border bottom-1  p-1 md:px-3 rounded-lg border-[#44CC11]">
                    Low: {reports?.data?.apk[0].INFO}
                  </p>
                </div>
              </div> : <div className="flex mt-20 flex-col items-center">
                <img src={icon} alt="" />
                <p>No app uploaded</p>


              </div> }
            </div>
          </div>
        </div>

        {/* IOS */}
        <div
          className={`shadow-lg bg-white w-full mb-10  h-[25rem] rounded-md flex ${
            !file ? "flex-col" : ""
          } mb-5 justify-center items-center`}
        >
          <div className=" w-[90%] md:w-[80%] h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2 mt-5">
              <SiIos />
              <p>IPA</p>
            </div>
            <hr className="bg-grey2" />
            <p className="my-3">Vulnerabiities Assessment</p>
             <div className="w-full bg-grey2 h-[70%] rounded-xl">
             {reports?.data?.ios.length > 0 ?<div className="w-[90%]  flex flex-col mx-auto">
                <div className="flex items-center gap-2 mt-6 mb-4">
                  <div className="w-[3px] h-[2rem] bg-[#44CC11]"></div>
                  <div className="flex flex-col">
                    <p className="text-[10px]">SECURITY SCORE</p>
                    <p>(Execellent) A+</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-col mt-5">
                  <p className="text-[10px]">ASSESSMENT DATE AND TIME</p>
                  <p>{reports?.data?.ios[0]?.TIMESTAMP}</p>
                </div>
                <div className="flex flex-col my-5">
                  <p className="text-[10px]">ASSESSMENT TYPE</p>
                  <p>Aquila</p>
                </div>
                <hr />
                <div className="flex gap-1 md:gap-4 text-[10px] mt-5 md:text-sm">
                  <p >SEVERITY:</p>
                  <p className="border bottom-1  p-1 md:px-3 rounded-lg border-red">
                    High: {reports?.data?.ios[0].HIGH}
                  </p>
                  <p className="border bottom-1 p-1 md:px-3 rounded-lg border-[#007EC6]">
                    Medium: {reports?.data?.ios[0].WARNING}
                  </p>
                  <p className="border bottom-1 p-1 md:px-3 rounded-lg border-[#44CC11]">
                    Low: {reports?.data?.ios[0].INFO}
                  </p>
                </div>
              </div> :  <div className="flex mt-20 flex-col items-center">
                <img src={icon} alt="" />
                <p>No app uploaded</p>


              </div>  }
            </div>
          </div>
          </div>
          </div>
  )
}

export default ScanCom