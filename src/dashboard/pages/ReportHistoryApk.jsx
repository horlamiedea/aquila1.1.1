import Navbar from "../components/nav/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsAndroid2, BsFillFolderFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BiChevronLeft,
  BiSolidChevronDown,
  BiSolidChevronUp,
} from "react-icons/bi";
import baseURL from "../../services/baseUrl";
import { Link } from "react-router-dom";
import api from "../../services/api";
import apk from "../../assets/apk.png"

const getSeverityColor = (severity) => {
  switch (severity) {
    case "high":
      return "bg-red"; // red background for high severity
    case "warning":
      return "bg-gold";
    case "info":
      return "bg-green";
    default:
      return "bg-default"; // default background color for other cases
  }
};

const ReportHistoryApk = () => {
  const {
    currentProject,
    // reports,
    scanFile,
    reportHistory,
    reportHistoryId,
    currentProject: project_name,
  } = useSelector((state) => state.appState);

  const [downloadOptions, setDownloadOptions] = useState("");
  const [toggleWarning, setToggleWarning] = useState(true);
  const [sendOptions, setSendOptions] = useState("");
  // const [pdfType, setPdfType] = useState("");
  const [toggleInfo, setToggleInfo] = useState(false);
  // const [toggleHigh, setToggleHigh] = useState(false);
  const [toggleGood, setToggleGood] = useState(false);
  const [reportToShow, setReportToShow] = useState(null);

  const [vulnerability, setVulnerability] = useState("");
  const [machoAnalysis, setMachoAnalysis] = useState("");
  const [certificateAnalysis, setCertificateAnalysis] = useState("");
  const [networkSecurity, setNetworkSecurity] = useState("");

  const [highSeverityCount, setHighSeverityCount] = useState(0);
  const [warningSeverityCount, setWarningSeverityCount] = useState(0);
  const [infoSeverityCount, setInfoSeverityCount] = useState(0);

  const [networkHighSeverityCount, setNetworkHighSeverityCount] = useState(0);
  const [networkWarningSeverityCount, setNetworkWarningSeverityCount] =
    useState(0);
  const [networkInfoSeverityCount, setNetworkInfoSeverityCount] = useState(0);

  const [certificateSeverityCounts, setCertificateSeverityCounts] = useState({
    high: 0,
    warning: 0,
    info: 0,
  });

  const [selectedSeverity, setSelectedSeverity] = useState("");

  console.log(reportToShow, "show");

  const severity =
    reportToShow?.CODE_ANALYSIS[vulnerability]?.metadata?.severity;
  const severityColorClass = getSeverityColor(severity);

  const displaySeverityText = (severity) => {
    return severity === "info" ? "Low" : severity;
  };

  const filterReportHistory = () => {
    const result = reportHistory?.data?.apk.find(
      (item) => item?.id === reportHistoryId
    );
    setReportToShow(result);
  };
  useEffect(() => {
    filterReportHistory();
  }, []);

  const handleMachoAnlysis = (key) => {
    setVulnerability("");
    setMachoAnalysis(key);
  };

  // const handleCertificateAnlysis = (key) => {
  //   setVulnerability("");
  //   setMachoAnalysis("");
  //   // setBinaryAnalysis("");
  //   setCertificateAnalysis(key);
  // };

  const handleNetworkSecurity = (key) => {
    setVulnerability("");
    setMachoAnalysis("");
    // setBinaryAnalysis("");
    setCertificateAnalysis("");
    setNetworkSecurity(key);
  };

  const calculateSeverityCounts = (analysisData) => {
    const highCount = analysisData.filter(
      (item) => item.stat === "high"
    ).length;
    const warningCount = analysisData.filter(
      (item) => item.stat === "warning"
    ).length;
    const infoCount = analysisData.filter(
      (item) => item.stat === "info"
    ).length;

    return { highCount, warningCount, infoCount };
  };

  useEffect(() => {
    if (reportToShow?.MANIFEST_ANALYSIS) {
      const { highCount, warningCount, infoCount } = calculateSeverityCounts(
        reportToShow.MANIFEST_ANALYSIS
      );
      setHighSeverityCount(highCount);
      setWarningSeverityCount(warningCount);
      setInfoSeverityCount(infoCount);
    }
  }, [reportToShow?.MANIFEST_ANALYSIS]);

  const calculateNetworkSeverityCounts = (analysisData) => {
    const highCount = analysisData.filter(
      (item) => item.severity === "high"
    ).length;
    const warningCount = analysisData.filter(
      (item) => item.severity === "warning"
    ).length;
    const infoCount = analysisData.filter(
      (item) => item.severity === "info"
    ).length;

    return { highCount, warningCount, infoCount };
  };

  useEffect(() => {
    if (reportToShow?.NETWORK_SECURITY) {
      const { highCount, warningCount, infoCount } =
        calculateNetworkSeverityCounts(reportToShow.NETWORK_SECURITY);
      setNetworkHighSeverityCount(highCount);
      setNetworkWarningSeverityCount(warningCount);
      setNetworkInfoSeverityCount(infoCount);
    }
  }, [reportToShow?.NETWORK_SECURITY]);

  const names = ["Severity", "Title", "Description"];

  const calculateCertificateSeverityCounts = () => {
    let highCount = 0;
    let warningCount = 0;
    let infoCount = 0;

    reportToShow.CERTIFICATE_ANALYSIS.certificate_findings.forEach(
      (finding) => {
        const severity = finding[0].toLowerCase();
        if (severity === "high") highCount++;
        if (severity === "warning") warningCount++;
        if (severity === "info") infoCount++;
      }
    );

    setCertificateSeverityCounts({
      high: highCount,
      warning: warningCount,
      info: infoCount,
    });
  };

  useEffect(() => {
    if (reportToShow?.CERTIFICATE_ANALYSIS?.certificate_findings) {
      calculateCertificateSeverityCounts();
    }
  }, [reportToShow?.CERTIFICATE_ANALYSIS?.certificate_findings]);

  const handleCertificateAnalysisClick = (severity) => {
    setSelectedSeverity(severity);
  };

  const HandleSendEmail = (event) => {
    const selectedValue = event.target.value;
    setSendOptions(selectedValue);
  };
  // const HandleSendEmail = (value, downloadType) => {
  //   setSendOptions(value);
  //   setPdfType(downloadType);
  // };
  // useEffect(() => {
  //   HandleSendEmail();
  // }, [sendOptions]);

  const HandleDownloadOptions = async (event) => {
    const selectedValue = event.target.value; // Get selected value from select option
    setDownloadOptions(selectedValue);
  };

  // const HandleDownloadOptions = (value, downloadType) => {
  //   setDownloadOptions(value);
  //   setPdfType(downloadType);
  // };
  // useEffect(() => {
  //   HandleDownloadOptions();
  // }, [downloadOptions]);

  const downloadPdfReport = async () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const params = {
      project_name,
      apk: true,
      id: reportHistoryId,
      ipa: false,
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
      console.log(sendOptions);
      const params = {
        project_name,
        apk: true,
        id: reportHistoryId,
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
      {reportToShow && (
        <div>
          <Navbar />
          <div className="w-[90%] md:w-[80%] mx-auto h-full pt-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Link to="/dashboard/project/details">
                  <BiChevronLeft size={30} />
                </Link>
                <BsFillFolderFill />
                <p>{currentProject}</p>
              </div>
            </div>

            <div className="shadow-md pl-1 text-[12px] lg:text-[1rem] bg-white w-full h-min-[7rem] py-4 rounded-md flex flex-col justify-center md:pl-10 ">
              <div className="flex flex-col md:flex-row md:gap-7">
                <div className="flex items-center justify-center  gap-1 md:gap-3">
                  <div className="bg-red rounded-full p-2">
                    <BsAndroid2
                      className=" text-[8px] md:text-lg"
                      color="white"
                    />
                  </div>
                  <div className="">
                    <p className="font-medium">{reportToShow?.FILE_NAME}</p>
                  </div>
                </div>
                <div className="flex pl-10 md:pl-0 my-0 md:my-0 items-center gap-x-7 md:flex-row  lg:gap-x-12">
                  <div className="my-2">
                    <p className="text-xs">Platorm</p>
                    <p className="font-medium">Android</p>
                  </div>
                  <div className="">
                    <p className="text-xs">Size</p>
                    <p className="font-medium">{reportToShow?.SIZE}</p>
                  </div>

                  <div className="">
                    <p className="text-xs">Scan Date</p>
                    <p className="font-medium">{reportToShow?.TIMESTAMP}</p>
                  </div>
                </div>
              </div>
              {/* dowload button */}
              <div className="flex gap-x-1 ml-10 md:gap-3 md:ml-12 my-1 text-sm">
                <select
                  className="appearance-none cursor-pointer text-center text-[10px] p-1  md:text-sm bg-red text-white md:py-2 md:px-4  rounded  focus:outline-none focus:bg-gold"
                  id="selectDownloadApkBtn"
                  value={downloadOptions}
                  onChange={HandleDownloadOptions}
                  // onChange={(e) => HandleDownloadOptions(e.target.value, "apk")}
                >
                  <option value="">Download report </option>
                  <option value="technical">Technical Report</option>
                  <option value="executive">Executive Report</option>
                </select>
                <select
                  className="appearance-none text-center cursor-pointer text-[10px]   md:text-sm bg-red text-white md:py-2 md:px-3   rounded  focus:outline-none focus:bg-gold"
                  id="selectDownloadApkBtn"
                  value={sendOptions}
                  // onChange={(e) => HandleSendEmail(e.target.value, "apk")}
                  onChange={HandleSendEmail}
                >
                  <option value="">Send to Mail </option>
                  <option value="technical">Technical Report</option>
                  <option value="executive">Executive Report</option>
                </select>
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
                          Object.entries(reportToShow?.CODE_ANALYSIS).filter(
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
                    {Object?.entries(reportToShow?.CODE_ANALYSIS).map(
                      ([key, obj]) => (
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
                                      <div className="bg-red w-0.5 h-3"></div>
                                      <p className="text-[12px]">
                                        Severity : {obj?.metadata?.cvss}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
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
                          Object?.entries(reportToShow?.CODE_ANALYSIS).filter(
                            ([, obj]) => obj?.metadata.severity === "warning"
                          ).length
                        }
                      </div>
                      {toggleInfo ? (
                        <BiSolidChevronDown />
                      ) : (
                        <BiSolidChevronUp />
                      )}
                    </div>
                  </div>

                  <div className="">
                    {Object?.entries(reportToShow?.CODE_ANALYSIS).map(
                      ([key, obj]) => (
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
                                      <div className="bg-gold w-0.5 h-3"></div>
                                      <p className="text-[12px]">
                                        Severity : {obj?.metadata?.cvss}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
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
                          Object?.entries(reportToShow?.CODE_ANALYSIS).filter(
                            ([, obj]) => obj?.metadata.severity === "info"
                          ).length
                        }
                      </div>
                      {toggleGood ? (
                        <BiSolidChevronDown />
                      ) : (
                        <BiSolidChevronUp />
                      )}
                    </div>
                  </div>

                  <div className="">
                    {Object?.entries(reportToShow?.CODE_ANALYSIS).map(
                      ([key, obj]) => (
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
                                      <div className="bg-[#26DA09] w-0.5 h-3"></div>
                                      <p className="text-[12px]">
                                        Severity : {obj?.metadata?.cvss}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
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
                        {highSeverityCount}
                      </p>
                    </div>
                    <div
                      className="  flex justify-between items-center cursor-pointer"
                      onClick={() => handleMachoAnlysis("warning")}
                    >
                      <p className="my-5">Warning</p>
                      <p className="bg-gold text-center text-white px-2  ">
                        {warningSeverityCount}
                      </p>
                    </div>

                    <div
                      className="  flex justify-between items-center cursor-pointer"
                      onClick={() => handleMachoAnlysis("info")}
                    >
                      <p className="my-5">Low</p>
                      <p className="bg-[#26DA09] text-center text-white px-2  ">
                        {infoSeverityCount}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="w-[95%]  md:w-[80%] ml-6 my-8">
              <p
                onClick={() => handleCertificateAnlysis}
                className="mb-8 text-sm md:text-2xl"
              >
                Certificate Analysis
              </p>

              <div
                className="  flex justify-between items-center cursor-pointer"
                onClick={() => handleCertificateAnlysis("high")}
              >
                <p className="my-5">Certificate Findings</p>
              </div>
            </div> */}

                <div className="w-[95%]  md:w-[80%] ml-6 my-8">
                  <p className="mb-8 text-sm md:text-2xl">
                    Certificate Analysis
                  </p>

                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleCertificateAnalysisClick("high")}
                  >
                    <p>High</p>
                    <p className="bg-red text-center text-white px-2">
                      {certificateSeverityCounts.high}
                    </p>
                  </div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleCertificateAnalysisClick("warning")}
                  >
                    <p>Warning</p>
                    <p className="bg-gold text-center text-white px-2 my-6">
                      {certificateSeverityCounts.warning}
                    </p>
                  </div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleCertificateAnalysisClick("info")}
                  >
                    <p>Info</p>
                    <p className="bg-[#26DA09] text-center text-white px-2">
                      {certificateSeverityCounts.info}
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
                      {networkHighSeverityCount}
                    </p>
                  </div>
                  <div
                    className="  flex justify-between items-center cursor-pointer"
                    onClick={() => handleNetworkSecurity("warning")}
                  >
                    <p className="my-5">Warning </p>
                    <p className="bg-gold text-center text-white px-2 ">
                      {networkWarningSeverityCount}
                    </p>
                  </div>

                  <div
                    className="  flex justify-between items-center cursor-pointer"
                    onClick={() => handleNetworkSecurity("info")}
                  >
                    <p className="my-5">Low </p>
                    <p className="bg-[#26DA09] text-center text-white px-2 ">
                      {networkInfoSeverityCount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[69%]  flex flex-col  h-screen overflow-y-auto pb-14  bg-white drop-shadow-lg">
                {/* vulnerbility list */}
                <div className="w-[80%] h-full mx-auto pb-8">
                  {vulnerability === "" ? <div className="h-screen flex flex-col items-center justify-center">
                    <img src={apk} alt="apk" className="text-grey opacity-25 w-40 h-40"/>
                    <p className="text-center">
Choose Any Specific Level of Security Vulnerability<br/> to Obtain an In-Depth  Report and Analysis of Its Characteristics and Implications</p>
                  </div> : (
                    <div className="mt-10">
                      <p className="text-xl">{vulnerability}</p>
                      <div className="flex gap-4 items-center mt-4">
                        {/* <div className="flex gap-2 items-center">
                          <div className="w-0.5 h-8 bg-red"></div>
                          <div className="">
                            <p className="text-sm">Severity</p>
                            <p>
                              {
                                reportToShow?.CODE_ANALYSIS[vulnerability]
                                  ?.metadata?.severity
                              }
                            </p>
                          </div>
                        </div> */}

                        <div className="flex gap-2 items-center">
                          <div
                            className={`${severityColorClass} w-0.5 h-8`}
                          ></div>

                          <div className="">
                            <p className="text-sm">Severity</p>
                            <p>{displaySeverityText(severity)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="w-0.5 h-8 bg-black"></div>
                          <div className="">
                            <p className="text-sm">Category</p>
                            <p>
                              {
                                reportToShow?.CODE_ANALYSIS[vulnerability]
                                  ?.metadata?.masvs
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
                            reportToShow?.CODE_ANALYSIS[vulnerability]?.metadata
                              ?.description
                          }
                        </p>

                        <p className="my-3 text-xl">Bussiness Impact</p>
                        <p className="text-sm">
                          {
                            reportToShow?.CODE_ANALYSIS[vulnerability]?.metadata
                              ?.business_impact
                          }
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-xl ">Evidence</p>

                        <div></div>
                        {/* {Object?.entries(
                          reportToShow?.CODE_ANALYSIS[vulnerability]?.files
                        ).map(([key, obj]) => (
                          <p className="text-sm" key={key}>
                            {key} : {obj}
                          </p>
                        ))} */}
                      </div>
                      <p className="text-xl mt-3">Recommendation</p>
                      <p className="text-sm pb-7 my-1">
                        {
                          reportToShow?.CODE_ANALYSIS[vulnerability]?.metadata
                            ?.ref
                        }
                      </p>
                      <p className="text-xl mt-3">Regulatory</p>
                      <div className="flex justify-between">
                        <div className="my-4">
                          <div className="">
                            <p className="text-sm">CWE :</p>
                            <p className="text-red text-xs">
                              {
                                reportToShow?.CODE_ANALYSIS[vulnerability]
                                  ?.metadata?.cwe
                              }
                            </p>
                          </div>
                          <div className="">
                            <p className="text-sm">Risk OWASP:</p>
                            <p className="text-red text-xs">
                              {
                                reportToShow?.CODE_ANALYSIS[vulnerability]
                                  ?.metadata?.owasp_mobile
                              }
                            </p>
                          </div>
                          <div className="">
                            <p className="text-sm">Seveirty:</p>
                            <p className="text-red text-xs">
                              {
                                reportToShow?.CODE_ANALYSIS[vulnerability]
                                  ?.metadata?.severity
                              }
                            </p>
                          </div>

                          <div className="">
                            <p className="text-sm">CVSS:</p>
                            <p className="text-red text-xs">
                              {
                                reportToShow?.CODE_ANALYSIS[vulnerability]
                                  ?.metadata?.cvss
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-10">
                    {vulnerability === "" && machoAnalysis === "high" && (
                      <div>
                        <p className="text-2xl">Manifest Analysis</p>
                        {reportToShow?.MANIFEST_ANALYSIS.map(
                          (item, i) =>
                            item.stat === "high" && (
                              <div className="text-xs my-4" key={i}>
                                <p className="mb-1 text-sm ">{item?.name}</p>
                                <p className="bg-accent ">{item?.title}</p>
                                <p className="py-1 ">Status : {item?.stat}</p>
                                <p className="py-1 ">
                                  Description : {item?.desc}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    )}

                    {/* ------------------------------- */}
                    {vulnerability === "" && machoAnalysis === "warning" && (
                      <div>
                        <p className="text-2xl">Manifest Analysis</p>
                        {reportToShow?.MANIFEST_ANALYSIS.map(
                          (item, i) =>
                            item.stat === "warning" && (
                              <div className="text-xs my-4" key={i}>
                                <p className="mb-1 text-sm ">{item?.name}</p>
                                <p className="bg-accent ">{item?.title}</p>
                                <p className="py-1 ">Status : {item?.stat}</p>
                                <p className="py-1 ">
                                  Description : {item?.desc}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    )}

                    {/* ------------------------------- */}
                    {vulnerability === "" && machoAnalysis === "info" && (
                      <div>
                        <p className="text-2xl">Manifest Analysis</p>
                        {reportToShow?.MANIFEST_ANALYSIS.map(
                          (item, i) =>
                            item.stat === "info" && (
                              <div className="text-xs my-4" key={i}>
                                <p className="mb-1 text-sm ">{item?.name}</p>
                                <p className="bg-accent ">{item?.title}</p>
                                <p className="py-1 ">Status : {item?.stat}</p>
                                <p className="py-1 ">
                                  Description : {item?.desc}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>

                  {/* {certificateAnalysis &&
                vulnerability === "" &&
                machoAnalysis === "" &&
                 (
                  <div className="w-full">
                    <div className="mb-4">
                      <p className="text-2xl">Certificate Analysis Findings</p>
                      {reportToShow.CERTIFICATE_ANALYSIS.certificate_findings.map(
                        (finding, index) => (
                          <div key={index} className="mb-4 p-2 grey2">
                            {Object.entries(finding).map(
                              ([key, value], idx) => (
                                <p key={idx} className="text-sm">
                                  <span className="font-semibold">{key}:</span>{" "}
                                  {value.toString()}
                                </p>
                              )
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )} */}

                  {certificateAnalysis &&
                    vulnerability === "" &&
                    machoAnalysis === "" && (
                      <div className="w-full">
                        <div className="mb-4">
                          <p className="text-2xl">
                            Certificate Analysis Findings
                          </p>
                          {reportToShow.CERTIFICATE_ANALYSIS.certificate_findings
                            .filter(
                              (finding) =>
                                selectedSeverity === "" ||
                                finding[0].toLowerCase() === selectedSeverity
                            )
                            .map((finding, index) => (
                              <div key={index} className="mb-4 p-2 grey2">
                                {Object.entries(finding).map(
                                  ([key, value], idx) => (
                                    <p key={idx} className="text-sm">
                                      <span className="font-semibold">
                                        {names[idx] || `Field ${idx}`}:
                                      </span>{" "}
                                      {value.toString()}
                                    </p>
                                  )
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                  {networkSecurity &&
                    vulnerability === "" &&
                    certificateAnalysis === "" &&
                    machoAnalysis === "" && (
                      <div className="w-full">
                        <div className="mb-4">
                          <p className="text-2xl mb-4">Network Security </p>
                          {networkSecurity === "high" &&
                            reportToShow.NETWORK_SECURITY.map(
                              (item, index) =>
                                item.severity === "high" && (
                                  <div
                                    key={index}
                                    className="mb-4 p-2 bg-grey2"
                                  >
                                    {/* Render High Severity Items */}
                                    <div className="flex items-center">
                                      <p className="text-sm font-bold">
                                        Severity
                                      </p>
                                      <p className="text-red ml-4 ">High</p>
                                    </div>
                                    <p className=" text-sm break-words">
                                      Scope: {item.scope}
                                    </p>
                                    <p className="text-sm">
                                      Description: {item.description}
                                    </p>
                                  </div>
                                )
                            )}
                          {networkSecurity === "warning" &&
                            reportToShow.NETWORK_SECURITY.map(
                              (item, index) =>
                                item.severity === "warning" && (
                                  <div
                                    key={index}
                                    className="mb-4 p-2 bg-grey2"
                                  >
                                    {/* Render Warning Severity Items */}
                                    <div className="flex items-center">
                                      <p className="text-sm font-bold">
                                        Severity
                                      </p>
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
                            reportToShow.NETWORK_SECURITY.map(
                              (item, index) =>
                                item.severity === "info" && (
                                  <div
                                    key={index}
                                    className="mb-4 p-2 bg-grey2 "
                                  >
                                    {/* Render Low Severity Items */}
                                    <div className="flex items-center">
                                      <p className="text-sm font-bold">
                                        Severity:
                                      </p>
                                      <p className="text-[#26DA09] ml-2">Low</p>
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
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportHistoryApk;
