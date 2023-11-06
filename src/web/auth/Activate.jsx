
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import baseURL from "../../services/baseUrl";
const getTokenFromURL = () => {
  return new URLSearchParams(window.location.search).get("token");
};

const Activate = () => {
  const [verified, setVerified] = useState(null);
  const navigate = useNavigate();

  const verifyUser = async (token) => {
    try {
      const response = await api.post(
        `${baseURL}/auth/email-verify/`,
        { token }
      );
      setVerified(true);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyUser(getTokenFromURL());
  }, []);

  if (verified) {
    navigate("/login");
  }


};

export default Activate;
