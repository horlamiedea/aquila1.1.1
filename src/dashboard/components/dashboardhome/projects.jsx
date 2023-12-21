import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SET_CURRENTPROJECT } from "../../../redux/slice/appState";
import { navigateToDashboard } from "../../utils/UtilFunction";

import { FaFolderClosed } from "react-icons/fa6";
import { IoIosAppstore } from "react-icons/io";
import { RiDeleteBin6Line, RiGooglePlayFill } from "react-icons/ri";
import api from "../../../services/api";
// import { LiaQuestionSolid } from "react-icons/lia";

// Assuming these are your modal views

// const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-grey bg-opacity-50 overflow-y-auto  z-50 flex justify-center items-center">
//       <div className=" flex justify-center items-center flex-col bg-white p-8 shadow-2xl rounded-md ">
//        <div className="w-16 h-16 bg-grey2 rounded-full flex justify-center items-center">

//         <LiaQuestionSolid size={40} color="#f10"/>
//        </div>
       
//         <p className="text-2xl">Delete Project</p>
//         <p className="mt-4">This action cannot be reversed!</p>
//       <p>Are you sure you want to delete this project?</p>
//       <div className=" flex justify-between mt-4 w-[85%] ">
//       <button onClick={onClose} className="border border-4-grey text-grey py-1 px-6 rounded-md">No, Cancel</button>
//       <button onClick={onDelete} className="text-white bg-red py-1 px-6 rounded-md">Yes, Delete</button>
//       </div>
//       </div>
//     </div>
//   );
// };

const Projects = () => {
  const { projects } = useSelector((state) => state.appState);
  const disPatch = useDispatch();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const showDeleteModal = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  const setCurrentProject = (name) => {
    disPatch(SET_CURRENTPROJECT(name));
    localStorage.setItem("currentProject", JSON.stringify(name));
    if (navigateToDashboard(projects, name)) {
      return navigate("/dashboard/project/details");
    }
    navigate("/dashboard/projects");
  };

  // const deleteProject = async (project) => {
  //   try {
  //     const response = await api.delete(`/api/projects/${project.id}/`);
  //     if (response.status === 204) {
  //       // Project was deleted successfully, now you can dispatch an action to update the Redux store
  //       disPatch({
  //         type: "DELETE_PROJECT", // You'll need to add this action type in your slice
  //         payload: project.id,
  //       });
  //       closeDeleteModal();
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete project", error);
  //     // Handle error, maybe set an error message state and display it
  //   }
  // };

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {/* <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={() => deleteProject(projectToDelete)}
      /> */}

      {projects?.map((project, i) => (
        <div key={i} onClick={() => setCurrentProject(project.name)}>
          <div className="flex flex-col items-center justify-center  bg-white drop-shadow-sm border-2 border-grey2  py-2 w-40 h-36 px-2  rounded-2xl">
            <div className="pl-28 pb-6">
              {/* <RiDeleteBin6Line onClick={(event) => {
  event.stopPropagation(); 
  showDeleteModal(project);
}} /> */}
            </div>
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
