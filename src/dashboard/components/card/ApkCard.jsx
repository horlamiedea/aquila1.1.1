import { useEffect, useState } from "react";
import { BsAndroid2 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseURL from "../../../services/baseUrl";
import api from "../../../services/api";
import {  useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { SET_REPORT_HISTORY_ID } from "../../../redux/slice/appState";

const ApkCard = () => {
  const {
    currentProject: project_name,
    reports,
    reportHistory,
  } = useSelector((state) => state.appState);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [downloadOptions, setDownloadOptions] = useState("");
  const [sendOptions, setSendOptions] = useState("");
  const [showModal, setShowModal] = useState(false);

  //   const HandleDownloadOptions = (value) => {
  //     if(value === "") return;
  //     setDownloadOptions(value);

  //   };

  const HandleDownloadOptions = async (event) => {
    const selectedValue = event.target.value; // Get selected value from select option
    setDownloadOptions(selectedValue);
  };

  const HandleSendEmail = (event) => {
    const selectedValue = event.target.value;
    setSendOptions(selectedValue);
  };

  //

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));

    const params = {
      project_name,
      apk: true,
      id: reports?.data.apk[0]?.id,
      // ipa: false,
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

  const sendEmail = async () => {
    console.log(sendOptions);
    const params = {
      project_name,
      apk: true,
      id: reports?.data.apk[0]?.id,
      // ipa: false,
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

  useEffect(() => {
    if (sendOptions !== "") {
      sendEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ViewSingleReport = (id) => {
    dispatch(SET_REPORT_HISTORY_ID(id));
    navigate("/dashboard/project/report/report-history");
  };

  // const fetchReportData = async () => {
  //   try {
  //     const params = new URLSearchParams({
  //       project_name: projectName,
  //       apk: true,
  //       limit: 10,
  //     }).toString();
  //     const response = await api.get(`/api/reports?${params}`);
  //     dispatch(SET_REPORT_HISTORY(response.data));
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to fetch report data.");
  //   }
  // };

  // useEffect(() => {
  //   fetchReportData();
  // }, []);

  // console.log(reportHistory, "report");

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>

          <div className="relative w-[90%] md:w-[60%] h-auto max-h-[70vh] rounded-xl bg-white shadow-2xl p-4  z-50 overflow-y-auto">

            <AiOutlineClose
              onClick={() => setShowModal(false)}
              className="cursor-pointer absolute right-4 top-2"
            />
            {reportHistory?.data?.apk &&
              reportHistory?.data?.apk.map((apkReport, index) => (
                <div key={index} className="py-4 md:px-6 w-full flex justify-between">
                  <div className="w-full flex justify-between flex-wrap items-start">
                    <div className="flex mb-1 flex-col text-xs md:text-[14px]">
                      <p><strong>File Name:</strong> {apkReport.FILE_NAME}</p>
                      <p><strong>Time Stamp: </strong>{apkReport.TIMESTAMP}</p>
                      <p><strong>Size: </strong>{apkReport.SIZE}</p>
                      
                    </div>
                    <button
                    onClick={() => ViewSingleReport(apkReport.id)}
                    className="bg-red cursor-pointer w-14 px-0.4 py-1 md:w-24  text-white md:px-1 rounded-[4px] text-[8px] md:text-[14px]">
                     View Report
                    </button>
                    
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="shadow-md pl-1 text-[12px] lg:text-[1rem] bg-white w-full h-min-[7rem] py-4 rounded-md flex flex-col justify-center md:pl-10 mb-6 ">
        <div className="flex flex-col md:flex-row md:gap-7">
          <div className="flex items-center justify-center  gap-1 md:gap-3">
            <div className="bg-red rounded-full p-2">
              <BsAndroid2 className=" text-[8px] md:text-lg" color="white" />
            </div>
            <div className="">
              <p className="font-medium">{reports?.data?.apk[0]?.FILE_NAME}</p>
            </div>
          </div>
          <div className="flex pl-10 md:pl-0 my-0 md:my-0 items-center gap-x-7 md:flex-row  lg:gap-x-12">
            <div className="my-2">
              <p className="text-xs">Platform</p>
              <p className="font-medium">Android</p>
            </div>
            <div className="">
              <p className="text-xs">Size</p>
              <p className="font-medium">{reports?.data?.apk[0]?.SIZE}</p>
            </div>

            <div className="">
              <p className="text-xs">Version</p>
              <p className="font-medium">
                {reports?.data?.apk[0]?.VERSION_NAME}
              </p>
            </div>
          </div>
        </div>
        {/* apk download button */}
        <div className="w-fit flex flex-wrap gap-1  ml-3 md:gap-3 md:ml-12 my-1 text-sm">
          <select
           className="appearance-none cursor-pointer p-1  md:p-2 text-center bg-red text-white  rounded-md focus:outline-none text-[10px]  md:text-sm "
            id="selectDownloadApkBtn"
            value={downloadOptions}
            onChange={HandleDownloadOptions}
          >
            <option value="">Download Report</option>
            <option value="technical">Technical Report</option>
            <option value="executive">Executive Report</option>
          </select>
          <select
            className="appearance-none cursor-pointer text-center  p-1   md:p-2  bg-red text-white  rounded-md focus:outline-none text-[10px]  md:text-sm "
           id="selectDownloadApkBtn"
            value={sendOptions}
            onChange={HandleSendEmail}
          >
            <option value="">Send Report to Mail</option>
            <option value="technical">Technical Report</option>
            <option value="executive">Executive Report</option>
          </select>
          {/* <select
            className="appearance-none cursor-pointer p-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            id="selectDownloadApkBtn"
            value={sendOptions}
            onChange={HandleSendEmail}
          >
            <option value="">Send to Mail </option>
            <option value="technical">Technical Report</option>
            <option value="executive">Executive Report</option>
          </select> */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-red text-white text-[10px] md:text-sm  rounded-md p-1 md:p-2"
          >
            Report History
          </button>
          <button
          onClick={() => navigate("/dashboard/projects")}
           
            className="bg-red p-1 text-[10px] md:text-sm  md:p-2 rounded-md text-white"
          >
            Rescan
          </button>

        </div>
      </div>
    </div>
  );
};

export default ApkCard;
