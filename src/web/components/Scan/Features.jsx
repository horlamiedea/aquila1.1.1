import spiral from "../../../assets/scan/spiral.png"; 
import shape from "../../../assets/scan/Shape.png"; 
import wallet from "../../../assets/scan/wallet-24.png"; 
import transaction from "../../../assets/scan/transaction-24.png"; 
import group from "../../../assets/scan/Group.png"; 
import filter from "../../../assets/scan/filter-24.png"; 

const CardGrid = () => {
  const cardData = [
    {
      img: spiral, // Use the imported image
      title: "Precise Vulnerability Identification",
      text: "Aquila's scanning engine utilizes advanced static analysis techniques to detect vulnerabilities with precision. We understand that accurate identification is crucial, which is why each vulnerability is assigned a unique and descriptive name. This naming convention simplifies the process of identifying and referencing specific security issues, facilitating efficient communication and collaboration among team members during the remediation process.",
    },
    {
        img: shape,
      title: "Clean and Organized Layout",
      text: "The web interface boasts a clean and organized layout that minimizes clutter and maximizes the visibility of important information. Aquila's interface is thoughtfully designed to present scan results and vulnerability reports in a visually appealing manner. The use of clear headings, appropriate spacing, and visually distinct elements ensures that developers can quickly grasp the key details and findings at a glance.",
    },
    {
        img: wallet,
      title: "Responsive Design",
      text: "Aquila's web interface is built with a responsive design approach, ensuring optimal usability across different devices and screen sizes. Whether accessed from a desktop computer, laptop, tablet, or smartphone, the interface adapts seamlessly to provide an optimal viewing and interaction experience. This responsiveness allows developers to access and work with Aquila's features conveniently, regardless of the device they are using.",
    },
    {
        img: transaction,
      title: "Interactive Visualizations",
      text: "To enhance the understanding and analysis of vulnerability scan results, Aquila's web interface incorporates interactive visualizations. These visual representations present data in a visually engaging and comprehensible manner, making it easier for developers to interpret complex information. Graphs, charts, and diagrams offer insights into vulnerability trends, severity distributions, and other key metrics, enabling developers to make informed decisions.",
    },
    {
        img: filter,
      title: "Sorting and Filtering Capabilities",
      text: "Aquila's web interface provides robust sorting and filtering capabilities for vulnerability reports. Developers can easily sort vulnerabilities based on severity, OWASP category, date of detection, or any other relevant criteria. The interface also allows for applying filters to focus on specific subsets of vulnerabilities. These sorting and filtering options enable developers to prioritize and address vulnerabilities efficiently, based on their severity and criticality..",
    },
    {
        img: group,
      title: "Export and Collaboration Features",
      text: "Aquila understands the importance of collaboration and knowledge sharing within development teams. The web interface offers features for exporting vulnerability reports, allowing developers to share findings with colleagues or stakeholders. Developers can export reports in various formats such as PDF, CSV, or HTML, facilitating seamless collaboration and documentation of vulnerability remediation efforts.",
    },
  ];

  return (
    <div className=" p-8 md:p-12 xl:p-32 md:h-[104rem] lg:h-[76rem] xl:h-[77rem] flex flex-col "> {/* Add h-screen and flex properties */}
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 ">
      {cardData.map((data, index) => (
        <div key={index} className="bg-grey2 p-4 rounded-lg text-left shadow-xl transform hover:scale-105 transition duration-300 ">
          <div>
            <img src={data.img} alt={data.title} className="my-4" />
            <h3 className="text-xl font-semibold my-4 uppercase text-grey font-lato">{data.title}</h3>
            <p className="text-md font-lato text-grey">{data.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default CardGrid;
