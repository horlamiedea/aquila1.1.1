import Navbar from "../components/nav/Navbar";

import { IoScanCircle, IoShield } from "react-icons/io5";
import { PiMonitorFill } from "react-icons/pi";

import { BsFillFolderFill } from "react-icons/bs";

import { AiOutlinePlus } from "react-icons/ai";
import api from "../../services/api";
import { useEffect, useState } from "react";

// import UploadScanModal from "../components/modals/UploadScanModal";
import { SET_REPORT, SET_REPORT_HISTORY } from "../../redux/slice/appState";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import ScanCom from "../components/dashboardhome/ScanCom";
import MonitorCom from "../components/dashboardhome/MonitorCom";
import ProtectCom from "../components/dashboardhome/ProtectCom";
import ApkCard from "../components/card/ApkCard";
import IosCard from "../components/card/IosCard";

const ProjectDetail = () => {
  const tabs = [
    { label: "Scan", icon: <IoScanCircle />, component: "scan" },
    { label: "Protect", icon: <IoShield />, component: "protect" },
    { label: "Monitor", icon: <PiMonitorFill />, component: "monitor" },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const [pageToShow, setPageToShow] = useState("scan");
  const [loading, setLoading] = useState(false);
  const { currentProject: project_name, reports } = useSelector(
    (state) => state.appState
  );
  const dispatch = useDispatch();

  const HandleTab = (tab, index) => {
    setActiveTab(index);
    setPageToShow(tab);
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/reports/", {
          params: {
            project_name,
          },
        });
        dispatch(SET_REPORT(res.data));
        localStorage.setItem("report", JSON.stringify(res.data));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchReport();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Fetching report History
  useEffect(() => {
    const params = {
      project_name,
      ios: true,
      // apk: false,
      limit: 20,
    };
    const queryString = new URLSearchParams(params).toString();

    const fetchData = async () => {
      const apiUrl = `/api/reports/?${queryString}`;
      try {
        const response = await api.get(apiUrl);
        dispatch(SET_REPORT_HISTORY(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-grey2 h-full  text-grey ">
      <Navbar />
      {loading ? (
        <div className="h-screen  flex justify-center items-center">
          <i className="fa-solid fa-spinner fa-spin-pulse fa-3x"></i>
        </div>
      ) : (
        <div className="w-[90%] md:w-[80%] mx-auto  pt-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <BsFillFolderFill />
              <p>{project_name}</p>
            </div>
            {/* <div>
              {
                !reports?.data?.apk.length > 0 || ! !reports?.data?.ios.length > 0 && <Link
                to="/dashboard/projects"
                className="flex gap-1 bg-gold py-1 px-2 rounded-md mb-1 text-white text-sm items-center"
              >
                <AiOutlinePlus />
                <p>{`Upload ${reports?.data?.apk ? "IOS" : "APK"} File`}</p>
              </Link>
              }
            </div> */}
            {!reports?.data.apk.length > 0 ||
              !reports?.data.ios.length > 0 && (
                <Link
                  to="/dashboard/projects"
                  className="flex gap-1 bg-gold py-1 px-2 rounded-md mb-1 text-white text-sm items-center"
                >
                  <AiOutlinePlus />
                  <p>{`Upload ${reports?.data?.apk ? "IOS" : "APK"} File`}</p>
                </Link>
              )}
          </div>
          {/* Apk */}
          {reports?.data.apk.length > 0 && <ApkCard />}

          {/* ios */}
          {reports?.data?.ios.length > 0 && <IosCard />}
          <div className="flex items-center justify-center mt-7 mb-4 gap-6">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => HandleTab(tab.component, index)}
                className={` md:px-8 py-2 flex md:gap-x-1 items-center  cursor-pointer text-grey md:text-xl  ${
                  activeTab === index
                    ? "underline underline-offset-8 under delay-100  decoration-2 decoration-red"
                    : ""
                } hover:underline hover:underline-offset-8 hover:decoration-red hover:decoration-2`}
              >
                <p>{tab.icon}</p>
                <p>{tab.label}</p>
              </div>
            ))}
          </div>

          {pageToShow === "scan" && <ScanCom />}
          {pageToShow === "protect" && <ProtectCom />}
          {pageToShow === "monitor" && <MonitorCom />}
          {/*  */}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
