import Navbar from "../components/nav/Navbar";

// import { BiScan, BiSolidCloudUpload } from "react-icons/bi";
import { MdOutlineCloudUpload } from "react-icons/md";

import EmptyIOSAPK from "../../assets/apk_ios.png";
import { BsFillFolderFill } from "react-icons/bs";
import { AiFillFileText, AiOutlineClose } from "react-icons/ai";
import { useRef, useState } from "react";
import api from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
// import baseURL from "../../services/baseUrl";
import socketUrl from "../../services/webSocketUrl";

// import UploadScanModal from "../components/modals/UploadScanModal";
import { SET_SCANFILE } from "../../redux/slice/appState";


const Project = () => {
  const { currentProject: project_name } = useSelector(
    (state) => state.appState
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [UploadedFile, setUploadedFile] = useState(null);
  // const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const scanCancel = () => {
    setFile(null);
    setUploadedFile(null);
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("project_name", project_name);

 
      try {
        const res = await api.post("/api/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });
        setUploadedFile(res.data)
       
        setUploading(false);
      }catch (error) {
        setUploading(false);
      
        console.log(error);
        if (error?.response?.status === 400) {
          toast.error(error?.response?.data?.file[0] || error?.response?.data?.project_name[0]);
        } else {
         return toast.error("Network Error");
        }
      }
    };
  const handleScan = async (e) => {
    e.preventDefault();

    const url =
      `${socketUrl}/scan/`;
      
    const token = JSON.parse(localStorage.getItem("user"));

    const params = {
      ...UploadedFile,
      hash: UploadedFile.md5,
      project_name,
      file_name: UploadedFile.file_name,
      app_type: UploadedFile.app_type,
      access: `${token.access}`,
      analysis_type: "static",
    };

    try {
      setIsScanning(true);
      const newSocket = new WebSocket(url);
      newSocket.onopen = () => {
        console.log("WebSocket connection opened");
        newSocket.send(JSON.stringify(params));
      };

      newSocket.onmessage = (event) => {
        console.log("WebSocket message received", event);

        const eventObject = JSON.parse(event.data);
        dispatch(SET_SCANFILE(eventObject.data));

        if (eventObject.data.title && UploadedFile.app_type === "apk") {
          toast.success("App Scan Successfull ");

          navigate("/dashboard/project/report/apk");
          setIsScanning(false);
          return;
        }
        if (eventObject.data.title && UploadedFile.app_type === "ipa") {
          toast.success("App Scan Successfull ");
          navigate("/dashboard/project/report/ios");
          setIsScanning(false);
        }
      };

      newSocket.onerror = (event) => {
        console.error("WebSocket error occurred", event);
        console.log(newSocket.readyState, "on-error");
      };

      newSocket.onclose = (event) => {
        console.log(newSocket.readyState, "on-close");
        console.log("WebSocket connection closed", event);
        setSocket(null);
        setIsScanning(false);
      };

      setSocket(newSocket);
    } catch (error) {
      console.error("Error connecting to WebSocket", error);
      toast.error("Unable to scan");

      setIsScanning(false);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  };

  return (
    <div className="bg-grey2 text-grey ">
      <Navbar />
      <div className="w-[80%] mx-auto h-screen pt-24">
        <div className="flex items-center gap-1 ">
          <BsFillFolderFill />
          <p>{project_name}</p>
        </div>
        <div className="shadow-md bg-white w-full h-[10rem] rounded-md flex flex-col justify-center items-center ">
          <img src={EmptyIOSAPK} className="w-[7rem]" />
          <p>No Uploaded App</p>
        </div>

        <div
          className={`shadow-lg bg-white w-full mt-6 h-[16rem] rounded-md flex ${
            !file ? "flex-col" : ""
          } mb-10 justify-center items-center `}
        >
          {!file && (
            <div className="text-xs flex flex-col  items-center gap-y-3">
              <MdOutlineCloudUpload size={60} />
              <p>Drag and drop</p>
              <p>or</p>
              <button
                className="bg-red text-white px-6 py-2 rounded-lg cursor-pointer"
                onClick={handleButtonClick}
              >
                Upload
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                // accept=".ipa, .ibb"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div>Supported files: apk / ipa</div>
            </div>
          )}

          {file && !UploadedFile && (
           <div>


           
            <div className="flex flex-col items-center gap-y-3">
              <div className=" flex flex-col md:flex md:flex-row items-center gap-3 md:text-xl ">
                <div className="flex items-center gap-x-2">
                  <AiFillFileText />
                  <p className="text-xs md:text-lg">{file?.name}</p>
                </div>
                <div className="flex gap-x-2">
                  <div className="p-0.5 cursor-pointer rounded-md bg-red text-white">
                    <AiOutlineClose onClick={() => setFile(null)} />
                  </div>
                  <div className="py-0.5 cursor-pointer rounded-md px-1 bg-gold text-white">
                    <MdOutlineCloudUpload onClick={handleUpload} />
                  </div>

                </div>
              </div>
            
            </div>
            {/* <progress value={progress} max="100"></progress>
    <div>{progress}%</div> */}
    {
  uploading && (
    <div className="flex justify-center items-center mt-8">
     <svg width="80" height="80">
    <circle
      cx="40"
      cy="40"
      r="30"
      strokeWidth="8"
      fill="none"
      stroke="#e6e6e6"
    />
    <circle
      cx="40"
      cy="40"
      r="30"
      strokeWidth="8"
      stroke="#34495E"
      fill="none"
      strokeLinecap="round"
      strokeDasharray={2 * Math.PI * 30}
      strokeDashoffset={2 * Math.PI * 30 - (progress / 100) * 2 * Math.PI * 30}
      transform="rotate(-90 40 40)" 
    />
    <text x="40" y="45" textAnchor="middle" fill="#333" fontSize="12px">
      {progress}%
    </text>
  </svg>
  </div>)}
            </div>
          )}

          {UploadedFile && (
            <div className=" text-xs pl-4 px-3 md:pl-0  md:text-lg">
              <p><strong>Name</strong> : {UploadedFile.file_name}</p>
              <p><strong>Apk_type</strong> : {UploadedFile.app_type}</p>
              <p><strong>Project</strong> : {UploadedFile.project}</p>
              <p><strong>MD5</strong> : {UploadedFile.md5}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="py-1 px-3 text-sm cursor-pointer rounded-md bg-gold text-white"
                >
                   Scan
          {isScanning && (
            <i className="fa-solid fa-spinner fa-spin-pulse ml-2"></i>
          )}
                </button>
                <button
                  onClick={scanCancel}
                  className="py-1 px-3 text-sm cursor-pointer rounded-md bg-red text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
