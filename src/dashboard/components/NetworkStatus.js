import { useEffect } from 'react';
import { toast } from 'react-toastify';

const NetworkStatus = () => {
  const checkNetwork = () => {
    if (navigator.connection) {
      const { downlink, effectiveType } = navigator.connection;
      if (downlink < 1 || effectiveType === '2g') {
        toast.warn('Poor network connection detected', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('online', checkNetwork);
    window.addEventListener('offline', checkNetwork);

    // Initial check
    checkNetwork();

    return () => {
      window.removeEventListener('online', checkNetwork);
      window.removeEventListener('offline', checkNetwork);
    };
  }, []);

  return null; // This component does not render anything
};

export default NetworkStatus;
