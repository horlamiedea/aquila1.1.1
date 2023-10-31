import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FaMessage } from "react-icons/fa6";
import { useSelector } from "react-redux";
import socketUrl from "../../services/webSocketUrl";
import { generateRandomString } from "../../dashboard/utils/UtilFunction";
import baseURL from "../../services/baseUrl";
import api from "../../services/api";


function Chat() {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  
  const { loggedInUser, anonUser } = useSelector((state) => state.chat);

  const messageContainerRef = useRef(null);

  

 


  //send message to cusRepresentative
  const handleMessage = async (e) => {
    e.preventDefault();
    if(!content) return;
    const url = `${baseURL}/chat/group/${loggedInUser?.id || anonUser?.id}/message/`;
    try {
      await api.post(url, {
        content,
        anon_customer_token: anonUser?.anon_customer_token,
      });
      setContent("");
    } catch (error) {
      console.log("could not send message");
    }
  };

  useEffect(() => {
    // Scroll to the bottom when a new message arrives or component updates
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  let uniqueMessageIds = new Set();

  const handleUniqueMessage = (data) => {
    if (data.id && !uniqueMessageIds.has(data.id)) {
      uniqueMessageIds.add(data.id);
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  };

  useEffect(() => {
    const subscribeToChatActivity = async () => {
      const url = `${socketUrl}/chat/`;
      const action = "subscribe_to_chat_activity";
      const request_id = generateRandomString();
      const accessToken = user?.access || anonUser?.anon_customer_token;
      const groupId = loggedInUser?.id || anonUser?.id;
  
      const params = {
        action,
        accessToken,
        request_id,
        groupId,
      };
  
      try {
        const newSocket = new WebSocket(url);
  
        newSocket.onopen = () => {
          console.log("WebSocket connection opened");
          newSocket.send(JSON.stringify(params));
        };
        newSocket.onmessage = (event) => {
          
          const data = JSON.parse(event.data);
          console.log(data);
        
          handleUniqueMessage(data)
        };
  
        newSocket.onerror = (event) => {
          console.error("WebSocket error occurred", event);
        };
  
        newSocket.onclose = (event) => {
          console.log("on-close", event);
        };
      } catch (error) {
        console.error("Error connecting to WebSocket", error);
      }
    };

    subscribeToChatActivity();
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 




  return (
    <div className="relative h-full w-full rounded-lg ">
      <div className="absolute top-0 left-0 right-0  h-[calc(100% - 50px)]">
        <div className=" bg-red text-white p-2 rounded-t-lg flex items-center">
          <div className="bg-bg2 text-red p-2 rounded-full">
            <FaMessage />
          </div>
          <h2 className="text-lg font-lato pl-2">General Queries</h2>
        </div>

        <div
          ref={messageContainerRef}
          className=" py-4 px-6 rounded-lg h-[20rem] w-full overflow-y-auto"
        >
          {/* <p className="text-sm mb-2 text-center text-grey">TODAY 11:10 AM</p> */}
          {/* Default Message */}
          <div className="flex flex-col mb-4 font-lato">
            <h3 className=" mb-1 flex items-center text-grey text-[10px] ml-3">
              Damilola{" "}
              <p className="text-gold text-[8px] pl-2"> (Support Specialist)</p>
            </h3>
            <div className="font-lato flex">
              <p className="w-[75%] text-grey text-sm p-2  mx-2 rounded-lg bg-bg2">
                Hello there! How may I help you?{" "}
                <span className="line-through">====</span> This chat function is
                for portal technical support only. Please do not share any
                banking or personal information.
              </p>
            </div>
            {/* <p className="text-[#ACACAC] text-[10px] flex justify-end -mt-3 mr-7">
              12:05pm
            </p> */}
          </div>

          {/* Customer */}

          {messages.length > 0 && 
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.is_customer ? "ml-auto justify-end" : ""
                  } flex w-full mt-2 space-x-3 max-w-xs `}
                >
                  <div>
                    <div
                      className={`${
                        message.is_customer
                          ? "text-grey  border border-red  rounded-lg"
                          : "rounded-lg  bg-grey2"
                      } rounded-r-lg px-2 py-1 `}
                    >
                      <div className="max-w-[11rem] break-words">
                        <p className="text-lg ">{message?.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

          {/* Customer Rep */}
        </div>
      <form
        className=" mt-5 w-[95%] mx-auto"
        onSubmit={handleMessage}
      >
        <div className="flex rounded-lg border border-red bg-bg2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow px-2 rounded-lg focus:outline-none bg-bg2"
            placeholder="Type in your message"
          />
          <button className="text-white">
            <AiOutlineSend size={30} className="m-2 text-grey" />
          </button>
        </div>
      </form>
      </div>

      {/* Input Area */}
    </div>
  );
}

export default Chat;
