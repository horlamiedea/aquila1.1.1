import ProductBg from "../../../assets/phone.png";
import Code from "../../../assets/code.png";

const cardsData = [
  {
    backgroundImage: `url(${ProductBg})`,
    date: 'September 10, 2023',
    title: 'Smartphones and tablets : An open door to ransomwares',
    text: 'The FBIs Internet Crime Complaint Center reported recently a 62% year-over-year increase of ransomware attacks...',
    buttonText: 'Explore',
  },
  {
    backgroundImage: `url(${Code})`,
    date: 'Feb 17th, 2023',
    title: 'Why is phishing so efficient on mobile?',
    text: 'Phishing is a hacking technique that makes a user believe that he is interacting with the interface of a trusted third party...',
    buttonText: 'Explore',
  },
  {
    backgroundImage: `url(${ProductBg})`,
    date: 'March 15, 2023',
    title: 'TikTok, a leakware installed on 2 billion mobile devices',
    text: 'Over the past two weeks, the White House, Canada, and several countries in Europe have banned...',
    buttonText: 'Explore',
  },
];

const CardList = () => {
  return (
    <div className="flex flex-wrap justify-center items-center lg:h-[58rem] ">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 shadow-2xl bg-white rounded-lg m-4 transform hover:scale-105 transition duration-300"
        >
          <div
            style={{
              backgroundImage: card.backgroundImage,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              paddingTop: '56.25%', // 16:9 aspect ratio
              borderRadius: '4px',
              marginTop: '2rem',
            }}
          ></div>
          <div className="px-6 py-4">
            <p className="text-gray-600 text-sm text-gold font-semibold mb-4">
              {card.date}
            </p>
            <div className="font-bold mb-2 text-grey">{card.title}</div>
            <p className="text-grey text-base">{card.text}</p>
          </div>
          <div className="px-6 py-4">
            <button className="bg-red text-white font-bold py-2 px-4 rounded">
              {card.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

function App() {
  return <CardList />;
}

export default App;
