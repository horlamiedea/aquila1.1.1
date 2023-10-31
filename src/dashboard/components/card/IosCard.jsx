
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseURL from "../../../services/baseUrl";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { SiIos } from "react-icons/si";

const IosCard = () => {
    const { currentProject: project_name, reports } = useSelector(
        (state) => state.appState
      );
      const [downloadOptions, setDownloadOptions] = useState("")
      const [sendOptions, setSendOptions] = useState("");

      const HandleDownloadOptions = async (event) => {
        const selectedValue = event.target.value; // Get selected value from select option
        setDownloadOptions(selectedValue);
      };
    
      const HandleSendEmail  = (event) => {
        const selectedValue = event.target.value
        setSendOptions(selectedValue)
    
      }
      
       
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user"));
    
        const params = {
          project_name,
          apk: false,
          id: reports?.data.ios[0]?.id,
          ipa: true,
        };
        const queryString = new URLSearchParams(params).toString();
    
        const fetchData = async () => {
         
          const apiUrl =
            downloadOptions === "technical"
              ? `${baseURL}/api/pdf/technical/?${queryString}`
              : `${baseURL}/api/pdf/executive/?${queryString}`;
          try {
            const options = {
              method: "GET",
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token.access}`,
              },
            };
            const response = await fetch(apiUrl, options);
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "aquila-report.pdf");
            document.body.appendChild(link);
            link.click();
            toast.success("Pdf downloaded successfully..");
          } catch (error) {
            console.log(error);
            toast.error("Unable to download..");
          }
        };
    
        if (downloadOptions !== "") {
          fetchData(); // Call fetchData method when selectedOption state changes and is not empty
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [downloadOptions]);
    
      useEffect(() => {
        const sendEmail = async () => {
          const params = {
            project_name,
            apk: false,
            id: reports?.data.ios[0]?.id,
            ipa: true,
            pdf_type: sendOptions,
          };
    
          try {
            await api.get("api/email-pdf/", { params });
            toast.success("Email sent successfully..");
          } catch (error) {
            console.log(error);
            toast.error("Unable to Send Email");
          }
        };
    
        if (sendOptions !== "") {
          sendEmail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [sendOptions]);
  return (
    <div className="shadow-md pl-1 text-[12px] lg:text-[1rem] bg-white w-full h-min-[7rem] py-4 rounded-md flex flex-col justify-center md:pl-10  ">
    <div className="flex flex-col md:flex-row md:gap-7">
      <div className="flex items-center ml-8 md:ml-0  gap-1 md:gap-3">
        <div className="bg-gold rounded-full p-2">
          <SiIos size={20} color="white" className=" text-[8px] md:text-lg" />
        </div>
        <div className="">
          <p className="font-medium">{reports?.data?.ios[0]?.FILE_NAME}</p>
        </div>
      </div>
      <div className="flex  pl-10 md:pl-0 my-0 md:my-0 items-center gap-x-7 md:flex-row  lg:gap-x-12">
        <div className="my-2">
        <p className="text-xs">Platorm</p>
        <p className="font-medium">Ios</p>
        </div>
      <div className="">
        <p className="text-xs">Size</p>
        <p className="font-medium">{reports?.data?.ios[0]?.SIZE}</p>
      </div>

      <div className="">
        <p className="text-xs">Version</p>
        <p className="font-medium">{reports?.data?.ios[0]?.APP_VERSION}</p>
      </div>
      </div>
    </div>
    <div className="flex gap-x-1 ml-3 md:gap-3 md:ml-12 my-1 text-sm">
      <select
         className="appearance-none cursor-pointer text-xs p-1  md:text-sm bg-gold text-white md:py-2 md:px-4  rounded  focus:outline-none focus:bg-gold"
        id="selectDownloadApkBtn"
        value={downloadOptions}
        onChange={HandleDownloadOptions}
      >
        <option value="">Download report </option>
        <option value="technical">Technical Report</option>
        <option value="executive">Executive Report</option>
      </select>
      <select
        className="appearance-none cursor-pointer text-xs p-1  md:text-sm bg-gold text-white md:py-2 md:px-4  rounded  focus:outline-none focus:bg-gold"
        id="selectDownloadApkBtn"
        value={sendOptions}
        onChange={HandleSendEmail}
      >
        <option value="">Send to Mail </option>
        <option value="technical">Technical Report</option>
        <option value="executive">Executive Report</option>
      </select>
      <Link
        to="/dashboard/projects"
        className="bg-gold p-0.5 md:pt-2 md:px-2 rounded-md text-white"
      >
        Rescan
      </Link>
    </div> 
  </div>
  )
}

export default IosCard