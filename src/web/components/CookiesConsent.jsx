import { useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {FaCookieBite} from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);
  const navigate = useNavigate(); // Updated for v6
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cookies.cookieConsent && location.pathname !== '/cookies-policy') {
      setIsVisible(true);
    }
  }, [cookies, location.pathname]);

  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/" });
    if (location.pathname === '/cookies-policy') {
      navigate('/'); // Updated for v6
    }
  };

  if (!isVisible) return null;

  const hideModal = () => {
    setIsVisible(false);
}

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div className="p-4 bg-white  md:w-[70%] lg:w-[50%] xl:w-[35%] w-full max-w-xl flex flex-col items-center justify-center rounded-lg shadow-md">
    <FaCookieBite size={60} className='text-red my-4'/>
    <p className='font-lato font-bold text-xl text-grey mb-2'>Cookies Consent</p>
    <p className="mb-4 w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] text-justify text-grey font-lato text-base">
      We use cookies to enhance your user experience. By using our website,
      you agree to our use of cookies.
    </p>
    <div className='w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] flex justify-between items-center mb-4'>
      <button 
        onClick={giveCookieConsent}
        className="px-8 py-1 bg-red text-white rounded"
      >
        Accept
      </button>
      <Link to="/cookies-policy" onClick={hideModal} className="text-red hover:underline">Learn more</Link>
    </div>
  </div>
</div>

  );
};

export default CookieConsent;
