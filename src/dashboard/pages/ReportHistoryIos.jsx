// import { BiChevronDown } from "react-icons/bi";
import Navbar from "../components/nav/Navbar";
import { BsFillFolderFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import baseURL from "../../services/baseUrl";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { SiIos } from "react-icons/si";

const ReportHistoryIos = () => {
  const {
    currentProject,
    reports,
    currentProject: project_name,
    reportHistory,
    reportHistoryId,
  } = useSelector((state) => state.appState);
  const [vulnerbility, setVulnerabity] = useState("binary");
  const [downloadOptions, setDownloadOptions] = useState("");
  const [sendOptions, setSendOptions] = useState("");
  const [reportToShow, setReportToShow] = useState(null);

  const [pdfType, setPdfType] = useState("");

  const filterReportHistory = () => {
    const result = reportHistory?.data?.ios.find(
      (item) => item?.id === reportHistoryId
    );
    setReportToShow(result);
  };
  useEffect(() => {
    filterReportHistory();
  }, []);

  const HandleDownloadOptions = (value, downloadType) => {
    setDownloadOptions(value);
    setPdfType(downloadType);
  };
  useEffect(() => {
    HandleDownloadOptions();
  }, [downloadOptions]);

  const HandleSendEmail = (value, downloadType) => {
    setSendOptions(value);
    setPdfType(downloadType);
  };
  useEffect(() => {
    HandleSendEmail();
  }, [sendOptions]);

  const downloadPdfReport = async () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const params = {
      project_name,
      apk: pdfType === "apk" ? true : false,
      id: reports?.data[pdfType][0]?.id,
      ipa: pdfType === "ios" ? true : false,
    };

    const queryString = new URLSearchParams(params).toString();

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
  //download pdf
  useEffect(() => {
    if (downloadOptions !== "") {
      downloadPdfReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadOptions]);

  useEffect(() => {
    const sendEmail = async () => {
      const params = {
        project_name,
        apk: false,
        id: reportHistoryId,
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
    <div className="bg-grey2 h-full text-grey">
      {reportToShow && (
        <div>
          <Navbar />
          <div className="w-[95%] md:w-[80%] mx-auto h-full pt-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Link to="/dashboard/project/details">
                  <BiChevronLeft size={30} />
                </Link>
                <BsFillFolderFill />
                <p>{currentProject}</p>
              </div>
            </div>

            <div className="shadow-md pl-1 text-[12px] lg:text-[1rem] bg-white w-full h-min-[7rem] py-4 rounded-md flex flex-col justify-center md:pl-10  ">
              <div className="flex flex-col md:flex-row md:gap-7">
                <div className="flex items-center ml-1 md:ml-0  gap-1 md:gap-3">
                  <div className="bg-red rounded-full p-2">
                    <SiIos
                      size={20}
                      color="white"
                      className=" text-[8px] md:text-lg"
                    />
                  </div>
                  <div className="">
                    <p className="font-medium">{reportToShow?.FILE_NAME}</p>
                  </div>
                </div>
                <div className="flex  pl-6 md:pl-0 my-0 md:my-0 items-center gap-x-7 md:flex-row  lg:gap-x-12">
            <div className="my-2">
              <p className="text-xs">Platorm</p>
              <p className="font-medium">Ios</p>
            </div>
            <div className="">
              <p className="text-xs">Size</p>
              <p className="font-medium">{reportToShow?.SIZE}</p>
            </div>

            <div className="">
              <p className="text-xs">Scan Date</p>
              <p className="font-medium">
              {reportToShow?.TIMESTAMP}
              </p>
            </div>
          </div>
              </div>
              <div className="flex ml-6 gap-3 md:ml-12 my-1 text-sm">
              <select
            className="appearance-none cursor-pointer p-1  md:p-2  bg-red text-white  rounded-md focus:outline-none text-[10px]  md:text-sm "
          
            value={downloadOptions}
            onChange={(e) => HandleDownloadOptions(e.target.value, "ios")}
          >
            <option value="">Download report </option>
            <option value="technical">Technical Report</option>
            <option value="executive">Executive Report</option>
          </select>
          <select
            className="appearance-none cursor-pointer text-center  p-1   md:p-2  bg-red text-white  rounded-md focus:outline-none text-[10px]  md:text-sm "
            id="selectDownloadApkBtn"
            value={sendOptions}
            onChange={(e) => HandleSendEmail(e.target.value, "ios")}
          >
            <option value="">Send Report to Mail</option>
            <option value="technical">Technical Report</option>
            <option value="executive">Executive Report</option>
          </select>
              </div>
            </div>
            <div className="flex  justify-between w-full mt-5  h-full">
              {/*  */}
              <div className="w-[30%]  flex flex-col h-screen overflow-y-auto  bg-white drop-shadow-lg">
                {/* vulnerabiity */}

                <div className={`  w-[80%] ml-6 my-8`}>
                  <p className="text-2xl ">Vulerabilities</p>
                  <div
                    className="flex items-center gap-2 mt-5 bg-grey2 p-4 cursor-pointer "
                    onClick={() => setVulnerabity("binary")}
                  >
                    <div className="w-0.5 h-4 bg-gold"></div>
                    <p className="text-lg">Binary Analysis</p>
                  </div>
                  <div
                    className="flex items-center gap-2 mt-5 bg-grey2 p-4 cursor-pointer"
                    onClick={() => setVulnerabity("macho")}
                  >
                    <div className="w-0.5 h-3 bg-gold"></div>
                    <p className="text-lg">Macho Anaysis</p>
                  </div>
                </div>
                <div className="w-[80%] ml-6 "></div>
                <div className={`  w-[80%] ml-6 `}></div>
                <div className={`  w-[80%] ml-6 `}>
                  {/* Manifest Analysis */}
                </div>
              </div>
              {/*  */}
              <div className="w-[69%]  flex flex-col  h-screen overflow-y-auto pb-14  bg-white drop-shadow-lg">
                {/* vulnerbility list */}
                {vulnerbility === "binary" && (
                  <div className="mt-8 w-[90%] mx-auto">
                    <p className="text-2xl">Binary Analysis</p>

                    {Object.entries(reportToShow?.BINARY_ANALYSIS).map(
                      ([key, obj]) => (
                        <div key={key} className="mt-2">
                          <p className="text-lg bg-accent p-2 mb-3">{key}</p>
                          <p>Severity : {obj?.severity}</p>
                          <p>Cvss : {obj?.cvss}</p>
                          <p>Masvs : {obj?.masvs}</p>
                          <p>Masvs : {obj?.cwe}</p>
                          <p>Details : {obj?.detailed_desc}</p>
                        </div>
                      )
                    )}
                  </div>
                )}
                {vulnerbility === "macho" && (
                  <div className="mt-8 w-[90%] mx-auto">
                    <p className="text-2xl">Macho Analysis</p>

                    {Object.entries(reportToShow?.MACHO_ANALYSIS).map(
                      ([key, obj]) => (
                        <div key={key} className="mt-2">
                          {key !== "name" && (
                            <div>
                              {" "}
                              <p className="text-xl">{key}</p>
                              <p className="text-sm">
                                Severity : {obj?.severity}
                              </p>
                              <p className="text-sm bg-accent p-2">
                                Description : {obj?.description}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportHistoryIos;
