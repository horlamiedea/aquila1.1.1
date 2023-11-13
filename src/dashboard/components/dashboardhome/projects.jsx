
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SET_CURRENTPROJECT } from "../../../redux/slice/appState";
import { navigateToDashboard } from "../../utils/UtilFunction";

import { FaFolderClosed } from "react-icons/fa6";
import { IoIosAppstore } from "react-icons/io";
import { RiGooglePlayFill } from "react-icons/ri";

// Assuming these are your modal views




const Projects = () => {

  const { projects } = useSelector((state) => state.appState);
  const disPatch = useDispatch();
  const navigate = useNavigate();


  

 


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
      
     {projects?.map((project, i) => (
        <div  key={i} onClick={() => setCurrentProject(project.name)}>
          <div className="flex flex-col items-center justify-center  bg-white drop-shadow-sm border-2 border-grey2  py-2 w-40 h-36 px-2  rounded-2xl">
            <FaFolderClosed color="red" size={40} />
            <p className="text-lg text-center">{project.name}</p>
            <div className="flex justify-center gap-2">
              {project.apk && <RiGooglePlayFill color="red" size={14} />}
              {project.ipa && <IoIosAppstore color="red" size={14} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;