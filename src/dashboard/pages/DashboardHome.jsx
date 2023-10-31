import Navbar from "../components/nav/Navbar";
import HeroImg from "../../assets/Vector.png";
import { AiOutlineAppstoreAdd, AiFillFolderAdd } from "react-icons/ai";
import NewProjectModal from "../components/modals/NewProjectModal";
import { useSelector, useDispatch } from "react-redux";
import { ADD_PROJECTS, TOGGLE_OPENMODAL } from "../../redux/slice/appState";

import { useEffect } from "react";
import api from "../../services/api";
import Projects from "../components/dashboardhome/projects";

const DashboardHome = () => {
  const { openModal, profile, projects } = useSelector(
    (state) => state.appState
  );
  const disPatch = useDispatch();
  

  const fetchProjects = async () => {
    try {
      const res = await api.get("/api/projects");
      disPatch(ADD_PROJECTS(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-grey2 text-grey">
      {openModal && <NewProjectModal />}
      <Navbar />
      <div className="w-[90%]  md:w-[80%] h-screen mx-auto pt-28">
        <div className="shadow-md bg-white w-full h-[15rem] rounded-md flex justify-between items-center overflow-hidden ">
          {!projects ? (
            <div className="pl-10">
              <p className="text-lg lg:text-3xl mb-3">{`Hello ${profile?.username}`}</p>
              <p className="text-sm">
                It seems you are yet to upload an App. <br /> Why not start by
                creating a project. <br /> Click the button below
              </p>
              <button
                onClick={() => disPatch(TOGGLE_OPENMODAL())}
                className="bg-red text-white px-4 py-1 mt-3 rounded-md"
              >
                New Project
              </button>
            </div>
          ) : (
            <div className="pl-10">
              <p className="text-3xl mb-3">{`Hello ${profile?.username}`}</p>
              <p className="text-sm">
                Go ahead and select a project to experience <br />
                Aquila&apos;s Seamless feature <br /> or create a new Project
              </p>
              <button
                onClick={() => disPatch(TOGGLE_OPENMODAL())}
                className="bg-gold text-white px-4 py-1 mt-3 rounded-md"
              >
                New Project
              </button>
            </div>
          )}
          <div className=" hidden md:block h-full overflow-hidden">
            <img src={HeroImg} alt="hero_dashboard" />
          </div>
        </div>
        <div className="flex items-center my-4 gap-2">
          <AiOutlineAppstoreAdd />
          <span>Project Logs</span>
        </div>
        <div className="shadow-lg bg-white w-full h-min-[10rem] py-3 rounded-md flex  justify-center  ">
          {!projects || projects.length === 0 &&
            <div className="flex flex-col justify-center mx-auto items-center">
              <AiFillFolderAdd size={40} />
              <p className="text-sm">Oops! No Project found</p>
            </div>}
          { projects &&
            <div className="flex py-10 justify-center items-center   ">
              <Projects />
            </div>}
          
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
