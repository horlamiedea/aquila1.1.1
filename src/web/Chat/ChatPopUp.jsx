import { useState } from "react";
import { BsChevronLeft, BsFillChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { ADD_ANON_USER } from "../../redux/slice/chat";
import StartChart from "./StartChart";

function ChatPopUp() {
  const [popup, setPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  // Creating an Id token for anonimoius user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !fullName) {
      return toast.error("Fill in all fields");
    }
    try {
      setIsLoading(true);
      const response = await api.post("/chat/group/anon/", {
        email,
        full_name: fullName,
      });
      dispatch(ADD_ANON_USER(response.data));
      localStorage.setItem("anon_user", JSON.stringify(response.data));
      setEmail("");
      setFullName("");
      setSubmitted(true);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div
        onClick={() => setPopup(!popup)}
        className="fixed right-8 bottom-4 cursor-pointer rounded-full w-12 h-12 z-10 bg-red"
      >
        <BsFillChatFill
          color="#fff"
          size={20}
          className="relative top-3 left-4"
        />
      </div>

      {popup && (
        <div className="fixed bottom-20 right-8 bg-white rounded-lg w-full h-screen md:w-[25rem] md:h-[28rem] shadow-2xl z-50">
          {submitted && <Chat />}
          {user && !submitted && <StartChart setSubmitted={setSubmitted} />}
          {!user && !submitted && (
            <div className=" flex justify-center items-center">
              <div className=" ">
                <div className="bg-red  rounded-t-lg flex items-center">
                  <Link to="/">
                    <BsChevronLeft size={20} className="m-4 text-white ml-6 " />
                  </Link>
                  <h1 className="text-base font-lato text-white">
                    Email this transcript
                  </h1>
                </div>

                <p className="text-grey text-sm p-4 border-red border m-8 rounded-lg">
                  Hello there! How may I help you?{" "}
                  <span className="line-through">====</span> This chat function
                  is for portal technical support only. Please do not share any
                  banking or personal information.
                </p>

                <form className="py-4 px-8 " onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      placeholder="Email"
                      className="w-full py-2 px-4 border border-red rounded focus:outline-none bg-grey2"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      name="fullName"
                      placeholder="Full Name"
                      className="w-full py-2 px-4 border border-red rounded focus:outline-none bg-grey2"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-full bg-red hover:bg-red text-white px-4 py-2 rounded focus:outline-none"
                    >
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatPopUp;
