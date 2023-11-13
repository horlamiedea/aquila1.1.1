import { useEffect, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { LuFileText, LuInfo } from "react-icons/lu";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import socketUrl from "../../../services/webSocketUrl";
import { useSelector } from "react-redux";
import api from "../../../services/api";
import baseURL from "../../../services/baseUrl";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectCom = () => {
  const [totalCodeObfuscation, setTotalCodeObfuscation] = useState(false);
  const [obfuscate, setObfuscate] = useState(false);
  const [assestStringEcryption, setAssestStringEcryption] = useState(false);
  const [obfuscateServices, setObfuscateServices] = useState(false);
  const [totalDataEncryption, settotalDataEncryption] = useState(false);
  const [shouldSign, setShouldSign] = useState(false);
  const [osIntegrity, setosIntegrity] = useState(false);
  const [preventRoot, setPreventRoot] = useState(false);
  const [preventDeveloperMode, setPreventDeveloperMode] = useState(false);
  const [preventUnknownResources, setPreventUnknownResources] = useState(false);
  const [enforceTls, setEnforceTls] = useState(false);
  const [preventEmulator, setPreventEmulator] = useState(false);
  const [mobilePrivacy, setmobilePrivacy] = useState(false);
  const [preventScreenShot, setPreventScreenShot] = useState(false);
  const [checkSelinux, setCheckSelinux] = useState(false);
  const [preventCopyPaste, setPreventCopyPaste] = useState(false);
  const [shield, setshield] = useState(false);
  const [debugRemoval, setDebugRemoval] = useState(false);
  const [preventDebuggers, setPreventDebuggers] = useState(false);
  const [flowRelocation, setFlowRelocation] = useState(false);
  const [protectApkAbb, setProtectApkAbb] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [featuresLoading, setFeaturesLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [protectData,setProtectData] = useState("")
  const { currentProject } = useSelector((state) => state.appState);
  const { token } = useSelector((state) => state.auth);
  const [params, setParams] = useState({
    project_name: currentProject,
    access: token.access,
    app_type: "apk",
  });

  const keystore_password = "keystore_password";
  const key_alias = "key_alias";
  const key_password = "key_password";
  const protect_apk_aab = "APK";



  useEffect(() => {
    const fetchprotectFeatures = async () => {
      setFeaturesLoading(true);
      try {
        const res = await api.get(
          `${baseURL}/protect/android/${currentProject}/`
        );

        setPreventEmulator(res?.data?.prevent_emulators);
        setObfuscate(res?.data?.obfuscate);
        setPreventScreenShot(res?.data?.prevent_screenshots);
        setPreventUnknownResources(res?.data?.unknown_sources);
        setPreventRoot(res?.data?.prevent_root);
        setObfuscateServices(res?.data?.obfuscate_services);
        setFlowRelocation(res?.data?.flow_relocation);
        setPreventCopyPaste(res?.data?.prevent_copy_paste);
        setAssestStringEcryption(res.data.asset_string_encryption);
        setPreventDebuggers(res.data.prevent_debuggers);
        setEnforceTls(res.data.enforce_tls);
        setPreventDeveloperMode(res.data.prevent_developer_mode);
        setProtectApkAbb(res.data.protect_apk_aab);
        setCheckSelinux(res?.data?.check_selinux);
        setDebugRemoval(res?.data?.debug_removal);
        setShouldSign(res.data.is_should_sign);
        setFeaturesLoading(false);
      } catch (error) {
        console.log(error);
        setFeaturesLoading(false);
      }
    };

    fetchprotectFeatures();
  }, []);
  useEffect(() => {
    // Create a copy of the existing params
    const updatedParams = { ...params };

    // Update params based on state changes
    if (preventRoot) {
      updatedParams.prevent_root = preventRoot;
    } else {
      delete updatedParams.prevent_root;
    }
    if (enforceTls) {
      updatedParams.enforce_tls = enforceTls;
    } else {
      delete updatedParams.enforce_tls;
    }
    if (protectApkAbb) {
      updatedParams.protect_apk_aab = protect_apk_aab;
    } else {
      delete updatedParams.protect_apk_aab;
    }
    if (flowRelocation) {
      updatedParams.flow_relocation = flowRelocation;
    } else {
      delete updatedParams.anti_root;
    }
    if (obfuscateServices) {
      updatedParams.obfuscate_services = obfuscateServices;
    } else {
      delete updatedParams.obfuscate_services;
    }
    if (preventUnknownResources) {
      updatedParams.unknown_sources = preventUnknownResources;
    } else {
      delete updatedParams.unknown_sources;
    }
    if (preventCopyPaste) {
      updatedParams.prevent_copy_paste = preventCopyPaste;
    } else {
      delete updatedParams.prevent_copy_paste;
    }
    if (assestStringEcryption) {
      updatedParams.asset_string_encryption = assestStringEcryption;
    } else {
      delete updatedParams.asset_string_encryption;
    }

    if (preventEmulator) {
      updatedParams.anti_emulator = preventEmulator;
    } else {
      delete updatedParams.anti_emulator;
    }
    if (preventDebuggers) {
      updatedParams.prevent_debuggers = preventDebuggers;
    } else {
      delete updatedParams.prevent_debuggers;
    }

    if (obfuscate) {
      updatedParams.obfuscate = obfuscate;
    } else {
      delete updatedParams.obfuscate;
    }

    if (preventScreenShot) {
      updatedParams.prevent_screenshots = preventScreenShot;
    } else {
      delete updatedParams.allow_screenshots;
    }
    if (shouldSign) {
      updatedParams.keystore_password = keystore_password;
      updatedParams.key_alias = key_alias;
      updatedParams.key_password = key_password;
      updatedParams.is_should_sign = true;
    } else {
      delete updatedParams.key_password;
      delete updatedParams.keystore_password;
      delete updatedParams.key_alias;
      delete updatedParams.is_should_sign;
    }
    if (preventDeveloperMode) {
      updatedParams.prevent_developer_mode = preventDeveloperMode;
    } else {
      delete updatedParams.prevent_developer_mode;
    }
    if (checkSelinux) {
      updatedParams.prevent_developer_mode = checkSelinux;
    } else {
      delete updatedParams.check_selinux;
    }
    if (debugRemoval) {
      updatedParams.debug_removal = debugRemoval;
    } else {
      delete updatedParams.debug_removal;
    }

    // Update the params state with the updatedParams
    setParams(updatedParams);

    // eslint-disable-next-line
  }, [
    obfuscate,
    assestStringEcryption,
    obfuscateServices,
    totalDataEncryption,
    shouldSign,
    preventRoot,
    preventDeveloperMode,
    preventUnknownResources,
    enforceTls,
    preventEmulator,
    mobilePrivacy,
    preventScreenShot,
    checkSelinux,
    preventCopyPaste,
    debugRemoval,
    preventDebuggers,
    flowRelocation,
    protectApkAbb,
  ]);

  const handleTotalCodeObfuscation = () => {
    setTotalCodeObfuscation(!totalCodeObfuscation);
    if (!totalCodeObfuscation) {
      setObfuscate(false);
      setAssestStringEcryption(false);
      setObfuscateServices(false);
    }
  };
  const handleDataEncryption = () => {
    settotalDataEncryption(!totalDataEncryption);
    if (!totalDataEncryption) {
      setShouldSign(false);
    }
  };

  const handleOSIntergrity = () => {
    setosIntegrity(!osIntegrity);
    if (!osIntegrity) {
      setPreventRoot(false);
      setPreventDeveloperMode(false);
      setPreventUnknownResources(false);
      setEnforceTls(false);
      setPreventEmulator(false);
    }
  };

  const handleMobilePrivacy = () => {
    setmobilePrivacy(!mobilePrivacy);
    if (!mobilePrivacy) {
      setPreventScreenShot(false);
      setCheckSelinux(false);
      setPreventCopyPaste(false);
    }
  };

  const handleShield = () => {
    setshield(!shield);
    if (!shield) {
      setDebugRemoval(false);
      setPreventDebuggers(false);
      setFlowRelocation(false);
      setProtectApkAbb(false);
    }
  };

  const handleProtect = () => {
    const url = `${socketUrl}/protect/`;

    try {

      const newSocket = new WebSocket(url);
      toast.info("Aquila is protecting your app")
      setIsLoading(true);
      setSuccess(false);

      newSocket.onopen = () => {     
        newSocket.send(JSON.stringify(params))
      };

      newSocket.onmessage = (event) => {       

        const data = JSON.parse(event.data);
        if(data?.data?.id){
          setProtectData(data.data.protected_app)
          setSuccess(true)
        }
      };
      newSocket.onerror = (event) => {
        console.error("WebSocket error occurred", event);
        setIsLoading(false);
        console.log(newSocket.readyState, "on-error");
      };

      newSocket.onclose = (event) => {     
        setIsLoading(false);
        console.log("WebSocket connection closed", event);
      };
    } catch (error) {
      setIsLoading(false);
      console.error("Error connecting to WebSocket", error);
    }
  };


  useEffect(() => {
    if (success) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [success]);

  const file = true;
  return (
    <div>
      <div
        className={`shadow-lg bg-white text-[#9BA5B7] w-full mb-10  h-full rounded-md flex ${
          file ? "flex-col" : ""
        } mb-5 justify-center items-center `}
      >
        <div className="w-[90%] md:w-[80%] text-[12px] h-full flex flex-col md:text-[16px]">
          <div className="w-full bg-grey2 h-[70%] mt-7  rounded-xl">
            <div className="w-[90%]  flex flex-col mx-auto">
              <div className="flex justify-between items-center mb-5 mt-4">
                <div className="flex gap-2 items-center">
                  <FiMinusCircle />
                  <p className="text-grey">TOTAL Code Obfuscation</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div onClick={handleTotalCodeObfuscation}>
                    {totalCodeObfuscation ? (
                      <PiToggleRightFill size={20} color="red" />
                    ) : (
                      <PiToggleLeftFill size={20} />
                    )}
                  </div>

                  <p>Disable</p>
                  <LuFileText />
                </div>
              </div>
              <hr />
              <div className=" mt-4 ">
                <div className="flex gap-24 my-2  items-center">
                  <div className="">
                    <p>Obfuscte</p>
                    <p>Assesr String Encryption </p>
                    <p>Obfuscation Services</p>
                  </div>
                  <div className="flex flex-col items-center gap-4 md:gap-2">
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setObfuscate(!obfuscate)}>
                        {obfuscate ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div
                        onClick={() =>
                          setAssestStringEcryption(!assestStringEcryption)
                        }
                      >
                        {assestStringEcryption ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div
                        onClick={() => setObfuscateServices(!obfuscateServices)}
                      >
                        {obfuscateServices ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* total data encryption */}
          <div className="w-full bg-grey2 h-[70%] mt-7  rounded-xl">
            <div className="w-[90%]  flex flex-col mx-auto">
              <div className="flex justify-between items-center mb-5 mt-4">
                <div className="flex gap-2 items-center">
                  <FiMinusCircle />
                  <p className="text-grey">TOTAL Data Encryption</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div onClick={handleDataEncryption}>
                    {totalDataEncryption ? (
                      <PiToggleRightFill size={20} color="red" />
                    ) : (
                      <PiToggleLeftFill size={20} />
                    )}
                  </div>

                  <p>Disable</p>
                  <LuFileText />
                </div>
              </div>
              <hr />
              <div className=" mt-4 ">
                <div className="flex gap-36 md:gap-48 my-2 items-center">
                  <div className="">
                    <p>Sign App</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setShouldSign(!shouldSign)}>
                        {shouldSign ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* os integrity */}
          <div className="w-full bg-grey2 h-[70%] mt-7  rounded-xl">
            <div className="w-[90%]  flex flex-col mx-auto">
              <div className="flex justify-between items-center mb-5 mt-4">
                <div className="flex gap-2 items-center">
                  <FiMinusCircle />
                  <p className="text-grey">OS Integrity</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div onClick={handleOSIntergrity}>
                    {osIntegrity ? (
                      <PiToggleRightFill size={20} color="red" />
                    ) : (
                      <PiToggleLeftFill size={20} />
                    )}
                  </div>

                  <p>Disable</p>
                  <LuFileText />
                </div>
              </div>
              <hr />
              <div className=" mt-4 ">
                <div className="flex gap-24 my-2 items-center">
                  <div className="">
                    <p>Prevent Rooting</p>
                    <p>Prevent Developer Mode</p>
                    <p>Prevent Unknown Resources</p>
                    <p>Enforce TLs</p>
                    <p>Prevent Emulator</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setPreventRoot(!preventRoot)}>
                        {preventRoot ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div
                        onClick={() =>
                          setPreventDeveloperMode(!preventDeveloperMode)
                        }
                      >
                        {preventDeveloperMode ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div
                        onClick={() =>
                          setPreventUnknownResources(!preventUnknownResources)
                        }
                      >
                        {preventUnknownResources ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setEnforceTls(!enforceTls)}>
                        {enforceTls ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setPreventEmulator(!preventEmulator)}>
                        {preventEmulator ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Privacy */}
          <div className="w-full bg-grey2 h-[70%] mt-7  rounded-xl">
            <div className="w-[90%]  flex flex-col mx-auto">
              <div className="flex justify-between items-center mb-5 mt-4">
                <div className="flex gap-2 items-center">
                  <FiMinusCircle />
                  <p className="text-grey">Mobile Privacy</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div onClick={handleMobilePrivacy}>
                    {mobilePrivacy ? (
                      <PiToggleRightFill size={20} color="red" />
                    ) : (
                      <PiToggleLeftFill size={20} />
                    )}
                  </div>

                  <p>Disable</p>
                  <LuFileText />
                </div>
              </div>
              <hr />
              <div className=" mt-4 ">
                <div className="flex gap-24 my-2 items-center">
                  <div className="">
                    <p>Prevent Screen Shot</p>
                    <p>Check Selinux</p>
                    <p>Prevent Copyand Paste</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div
                        onClick={() => setPreventScreenShot(!preventScreenShot)}
                      >
                        {preventScreenShot ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setCheckSelinux(!checkSelinux)}>
                        {checkSelinux ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div
                        onClick={() => setPreventCopyPaste(!preventCopyPaste)}
                      >
                        {preventCopyPaste ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* shield */}
          <div className="w-full bg-grey2 h-[70%] my-7   rounded-xl">
            <div className="w-[90%]  flex flex-col mx-auto">
              <div className="flex justify-between items-center mb-5 mt-4">
                <div className="flex gap-2 items-center">
                  <FiMinusCircle />
                  <p className="text-grey">Shield</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div onClick={handleShield}>
                    {shield ? (
                      <PiToggleRightFill size={20} color="red" />
                    ) : (
                      <PiToggleLeftFill size={20} />
                    )}
                  </div>

                  <p>Disable</p>
                  <LuFileText />
                </div>
              </div>
              <hr />
              <div className=" mt-4 ">
                <div className="flex gap-24 my-2 items-center">
                  <div className="">
                    <p>Debug Removal</p>
                    <p>Prevent Debugger</p>
                    <p>Flow Relocation</p>
                    <p>Protect Apk</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setDebugRemoval(!debugRemoval)}>
                        {debugRemoval ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div
                        onClick={() => setPreventDebuggers(!preventDebuggers)}
                      >
                        {preventDebuggers ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setFlowRelocation(!flowRelocation)}>
                        {flowRelocation ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuInfo size={15} />
                      <div onClick={() => setProtectApkAbb(!protectApkAbb)}>
                        {protectApkAbb ? (
                          <PiToggleRightFill size={20} color="red" />
                        ) : (
                          <PiToggleLeftFill size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={isLoading}
          onClick={handleProtect}
          className="bg-gold text-white mb-5 px-6 rounded-md py-3"
        >
          Protect
          {isLoading && (
            <i className="fa-solid fa-spinner fa-spin-pulse ml-2"></i>
          )}
        </button>

        {success && (
          <div className="fixed top-0 left-0 w-full h-full bg-black shadow-lg shadow-neutral-500/50 flex justify-center items-center backdrop-filter backdrop-blur-sm bg-opacity-50 z-999">
          <div className="bg-white w-[90%] md:w-[55%] h-[13rem] flex items-center pl-12 justify-center rounded-md relative">
              <AiOutlineClose className="absolute top-3 right-3 cursor-pointer" onClick={() => setSuccess(false)} />
              <div className="flex flex-col justify-center items-center  ">

              <i className="fa-regular fa-circle-check text-[#44CC11] text-6xl mb-5 "></i>
              <p>Your app have been protected</p>
              
              <a href={protectData} rel="noreferrer" target="_blank" download>
        Click <span className="text-gold">Here</span> to download
      </a>
            </div>
          </div>
      </div>
      
          
        )}
      </div>
    </div>
  );
};

export default ProtectCom;
