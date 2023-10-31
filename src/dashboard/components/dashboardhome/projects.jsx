import { FaFolderClosed } from "react-icons/fa6";
import { IoIosAppstore } from "react-icons/io";
import { RiGooglePlayFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {  SET_CURRENTPROJECT } from "../../../redux/slice/appState";
import { navigateToDashboard } from "../../utils/UtilFunction";

import { useEffect, useState } from "react";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const { projects, profile } = useSelector((state) => state.appState);
  const disPatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile.last_name) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProfile = () => {
    setShowModal(false); // Hide the modal
    navigate("/update-profile"); // Navigate to update profile page
  };

  const setCurrentProject = (name) => {
    disPatch(SET_CURRENTPROJECT(name));
    localStorage.setItem("currentProject", JSON.stringify(name));
    if (navigateToDashboard(projects, name)) {
      return navigate("/dashboard/project/details");
    }
    navigate("/dashboard/projects");
  };
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-xl mx-4">
            <p>Please update your profile to continue.</p>
            <button
              onClick={handleUpdateProfile}
              className="bg-red text-white px-4 py-2 mt-4 rounded"
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
      {projects?.map((project, i) => (
        <div  key={i} onClick={() => setCurrentProject(project.name)}>
          <div className="flex flex-col items-center  bg-white drop-shadow-sm border-2 border-grey2  py-4 h-28 w-28 px-6  rounded-2xl">
            <FaFolderClosed color="red" size={40} />
            <p className="text-lg">{project.name}</p>
            <div className="flex justify-center gap-2">
              {project.apk && <RiGooglePlayFill size={10} />}
              {project.ipa && <IoIosAppstore size={10} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;