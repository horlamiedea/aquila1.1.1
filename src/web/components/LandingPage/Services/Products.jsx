import { useState } from "react";
import VulnerabilityAssessment from "./Vulnerability Assessment";

const Products = () => {
  const tabs = [
    { label: "Vulnerability Assessment", content: <VulnerabilityAssessment />, active:true},
    { label: "OWASP Categorization", content: "content 2"},
    { label: "Training", content: "content 3" },
    { label: "Section 4", content: "content 4" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className=" mx-auto mt-12 lg:mt-20 ">
        <div className="flex flex-col lg:w-4/5 lg:flex-row lg:justify-center lg:mx-auto lg:bg-white  bg-opacity-80 p-4 shadow-2xl">
          {tabs.map((tab, index) => (
            
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              disabled ={!tab.active}
              className={`px-8 py-2 text-grey text-xl font-medium ${
                tab.active 
                  ? "underline underline-offset-8 decoration-4 decoration-red"
                  : ""
              } hover:underline hover:underline-offset-8 hover:decoration-red hover:decoration-4`}
              // className="px-8 py-2 text-grey text-xl font-medium  hover:underline hover:underline-offset-8 hover:decoration-red hover:decoration-4"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tabs.map((tab, index) => (
            
            <div
              key={index}
              className={`${activeTab === index ? "block" : "hidden"} p-4`}
            >
              {/* Content for Tab ${index + 1} */}
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;

// const VerticalTab = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const tabData = [
//     {
//       title: "Tab 1",
//       content: "Content for Tab 1",
//     },
//     {
//       title: "Tab 2",
//       content: "Content for Tab 2",
//     },
//     {
//       title: "Tab 3",
//       content: "Content for Tab 3",
//     },
//   ];

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <div className="flex">
//       <div className="w-1/4 bg-gray-200 p-4">
//         <div className="space-y-2">
//           {tabData.map((tab, index) => (
//             <button
//               key={index}
//               onClick={() => handleTabClick(index)}
//               className={`${
//                 index === activeTab
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300 text-black"
//               } py-2 px-4 rounded w-full`}
//             >
//               {tab.title}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="w-3/4 p-4">
//         <div>{tabData[activeTab].content}</div>
//       </div>
//     </div>
//   );
// };

// export default VerticalTab;
