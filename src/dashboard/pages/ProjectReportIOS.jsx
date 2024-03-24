// import { BiChevronDown } from "react-icons/bi";
import Navbar from "../components/nav/Navbar";
import { BsAndroid2, BsFillFolderFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector , useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import baseURL from "../../services/baseUrl";
import api from "../../services/api";
import { SET_REPORT } from "../../redux/slice/appState";

const ProjectReportIOS = () => {

  const { currentProject,reports, scanFile ,currentProject : project_name} = useSelector(
    (state) => state.appState
  );
  const [vulnerbility, setVulnerabity] = useState("binary")
  const [downloadOptions, setDownloadOptions] = useState("");
  const [sendOptions, setSendOptions] = useState("");
  const [pdfType, setPdfType] = useState("");
  const dispatch = useDispatch()

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
      // apk: pdfType === "apk" ? true : false,
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
        apk: pdfType === "apk" ? true : false,
        id: reports?.data[pdfType][0]?.id,
        ipa: pdfType === "ios" ? true : false,
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

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // setLoading(true);
        const res = await api.get("/api/reports/", {
          params: {
            project_name,
          },
        });
        dispatch(SET_REPORT(res.data));
        localStorage.setItem("report", JSON.stringify(res.data));
        // setLoading(false);
      } catch (error) {
        console.error(error);
        // setLoading(false);
      }
    };
    fetchReport();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);






  return (
    <div className="bg-grey2 h-full text-grey">
      <Navbar />
      <div className="w-[80%] mx-auto h-full pt-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <BsFillFolderFill />
            <p>{currentProject}</p>
          </div>
        </div>

        <div className="shadow-md bg-white w-full h-[7rem] rounded-md flex flex-col justify-center pl-10 ">
          <div className="flex gap-7">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-gold rounded-full p-2">
                <BsAndroid2 size={20} color="white" />
              </div>
              <div className="">
                <p>{scanFile?.file_name}</p>
              </div>
            </div>
            <div className="">
              <p>Platorm</p>
              <p>Ios</p>
            </div>
            <div className="">
              <p>Size</p>
              <p>{scanFile?.size}</p>
            </div>

            <div className="">
              <p>Version</p>
              <p>{scanFile?.app_version}</p>
            </div>
          </div>
          <div className="flex gap-3 ml-12 my-1 text-sm">
                <select
                  className="appearance-none cursor-pointer   bg-gold text-white py-2 px-4  rounded  focus:outline-none focus:bg-gold"
                  id="selectDownloadApkBtn"
                  value={downloadOptions}
                  onChange={(e) => HandleDownloadOptions(e.target.value, "ios")}
                >
                  <option value="">Download report </option>
                  <option value="technical">Technical Report</option>
                  <option value="executive">Executive Report</option>
                </select>
                <select
                  className="appearance-none cursor-pointer  bg-gold text-white py-2 px-4  rounded  focus:outline-none focus:bg-gold"
                  id="selectDownloadApkBtn"
                  value={sendOptions}
                  onChange={(e) => HandleSendEmail(e.target.value, "ios")}
                >
                  <option value="">Send to Mail </option>
                  <option value="technical">Technical Report</option>
                  <option value="executive">Executive Report</option>
                </select>
                <Link
                  to="/dashboard/projects"
                  className="bg-gold pt-2 px-2 rounded-md text-white"
                >
                  Rescan
                </Link>
              </div>
        </div>
        <div className="flex  justify-between w-full mt-5  h-full">
          {/*  */}
          <div className="w-[30%]  flex flex-col h-screen overflow-y-auto  bg-white drop-shadow-lg">
            {/* vulnerabiity */}

            <div className={`  w-[80%] ml-6 my-8`}>
              <p className="text-2xl ">Vulerabilities</p>
              <div className="flex items-center gap-2 mt-5 bg-grey2 p-4 cursor-pointer " onClick={() =>setVulnerabity("binary")}>
                <div className="w-0.5 h-4 bg-gold"></div>
                <p className="text-lg">Binary Analysis</p>
              </div>
              <div className="flex items-center gap-2 mt-5 bg-grey2 p-4 cursor-pointer" onClick={()=>setVulnerabity("macho")}>
                <div className="w-0.5 h-3 bg-gold"></div>
                <p className="text-lg">Macho Anaysis</p>
              </div>
            </div>
            <div className="w-[80%] ml-6 "></div>
            <div className={`  w-[80%] ml-6 `}></div>
            <div className={`  w-[80%] ml-6 `}>{/* Manifest Analysis */}</div>
          </div>
          {/*  */}
          <div className="w-[69%]  flex flex-col  h-screen overflow-y-auto pb-14  bg-white drop-shadow-lg">
            {/* vulnerbility list */}
           {vulnerbility === "binary" && <div className="mt-8 w-[90%] mx-auto">
              <p className="text-2xl">Binary Analysis</p>

            {Object.entries(scanFile.binary_analysis).map(([key, obj]) => (
              <div key={key} className="mt-2">
                <p className="text-lg bg-accent p-2 mb-3">{key}</p>
                <p>Severity : {obj?.severity}</p>
                <p>Cvss : {obj?.cvss}</p>
                <p>Masvs : {obj?.masvs}</p>
                <p>Masvs : {obj?.cwe}</p>
                <p>Details : {obj?.detailed_desc}</p>
              </div>

            ))}
            </div>}
           { vulnerbility === "macho" && <div className="mt-8 w-[90%] mx-auto">
              <p className="text-2xl">Macho Analysis</p>

            {Object.entries(scanFile.macho_analysis).map(([key, obj]) => (
              <div key={key} className="mt-2">
                {key !== "name" &&<div > <p className="text-xl">{key}</p>
                <p className="text-sm">Severity : {obj?.severity}</p>
                <p className="text-sm bg-accent p-2">Description : {obj?.description}</p></div>}
                
               
              </div>

            ))}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectReportIOS;
