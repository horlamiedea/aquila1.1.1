// import { BiChevronDown } from "react-icons/bi";
import Navbar from "../components/nav/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsAndroid2, BsFillFolderFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  BiSolidChevronDown,
  BiSolidChevronUp,
  BiSolidChevronsRight,
} from "react-icons/bi";
import baseURL from "../../services/baseUrl";
import api from "../../services/api";
import { SET_REPORT } from "../../redux/slice/appState";
import apk from "../../assets/apk.png";

const ProjectReportAPK = () => {
  const {
    currentProject,
    scanFile,
    reports,
    currentProject: project_name,
  } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const [downloadOptions, setDownloadOptions] = useState("");
  const [toggleWarning, setToggleWarning] = useState(true);
  const [sendOptions, setSendOptions] = useState("");
  const [toggleInfo, setToggleInfo] = useState(false);
  // const [toggleHigh, setToggleHigh] = useState(false);
  const [toggleGood, setToggleGood] = useState(false);

  const [vulnerability, setVulnerability] = useState("");
  const [machoAnalysis, setMachoAnalysis] = useState("");
  const [certificateAnalysis, setCertificateAnalysis] = useState("");
  const [networkSecurity, setNetworkSecurity] = useState("");
  const [urls, setUrls] = useState("");
  const [selectedCertSeverity, setSelectedCertSeverity] = useState("");

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

  const handleMachoAnlysis = (key) => {
    setVulnerability("");
    setMachoAnalysis(key);
    setCertificateAnalysis("");
    setNetworkSecurity("");
  };

  // const handleCertificateAnalysis = (severity) => {
  //   setVulnerability("");
  //   setMachoAnalysis("");
  //   setCertificateAnalysis(severity);
  //   setNetworkSecurity("");
  //   setSelectedSeverity(severity);
  // };

  const handleCertificateAnalysis = (severity) => {
    setSelectedCertSeverity(severity.toLowerCase());
    setVulnerability("");
    setMachoAnalysis("");
    setCertificateAnalysis(severity.toLowerCase());
  };

  const handleNetworkSecurity = (key) => {
    setVulnerability("");
    setMachoAnalysis("");
    setCertificateAnalysis("");
    setNetworkSecurity(key);
  };

  const handleUrls = () => {
    setVulnerability("");
    setMachoAnalysis("");
    setCertificateAnalysis("");
    setNetworkSecurity("");
    setUrls("display");
  };

  const countSeverity = (analysisArray, severityProp) => {
    const counts = {
      high: 0,
      warning: 0,
      info: 0,
    };

    analysisArray.forEach((item) => {
      if (item[severityProp] === "high") {
        counts.high++;
      } else if (item[severityProp] === "warning") {
        counts.warning++;
      } else if (item[severityProp] === "info") {
        counts.info++;
      }
    });

    return counts;
  };

  console.log("code_analysis object:", scanFile?.code_analysis);

  const manifestCounts = countSeverity(scanFile?.manifest_analysis, "stat");

  const networkSecurityCounts = countSeverity(
    scanFile.network_security,
    "severity"
  );

  const names = ["Severity", "Title", "Description"];

  function countCertificateSeverity(certificateFindings) {
    const severityCounts = {
      high: 0,
      warning: 0,
      info: 0,
    };

    certificateFindings.forEach((finding) => {
      const severity = finding[0].toLowerCase(); // assuming severity is at index 0
      if (severity in severityCounts) {
        severityCounts[severity] += 1;
      }
    });

    return severityCounts;
  }

  // Example usage:
  const certificateFindingsExample = [
    ["info", "Application is signed with a code signing certificate"],
    [
      "warning",
      "Application is signed with MD5. MD5 hash algorithm is known to have collisions.",
    ],
    ["high", "Application uses an insecure network protocol"],
  ];

  // Get the counts.
  const certificateCounts = countCertificateSeverity(
    certificateFindingsExample
  );

  const HandleSendEmail = (event) => {
    const selectedValue = event.target.value;
    setSendOptions(selectedValue);
  };

  const HandleDownloadOptions = async (event) => {
    const selectedValue = event.target.value; // Get selected value from select option
    setDownloadOptions(selectedValue);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));

    const params = {
      project_name,
      apk: true,
      id: reports?.data.apk[0]?.id,
      ipa: false,
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
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadOptions]);

  useEffect(() => {
    const sendEmail = async () => {
      console.log(sendOptions);
      const params = {
        project_name,
        apk: true,
        id: reports?.data.apk[0]?.id,
        ipa: false,
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
      <Navbar />
      <div className="w-[90%] md:w-[80%] mx-auto h-full pt-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <BsFillFolderFill />
            <p>{currentProject}</p>
          </div>
        </div>

        <div className="shadow-md pl-1 text-[12px] lg:text-[1rem] bg-white w-full h-min-[7rem] py-4 rounded-md flex flex-col justify-center md:pl-10 ">
          <div className="flex flex-col md:flex-row md:gap-7">
            <div className="flex items-center justify-center  gap-1 md:gap-3">
              <div className="bg-red rounded-full p-2">
                <BsAndroid2 className=" text-[8px] md:text-lg" color="white" />
              </div>
              <div className="">
                <p className="font-medium">{scanFile?.file_name}</p>
              </div>
            </div>
            <div className="flex pl-10 md:pl-0 my-0 md:my-0 items-center gap-x-7 md:flex-row  lg:gap-x-12">
              <div className="my-2">
                <p className="text-xs">Platorm</p>
                <p className="font-medium">Android</p>
              </div>
              <div className="">
                <p className="text-xs">Size</p>
                <p className="font-medium">{scanFile?.size}</p>
              </div>

              <div className="">
                <p className="text-xs">Version</p>
                <p className="font-medium">{scanFile?.version_name}</p>
              </div>
            </div>
          </div>
          {/* dowload button */}
          <div className="flex gap-x-1 ml-10 md:gap-3 md:ml-12 my-1 text-sm">
            <select
              className="appearance-none cursor-pointer text-center text-[10px] p-1  md:text-sm bg-red text-white md:py-2 md:px-4  rounded  focus:outline-none focus:bg-gold"
              id="selectDownloadApkBtn"
              value={downloadOptions}
              onChange={(e) => HandleDownloadOptions(e.target.value, "apk")}
            >
              <option value="">Download report </option>
              <option value="technical">Technical Report</option>
              <option value="executive">Executive Report</option>
            </select>
            <select
              className="appearance-none text-center cursor-pointer text-[10px]   md:text-sm bg-red text-white md:py-2   rounded  focus:outline-none focus:bg-gold"
              id="selectDownloadApkBtn"
              value={sendOptions}
              onChange={(e) => HandleSendEmail(e.target.value, "apk")}
            >
              <option value="">Send to Mail </option>
              <option value="technical">Technical Report</option>
              <option value="executive">Executive Report</option>
            </select>
            <Link
              to="/dashboard/projects"
              className="bg-red flex justify-center items-center px-2  text-[10px]   md:text-sm rounded-md text-white"
            >
              Rescan
            </Link>
          </div>
        </div>
        <div className="flex  justify-between w-full mt-5  h-full">
          <div className="w-[30%]  flex flex-col h-screen overflow-y-auto  bg-white drop-shadow-lg">
            {/* vulnerabiity */}

            <div className="w-[95%]  md:w-[80%] ml-6 my-8">
              <p className="mb-8 text-sm md:text-2xl">Code Analysis</p>
              <div
                className=" flex justify-between items-center cursor-pointer"
                onClick={() => setToggleWarning(!toggleWarning)}
              >
                <p>High</p>
                <div className="flex items-center gap-1">
                  <div className="bg-red text-white px-2">
                    {
                      Object.entries(scanFile?.code_analysis).filter(
                        ([, obj]) => obj?.metadata.severity === "high"
                      ).length
                    }
                  </div>
                  {toggleWarning ? (
                    <BiSolidChevronDown />
                  ) : (
                    <BiSolidChevronUp />
                  )}
                </div>
              </div>

              <div className="">
                {Object.entries(scanFile?.code_analysis).map(([key, obj]) => (
                  <div key={key} className="pb-1">
                    <div className="">
                      {obj?.metadata.severity === "high" && (
                        <div className="">
                          {toggleWarning && (
                            <div
                              className="bg-grey2 p-4 cursor-pointer"
                              onClick={() => setVulnerability(key)}
                            >
                              <p className="text-sm ">{key}</p>
                              <div className="flex items-center gap-1">
                                {/* <div className="bg-red w-0.5 h-3"></div> */}
                                {/* <p className="text-[12px]">
                                  Severity : {obj?.metadata?.cvss}
                                </p> */}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[80%] ml-6 ">
              <div
                className=" flex justify-between items-center cursor-pointer"
                onClick={() => setToggleInfo(!toggleInfo)}
              >
                <p>Medium</p>
                <div className="flex items-center gap-1">
                  <div className="bg-gold text-white px-2 mb-2">
                    {
                      Object.entries(scanFile?.code_analysis).filter(
                        ([, obj]) => obj?.metadata.severity === "warning"
                      ).length
                    }
                  </div>
                  {toggleInfo ? <BiSolidChevronDown /> : <BiSolidChevronUp />}
                </div>
              </div>

              <div className="">
                {Object.entries(scanFile?.code_analysis).map(([key, obj]) => (
                  <div key={key} className="pb-1">
                    <div className="">
                      {obj?.metadata.severity === "warning" && (
                        <div className="">
                          {toggleInfo && (
                            <div
                              className="bg-grey2 p-4 cursor-pointer"
                              onClick={() => setVulnerability(key)}
                            >
                              <p className="text-sm ">{key}</p>
                              <div className="flex items-center gap-1">
                                {/* <div className="bg-gold w-0.5 h-3"></div>
                                <p className="text-[12px]">
                                  Severity : {obj?.metadata?.cvss}
                                </p> */}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`  w-[80%] ml-6 `}>
              <div
                className=" flex justify-between items-center cursor-pointer"
                onClick={() => setToggleGood(!toggleGood)}
              >
                <p>Low</p>
                <div className="flex items-center mb-2 gap-1">
                  <div className="bg-[#26DA09] text-white px-2">
                    {
                      Object.entries(scanFile?.code_analysis).filter(
                        ([, obj]) => obj?.metadata.severity === "info"
                      ).length
                    }
                  </div>
                  {toggleGood ? <BiSolidChevronDown /> : <BiSolidChevronUp />}
                </div>
              </div>

              <div className="">
                {Object.entries(scanFile?.code_analysis).map(([key, obj]) => (
                  <div key={key} className="pb-1">
                    <div className="">
                      {obj?.metadata.severity === "info" && (
                        <div className="">
                          {toggleGood && (
                            <div
                              className="bg-grey2 p-4 cursor-pointer"
                              onClick={() => setVulnerability(key)}
                            >
                              <p className="text-sm ">{key}</p>
                              <div className="flex items-center gap-1">
                                {/* <div className="bg-[#26DA09] w-0.5 h-3"></div> */}
                                {/* <p className="text-[12px]">
                                  Severity : {obj?.metadata?.cvss}
                                </p> */}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`  w-[80%] ml-6 `}>
              <p className="mb-8 text-2xl">Manifest Analysis</p>
              <div className="mb-10">
                <div
                  className="  flex justify-between items-center cursor-pointer"
                  onClick={() => handleMachoAnlysis("high")}
                >
                  <p>High</p>
                  <p className="bg-red text-center text-white px-2  ">
                    {manifestCounts.high}
                  </p>
                </div>
                <div
                  className="  flex justify-between items-center cursor-pointer"
                  onClick={() => handleMachoAnlysis("warning")}
                >
                  <p className="my-5">Warning</p>
                  <p className="bg-gold text-center text-white px-2  ">
                    {manifestCounts.warning}
                  </p>
                </div>

                <div
                  className="  flex justify-between items-center cursor-pointer"
                  onClick={() => handleMachoAnlysis("info")}
                >
                  <p className="my-5">Low</p>
                  <p className="bg-[#26DA09]  text-center text-white px-2  ">
                    {manifestCounts.info}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[80%] ml-6 my-8">
              <p className="mb-8 text-sm md:text-2xl">Certificate Analysis</p>
              <div
                className="  flex justify-between items-center cursor-pointer"
                onClick={() => handleCertificateAnalysis("high")}
              >
                <p>High</p>
                <p className="bg-red text-center text-white px-2  ">
                  {certificateCounts.high}
                </p>
              </div>
              <div
                className="  flex justify-between items-center cursor-pointer"
                onClick={() => handleCertificateAnalysis("warning")}
              >
                <p className="my-5">Warning</p>
                <p className="bg-gold text-center text-white px-2  ">
                  {certificateCounts.warning}
                </p>
              </div>

              <div
                className="  flex justify-between items-center cursor-pointer"
                onClick={() => handleCertificateAnalysis("info")}
              >
                <p className="my-5">Low</p>
                <p className="bg-[#26DA09]  text-center text-white px-2  ">
                  {certificateCounts.info}
                </p>
              </div>
            </div>

            <div className="w-[95%]  md:w-[80%] ml-6 my-8">
              <p className="mb-8 text-sm md:text-2xl">Network Security </p>
              <div
                className="  flex justify-between items-center cursor-pointer"
                onClick={() => handleNetworkSecurity("high")}
              >
                <p className="my-5">High</p>
                <p className="bg-red text-center text-white px-2  ">
                  {networkSecurityCounts.high}
                </p>
              </div>
              <div
                className="  flex justify-between items-center cursor-pointer"
                onClick={() => handleNetworkSecurity("warning")}
              >
                <p className="my-5">Warning </p>
                <p className="bg-gold text-center text-white px-2 ">
                  {networkSecurityCounts.warning}
                </p>
              </div>

              <div
                className="  flex justify-between items-center cursor-pointer"
                onClick={() => handleNetworkSecurity("info")}
              >
                <p className="my-5">Low </p>
                <p className="bg-[#26DA09] text-center text-white px-2 ">
                  {networkSecurityCounts.info}
                </p>
              </div>
            </div>

            <div
              className="w-[95%]  md:w-[80%] ml-6 my-8"
              onClick={() => handleUrls()}
            >
              <p className="mb-8 text-sm md:text-2xl">URL&apos;s </p>
            </div>
          </div>
          <div className="w-[69%]  flex flex-col  h-screen overflow-y-auto pb-14  bg-white drop-shadow-lg">
            {/* vulnerbility list */}
            <div className="w-[80%] h-full mx-auto pb-8">
              {vulnerability === "" &&
                machoAnalysis === "" &&
                certificateAnalysis === "" &&
                networkSecurity === "" &&
                urls === "" && (
                  <div className="h-screen flex flex-col items-center justify-center">
                    <img
                      src={apk}
                      alt="apk"
                      className="text-grey opacity-25 w-40 h-40"
                    />
                    <p className="text-center">
                      Choose Any Specific Level of Security Vulnerability
                      <br /> to Obtain an In-Depth Report and Analysis of Its
                      Characteristics and Implications
                    </p>
                  </div>
                )}
              {vulnerability !== "" && (
                <div className="mt-10">
                  <p className="text-xl">{vulnerability}</p>
                  <div className="flex items-center mt-4">
                    <div className="flex gap-2 items-center">
                      <div className="w-0.5 h-8 bg-red"></div>
                      <div className="">
                        <p className="text-sm">Severity</p>
                        {/* <p>
                          {
                            scanFile?.code_analysis[vulnerability]?.metadata
                              ?.cvss
                          }
                        </p> */}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="w-0.5 h-8 ml-4 bg-black"></div>
                      <div className="">
                        <p className="text-sm">Category</p>
                        <p>
                          {
                            scanFile?.code_analysis[vulnerability]?.metadata
                              ?.masvs
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xl ">Context</p>
                    <p className="my-3 text-xl">Description</p>
                    <p className="text-sm">
                      {" "}
                      {
                        scanFile?.code_analysis[vulnerability]?.metadata
                          ?.description
                      }
                    </p>

                    <p className="my-3 text-xl">Bussiness Impact</p>
                    <p className="text-sm">
                      {
                        scanFile?.code_analysis[vulnerability]?.metadata
                          ?.business_impact
                      }
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xl ">Evidence</p>

                    <div></div>
                    {scanFile?.code_analysis[vulnerability]?.files &&
                      Object.entries(
                        scanFile.code_analysis[vulnerability].files
                      ).map(([filePath, fileDetails]) => (
                        <div key={filePath}>
                          <p className="text-sm mt-2">
                          <b>Line number</b> {fileDetails.lines} : {filePath}
                          </p>

                          <p className="text-">
                            Code: {JSON.stringify(fileDetails.code)}
                          </p>
                        </div>
                      ))}
                  </div>
                  <p className="text-xl mt-3">Recommendation</p>
                  <p className="text-sm pb-7 my-1">
                    {scanFile?.code_analysis[vulnerability]?.metadata?.ref}
                  </p>
                  <p className="text-xl mt-3">Regulatory</p>
                  <div className="flex  justify-between">
                    <div className="my-4">
                      <div>
                        <div  className="flex items-center">

                        <p className="text-sm">CWE :</p>
                        <p className="text-red text-xs ml-2">
                          {
                            scanFile?.code_analysis[vulnerability]?.metadata
                              ?.cwe
                          }
                        </p>
                        </div>
                      <div className="flex items-center">
                      <p className="">CVSS:</p> 
                        <p className="text-sm text-red ml-2"> {scanFile?.code_analysis[vulnerability]?.metadata?.cvss}</p>
                   </div>
                      </div>
                      {/* <div className="">
                        <p className="text-sm">Risk OWASP:</p>
                        <p className="text-red text-xs">
                          {
                            scanFile?.code_analysis[vulnerability]?.metadata
                              ?.owasp_mobile
                          }
                        </p>
                      </div> */}
                      <div className="">
                        {/* <p className="text-sm">Seveirty:</p>
                        <p className="text-red text-xs">
                          {
                            scanFile?.code_analysis[vulnerability]?.metadata
                              ?.severity
                          }
                        </p> */}
                      </div>
                     <div className="">
                      {/* <div className="">
                        <p className="text-sm">ioXt:</p>
                        <p className="text-red text-xs">SI110</p>
                      </div> */}
                      {/* <div className="">
                        <p className="text-sm">FISMA MED:</p>
                        <p className="text-red text-xs">
                          SC-8 TRANSMISSION CONFIDENTIALITY AND INTEGRITY
                        </p>
                      </div> */}
                      {/* <div className="">
                        <p className="text-sm">PCI:</p>
                      </div> */}
                        {/* <p className="text-red text-xs">
                          2021 CWE Top 25 Most Dangerous Software Errors
                        </p> */}
                      </div>
                    </div> 
                  </div>
                </div>
              )}
              <div className="mt-10">
                {machoAnalysis === "high" && (
                  <div>
                    <p className="text-2xl">Manifest Analysis</p>
                    {scanFile?.manifest_analysis.map(
                      (item, i) =>
                        item.stat === "high" && (
                          <div className="text-xs my-4" key={i}>
                            <p className="mb-1 text-sm ">{item?.name}</p>
                            <p className="bg-accent ">{item?.title}</p>
                            <p className="py-1 ">Status : {item?.stat}</p>
                            <p className="py-1 ">Description : {item?.desc}</p>
                          </div>
                        )
                    )}
                  </div>
                )}

                {/* ------------------------------- */}
                {vulnerability === "" && machoAnalysis === "warning" && (
                  <div>
                    <p className="text-2xl">Manifest Analysis</p>
                    {scanFile.manifest_analysis.map(
                      (item, i) =>
                        item.stat === "warning" && (
                          <div className="text-xs my-4" key={i}>
                            <p className="mb-1 text-sm ">{item?.name}</p>
                            <p className="bg-accent ">{item?.title}</p>
                            <p className="py-1 ">Status : {item?.stat}</p>
                            <p className="py-1 ">Description : {item?.desc}</p>
                          </div>
                        )
                    )}
                  </div>
                )}

                {vulnerability === "" && machoAnalysis === "info" && (
                  <div>
                    <p className="text-2xl">Manifest Analysis</p>
                    {scanFile.manifest_analysis.map(
                      (item, i) =>
                        item.stat === "info" && (
                          <div className="text-xs my-4" key={i}>
                            <p className="mb-1 text-sm ">{item?.name}</p>
                            <p className="bg-accent ">{item?.title}</p>
                            <p className="py-1 ">Status : {item?.stat}</p>
                            <p className="py-1 ">Description : {item?.desc}</p>
                          </div>
                        )
                    )}
                  </div>
                )}

                {certificateAnalysis &&
                  vulnerability === "" &&
                  machoAnalysis === "" && (
                    <div className="w-full">
                      <div className="mb-4">
                        <p className="text-2xl">
                          Certificate Analysis Findings
                        </p>
                        {scanFile.certificate_analysis.certificate_findings
                          .filter(
                            (finding) =>
                              finding[0].toLowerCase() === selectedCertSeverity
                          ) // Filter findings based on selected severity
                          .map((finding, index) => (
                            <div key={index} className="mb-4 p-2 grey2">
                              {finding.map((value, idx) => (
                                <p key={idx} className="text-sm">
                                  <span className="font-semibold">
                                    {names[idx] || `Field ${idx}`}:
                                  </span>{" "}
                                  {value.toString()}
                                </p>
                              ))}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                {networkSecurity === "high" &&
                  scanFile.network_security.map(
                    (item, index) =>
                      item.severity === "high" && (
                        <div key={index} className="mb-4 p-2 bg-grey2">
                          {/* Render Warning Severity Items */}
                          <div className="flex items-center">
                            <p className="text-sm font-bold">Severity</p>
                            <p className="text-red ml-2">High</p>
                          </div>
                          <p className="text-sm break-words">
                            Scope: {item.scope}
                          </p>
                          <p className="text-sm">
                            Description: {item.description}
                          </p>
                        </div>
                      )
                  )}

                {networkSecurity === "warning" &&
                  scanFile.network_security.map(
                    (item, index) =>
                      item.severity === "warning" && (
                        <div key={index} className="mb-4 p-2 bg-grey2">
                          {/* Render Warning Severity Items */}
                          <div className="flex items-center">
                            <p className="text-sm font-bold">Severity</p>
                            <p className="text-gold ml-2">Warning</p>
                          </div>
                          <p className="text-sm break-words">
                            Scope: {item.scope}
                          </p>
                          <p className="text-sm">
                            Description: {item.description}
                          </p>
                        </div>
                      )
                  )}

                {networkSecurity === "info" &&
                  scanFile.network_security.map(
                    (item, index) =>
                      item.severity === "info" && (
                        <div key={index} className="mb-4 p-2 bg-grey2">
                          {/* Render Warning Severity Items */}
                          <div className="flex items-center">
                            <p className="text-sm font-bold">Severity</p>
                            <p className="text-gold ml-2">Low</p>
                          </div>
                          <p className="text-sm break-words">
                            Scope: {item.scope}
                          </p>
                          <p className="text-sm">
                            Description: {item.description}
                          </p>
                        </div>
                      )
                  )}

                {urls && scanFile.urls && (
                  <div className="w-[80%] h-full mx-auto pb-8">
                    <p className="text-2xl">URL&apos;s</p>
                    {Object.entries(scanFile.urls).map(([key, value]) => (
                      <div key={key} className="mb-4 p-2 bg-grey2">
                        <div className="flex items-center">
                          <p className="text-sm font-bold">Path:</p>
                          <p className="ml-2">{value.path}</p>
                        </div>
                        {value.urls.map((url, urlIndex) => (
                          <div key={urlIndex} className="mt-2">
                            <p className="text-sm">URL:</p>
                            <a
                              href={url}
                              className="text-[#0000EE] hover:text-[#1E90FF] visited:text-[#551A8B]"
                            >
                              {url}
                            </a>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectReportAPK;
