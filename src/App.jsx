import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./web/pages/Home";
import Scan from "./web/pages/Scan";
import Protect from "./web/pages/Protect";
import Monitor from "./web/pages/Monitor";
import Contact from "./web/pages/Contact";
import Blog from "./web/pages/Blog";
import { SignedAccess, UserAccess } from "./dashboard/utils/ProtectedRoutes";
import Login from "./web/auth/Login";
import DashboardHome from "./dashboard/pages/DashboardHome";
import { useDispatch } from "react-redux";

import ForgetPassword from "./web/auth/ForgetPassword";
import Project from "./dashboard/pages/Project";
import ProjectDetail from "./dashboard/pages/ProjectDetail";
import Signup from "./web/auth/Signup";
import Verified from "./web/auth/Verified";
import Activate from "./web/auth/Activate";
import PasswordReset from "./web/auth/PasswordReset";
import ProjectReportAPK from "./dashboard/pages/ProjectReportAPK";
import ProjectReportIOS from "./dashboard/pages/ProjectReportIOS";
import { useEffect } from "react";
import { LOGIN_USER } from "./redux/slice/auth";
import { SET_CURRENTPROJECT, SET_REPORT } from "./redux/slice/appState";
import ImageUpload from "./utils/ImageUpload";
import { useCookies } from "react-cookie";
import CookiesPolicy from "./web/components/CookiesPolicy";
import UserGuide from "./web/pages/UserGuide";
import CookieConsent from "./web/components/CookiesConsent";
import CusRep from "./web/Chat/admin/CusRep";
import CusRepLogin from "./web/Chat/admin/CusRepLogin";
import { ADD_CUSTOMER_REP } from "./redux/slice/chat";
import UpdateProfile from "./web/auth/UpdatedProfile";
import ReportHistoryApk from "./dashboard/pages/ReportHistoryApk";





function App() {
  const [cookies] = useCookies(["cookieConsent"]);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    const currentProject = JSON.parse(localStorage.getItem("currentProject"));
    const report = JSON.parse(localStorage.getItem("report"));
    const customerRep = JSON.parse(localStorage.getItem("cusRep"));

    if (token) {
      dispatch(LOGIN_USER(token));
    }
    if (currentProject) {
      dispatch(SET_CURRENTPROJECT(currentProject));
    }
    if (report) {
      dispatch(SET_REPORT(report));
    }
    if (customerRep) {
      dispatch(ADD_CUSTOMER_REP(customerRep));
    }

  }, []);

  return (
    <>
      <Router>
      {!cookies.cookieConsent && <CookieConsent />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/protect" element={<Protect />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />

          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/admin-login" element={<CusRepLogin />} />
            <Route path="/customer-support" element={<CusRep />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Activate />} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/update-profile" element={<UpdateProfile/>} />
          <Route element={<SignedAccess />}>
          <Route path="/update-profile" element={<UpdateProfile/>} />
            <Route path="/dashboard" element={<DashboardHome />} />
          </Route>
          <Route element={<UserAccess />}>
            <Route path="/dashboard/projects" element={<Project />} />
            <Route
              path="/dashboard/project/details"
              element={<ProjectDetail />}
            />
            <Route
              path="/dashboard/project/report/apk"
              element={<ProjectReportAPK />}
            />
            <Route
              path="/dashboard/project/report/ios"
              element={<ProjectReportIOS />}
            />
            <Route
              path="/dashboard/project/report/report-history"
              element={<ReportHistoryApk />}
            />
            <Route />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
