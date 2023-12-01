import { AiOutlineClose } from "react-icons/ai";
import {
  SET_CURRENTPROJECT,
  TOGGLE_OPENMODAL,
} from "../../../redux/slice/appState";
import { useDispatch } from "react-redux";
import { useState } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const NewProjectModal = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const disPatch = useDispatch();
  const navigate = useNavigate();






  const createProject = async (e) => {
    e.preventDefault();
    if (!name) {
      return setSubmitted(true);
    }

    try {
      setLoading(true);
      await api.post("api/projects/", { name });

      setLoading(false);
      disPatch(TOGGLE_OPENMODAL());
      disPatch(SET_CURRENTPROJECT(name));
      navigate("/dashboard/projects");

      toast.success(`Project ${name} Created`);
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 400) {
        toast.error(`${error.response.data.error}`);
      }
      console.log(error);
    }
  };

  return (
    <div className="bg-black shadow-lg shadow-neutral-500/50 z-10 h-full absolute  w-full flex justify-center items-center backdrop-filter backdrop-blur-sm bg-opacity-50">
      <div className="bg-white w-[90%] md:w-[40%] h-[15rem] flex items-center pl-12 rounded-md relative ">
        <AiOutlineClose
          onClick={() => disPatch(TOGGLE_OPENMODAL())} 
          className="absolute top-3 right-3 cursor-pointer"
        />
        <div className="">
          <p className="text-2xl">Create New Project</p>
          <p className="text-red">Project Name</p>
          <form onSubmit={createProject} className="flex flex-col md:w-1/2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Project Name"
              className="bg-grey2 py-2 mt-3 w-[13rem] md:w-[20rem] pl-4 rounded-md outline-none"
            />
            {submitted && !name && (
              <p className="text-red text-xs md:text-sm mb-2">
                Create a Project Name
              </p>
            )}
            <button
              disabled={loading}
              className="bg-red pb-2 pt-1 text-white rounded-md mt-3 "
            >
              Create Project
              {loading && (
                <i className="fa-solid fa-spinner fa-spin-pulse ml-2"></i>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;
