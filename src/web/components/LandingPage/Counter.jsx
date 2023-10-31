import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increase count by 1000 in each interval
      setCount((prevCount) => prevCount + 8000);
    }, 100);

    // Clear the interval when count reaches 430,000
    if (count >= 400000) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increase count by 10000 in each interval
      setCount2((prevCount) => prevCount + 10000);
    }, 100);

    // Clear the interval when count2 reaches 1,200,000
    if (count2 >= 1200000) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count2]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increase count by 100 in each interval
      setCount3((prevCount) => prevCount + 1000);
    }, 100);

    // Clear the interval when count3 reaches 25,000
    if (count3 >= 25000) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count3]);

  // Function to format numbers
  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M+";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + "K+";
    } else {
      return Math.floor(number).toString();
    }
  };

  return (
    <div className="relative md:top-44  h-[30rem] md:h-72 md:w-[90%] flex flex-col items-center justify-center md:mx-auto md:flex md:flex-row md:justify-evenly font-montserrat">
      <div className="w-40 md:w-72 text-center">
        <p className="text-red font-semibold text-4xl md:text-6xl -mt-12">{formatNumber(count)}</p>
        <p className="text-sm md:text-xl mt-1 md:mt-4 text-grey">Malicious Installation Packages Detected (Q3 2022)</p>
      </div>

      <div className="md:border-r md:border-red md:border-2 md:h-24"></div>

      <div className="w-40 md:w-48 text-center mt-20 md:mt-0">
        <p className="text-red text-4xl md:text-6xl font-semibold -mt-12">{formatNumber(count2)}</p>
        <p className="text-sm md:text-xl mt-4 text-grey">New Android Malware Samples (2022)</p>
      </div>

      <div className="md:border-r md:border-red md:border-2 h-24"></div>

      <div className="w-40 md:w-48 text-center ">
        <p className="text-red text-4xl md:text-6xl font-bold -mt-16">{formatNumber(count3)}</p>
        <p className="text-sm md:text-xl mt-4 text-grey">High-Risk Vulnerable Apps</p>
      </div>
    </div>
  );
}

export default Counter;
