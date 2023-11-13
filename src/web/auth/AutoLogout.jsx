// AutoLogoutComponent.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_USER } from '../../redux/slice/auth';


const AutoLogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) return;

    let timer;

    const handleInactivity = () => {
      // Clear local storage
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false'); // If you're using this flag

      // Dispatch the Redux action
      dispatch(LOGOUT_USER());

  
      navigate('/inactivity');
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleInactivity, 1800000); // 30 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, [dispatch, navigate]);

  return null;
};

export default AutoLogoutComponent;
