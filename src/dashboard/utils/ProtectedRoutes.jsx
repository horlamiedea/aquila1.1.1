// import { useSelector } from "react-redux";
import { Outlet, Navigate , useLocation} from "react-router-dom";



const SignedAccess = () => {
  const token = JSON.parse(localStorage.getItem("user"))
  // const auth = useSelector((state) => state.auth);
  const location = useLocation();
  return token ? <Outlet /> : <Navigate to="/login" state={{from : location}} replace />;
};

const UserAccess = () => {
  const currentProject = JSON.parse(localStorage.getItem("currentProject"))
  // const {currentProject} = useSelector((state) => state.appState);
  const location = useLocation();
  return currentProject ? <Outlet /> : <Navigate to="/dashboard" state={{from : location}} replace />;
};

export { SignedAccess, UserAccess };
