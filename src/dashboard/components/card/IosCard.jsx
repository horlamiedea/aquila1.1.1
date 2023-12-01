import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseURL from "../../../services/baseUrl";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { SiIos } from "react-icons/si";
import { SET_REPORT_HISTORY_ID } from "../../../redux/slice/appState";
import { AiOutlineClose } from "react-icons/ai";

const IosCard = () => {
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

  const HandleDownloadOptions = async (event) => {
    const selectedValue = event.target.value; // Get selected value from select option
    setDownloadOptions(selectedValue);
  };

  const HandleSendEmail = (event) => {
    const selectedValue = event.target.value;
    setSendOptions(selectedValue);
  };

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

  const ViewSingleReport = (id) => {
    dispatch(SET_REPORT_HISTORY_ID(id));
    navigate("/dashboard/project/report/report-history-ios");
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>

          <div className="relative w-[90%] md:w-[60%] h-auto max-h-[70vh] rounded-xl bg-white shadow-2xl p-4  z-50 overflow-y-auto">
            <AiOutlineClose
              onClick={() => setShowModal(false)}
              className="cursor-pointer absolute right-4"
            />
            {reportHistory?.data?.ios &&
              reportHistory?.data?.ios.map((iosReport, index) => (
                <div
                  key={index}
                  className="py-4 md:px-6 w-full flex  justify-between"
                >
                  <div className="w-full flex justify-between flex-wrap items-start">
                    <div className="flex mb-1 flex-col text-xs md:text-[14px]">
                      <p>
                        <strong>File Name:</strong> {iosReport.FILE_NAME}
                      </p>
                      <p>
                        <strong>Time Stamp: </strong>
                        {iosReport.TIMESTAMP}
                      </p>
                      <p>
                        <strong>Size: </strong>
                        {iosReport.SIZE}
                      </p>
                    </div>
                    <button
                      onClick={() => ViewSingleReport(iosReport.id)}
                      className="bg-red cursor-pointer w-14 px-0.4 py-1 md:w-24  text-white md:px-1 rounded-[4px] text-[8px] md:text-[14px]"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="shadow-md pl-1 text-[12px] lg:text-[1rem] bg-white w-full h-min-[7rem] py-4 rounded-md flex flex-col justify-center md:pl-10  ">
        <div className="flex flex-col md:flex-row md:gap-7">
          <div className="flex items-center ml-1  md:ml-0  gap-1 md:gap-3">
            <div className="bg-red rounded-full p-2">
              <SiIos
                size={20}
                color="white"
                className=" text-[8px] md:text-lg"
              />
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
              <p className="font-medium">
                {reports?.data?.ios[0]?.APP_VERSION}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 ml-3 md:gap-3 md:ml-12 my-1 text-sm">
          <select
            className="appearance-none cursor-pointer p-1  md:p-2  bg-red text-white  rounded-md focus:outline-none text-[10px]  md:text-sm "
            id="selectDownloadApkBtn"
            value={downloadOptions}
            onChange={HandleDownloadOptions}
          >
            <option value="">Download report </option>
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

export default IosCard;
