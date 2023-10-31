import { useCookies } from "react-cookie";
import CookieConsent from "./CookiesConsent";
import Footer from "./LandingPage/Footer";
import Navbar from "./LandingPage/Navbar";
import Accordion from "./LandingPage/Services/Accordion";
import { useNavigate } from "react-router-dom";

const policies = [
  {
    title: "What are cookies?",
    text: "  Cookies are small pieces of data that are stored on your device when you visit a website. They can be used for a variety of purposes, including remembering user preferences, ensuring security, and analyzing site performance..",
    active: true,
  },

  {
    title: "How Aquila uses cookies?",
    text1: "Authentication & Security",
    li: "Cookies help us verify your account and determine when you're logged in so we can make it easier for you to access our services and protect your data. For instance, they help us remember your login status and protect against unauthorized access.",

    text2: "Preferences",
    li2: "We utilize cookies to remember your settings and preferences, enhancing your experience on our platform.",

    text3: "Performance & Analytics",
    li3: "These cookies collect information about how you interact with our website, such as which pages you visit and any errors you might encounter. This helps us improve the performance of our website and understand user behavior.",

    text4: "Service Operations",
    li4: "Given the nature of our service, which scans and monitors mobile applications for vulnerabilities, we use cookies to efficiently process the files you submit and retrieve the results.",
    active: false,
  },

  {
    title: "Data we collect",
    text1: "User Data",
    li: "Upon registration or when utilizing our services, we may collect your username, email, company name, and password. This data aids us in providing personalized services, enhancing security, and communicating important updates.",

    text2: "File Data",
    li2: " When you submit files (like APK, AAB, IPA) to be scanned, we temporarily process the files to detect vulnerabilities. Note that we do not save decompiled versions of your files. We only store the identified issues and the original file to ensure protection.",
    active: false,
  },

  {
    title: "Managing cookies",
    text: "Most browsers allow you to manage cookie settings. If you choose to decline or delete cookies, please note that certain functionalities of Aquila might not work as intended.",
    active: false,
  },

  {
    title: "Changes to this Cookie Policy",
    text: "Aquila may update its Cookie Policy from time to time. We will notify you of any significant changes by posting a notice on our websites",
    active: false,
  },

  {
    title: "Contact",
    text: "If you have any questions or concerns about our use of cookies, please contact us at support@aquilasec.io",
    active: false,
  },
];

function CookiesPolicy() {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);
  const navigate = useNavigate();

  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/" });
    navigate('/'); // Redirect to the home page after accepting
};

  console.log(giveCookieConsent, "clicked");
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="mt-20 md:mt-28  w-[56%] mx-auto">
        <p className="text-grey font-lato text-3xl font-bold">
          Aquila Cookie Policy
        </p>
        <p className="text-grey mt-2">
          Welcome to Aquila! Your privacy is of utmost importance to us. This
          Cookie Policy outlines how Aquila uses cookies and similar
          technologies to provide, customize, evaluate, improve, promote, and
          protect our services. Please read on to learn about the types of
          cookies we use and the purposes they serve.
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center  mb-20">
        {policies.map((policy, index) => (
          <div
            className="w-[60%] flex flex-col items-center justify-center bg-white shadow-2xl  mt-8"
            key={index}
          >
            <Accordion
              title={policy.title}
              id={`policies-${index}`}
              active={policy.active}
            >
              {policy.text}
              <p className=" font-semibold mb-1">{policy.text1}</p>
              <ul>
                <li>{policy.li}</li>
              </ul>
              <p className="font-semibold mb-1">{policy.text2}</p>
              <ul>
                <li>{policy.li2}</li>
              </ul>
              <p className="font-semibold mb-1">{policy.text3}</p>
              <ul>
                <li>{policy.li3}</li>
              </ul>
              <p className="font-semibold mb-1">{policy.text4}</p>
              <ul>
                <li>{policy.li4}</li>
              </ul>
              
            </Accordion>
          </div>
        ))}
      </div>
      <div className="bg-grey2 py-6 w-full mt-12 mb-0">
        <div className="w-4/5 h-full mx-auto flex  justify-between items-center">
          <div className="text-white w-full flex justify-between items-center ">
            <p className="text-grey font-lato text-lg">
              We use cookies to enhance your user experience. By using our
              website, you agree to our use of cookies.
            </p>
            <button  onClick={giveCookieConsent} className="px-8 py-1 bg-red text-white rounded">
              Accept
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CookiesPolicy;
