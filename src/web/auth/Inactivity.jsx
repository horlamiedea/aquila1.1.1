import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../../redux/slice/auth';

const useAutoLogout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => dispatch(LOGOUT_USER()), 1800000); // 30 minutes
    };

    // Set up event listeners
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    // Set initial timer
    resetTimer();

    return () => {
      // Clean up
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, [dispatch]);
};

const Inactivity = () => {
  return (
    <div>
      Inactivity
    </div>
  )
}

export default Inactivity
