import { useState } from 'react';
// import './ProtectFeatureInfo.css'; // Assuming you have an external CSS file

const ProtectFeatureInfo = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);
  const handleClick = () => setShowTooltip(!showTooltip);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} className="relative">
      {children}
      {showTooltip && (
        <div className="tooltip-box absolute bottom-full mb-2 -left-20 p-2 bg-white border border-grey2 rounded-lg shadow-md w-44 text-xs z-50">
          {content}
        </div>
      )}
    </div>
  );
};

export default ProtectFeatureInfo;
