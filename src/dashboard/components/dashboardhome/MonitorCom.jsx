import icon from "../../../assets/sticker-24.png";

const MonitorCom = () => {
  return (
    <div
    className="shadow-lg bg-white w-full  h-[25rem] rounded-md flex 
      flex-col
    mb-5 justify-center items-center"
  >
    <div className="w-[80%] bg-grey2 h-[70%] rounded-xl">
      <div className="flex mt-20 flex-col items-center">
        <img src={icon} alt="" />
        <p>Coming Soon</p>
      </div>
    </div>
    </div>
  );
};

export default MonitorCom;
