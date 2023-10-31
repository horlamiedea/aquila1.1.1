import aquila from "../../assets/aquila-white.png";
import img3 from "../../assets/agent-profile-1.png";
import img2 from "../../assets/agent-profile-2.png";
import img1 from "../../assets/agent-profile-3.png";
import baseURL from "../../services/baseUrl";
import { ADD_LOGGEDIN_USER } from "../../redux/slice/chat";
import { useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import api from "../../services/api";

const StartChart = (props) => {
    const {setSubmitted} =props
    const dispatch = useDispatch()

    const createGroup = async () => {
        try {
          const response = await api.post(`${baseURL}/chat/group/`);
          dispatch(ADD_LOGGEDIN_USER(response.data));
          setSubmitted(true)
          console.log("created group successfully");
        } catch (error) {
          console.log(error);
          console.log("Cannot create Group");
        }
      };
    
  return (
    <div className="relative h-full w-full rounded-lg">
      <div className="absolute top-0 left-0 right-0  h-[calc(100% - 50px)]">
        <div className=" bg-red text-white p-4 rounded-t-lg flex flex-col ">
          <img src={aquila} alt="aquila-logo" className="w-[10rem]" />
          <p className="text-2xl font-semibold">How can we help you ?</p>
        </div>
        <div className="">
            <div className=" flex flex-col justify-center items-center mt-5  text-2xl">
                <p>Start a conversation with</p>
                <p>our team of experts now!</p>
            <div className=" flex  justify-center items-center mt-5 w-[5rem] ">
               <img src={img1} alt="agent" />
               <img src={img2} alt="agent" />
               <img src={img3} alt="agent" />
               
            </div>
            <button onClick={createGroup} className="bg-red text-white rounded-md py-1 px-[20%] mt-10">Start Chat</button>
            </div>
          
        </div>
      </div>
    </div>
  );
};
StartChart.propTypes = {
    setSubmitted: PropTypes.func.isRequired
};

export default StartChart;
