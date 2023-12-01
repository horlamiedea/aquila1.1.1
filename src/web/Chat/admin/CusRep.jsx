// import MessageDisplay from "./MessageDisplay";

import socketUrl from "../../../services/webSocketUrl";
import { generateRandomString } from "../../../dashboard/utils/UtilFunction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
import baseURL from "../../../services/baseUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Aquila-Logo 1.png";

import { useSelector } from "react-redux";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoSend } from "react-icons/io5";

import { BsChatSquareDotsFill } from "react-icons/bs";

const CusRep = () => {
  const [onlineUserIds, setOnlineUserIds] = useState(new Set());
  const [acceptChat, setAcceptedChat] = useState([]);
  const [chatMessages, setChatMessage] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeChat, setActiveChat] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { customerRep } = useSelector((state) => state.chat);

  const token = JSON.parse(localStorage.getItem("cusRep"));

  // useEffect(() => {

  //   const getAllConversation = async () => {
  //     try {

  //       const token = JSON.parse(localStorage.getItem('cusRep'))
  //       const headers = {
  //         Authorization: `Bearer ${token.access}`
  //       };

  //       const res = await axios.get('https://aquilatest.livelysea-9b4d3851.westus2.azurecontainerapps.io/chat/conversations/', { headers });

  //       await res.data.results.forEach(item => {
  //         subscribeToChatActivity(item.id);
  //         setOnlineUserIds(prevIds => new Set(prevIds).add(item.id));

  //       });

  //     } catch (error) {
  //       console.error("Error fetching conversations:", error);
  //     }
  //   }

  //   getAllConversation()

  // },[])
  console.log(chatMessages, "chat_message");
  const checkNewMessage = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.group !== id
    );
    setNotifications(updatedNotifications);
  };

  const HandleLogout = () => {
    localStorage.removeItem("cusRep");
    navigate("/admin-login");
  };

  const AcceptUserChat = async (id) => {
    const url = `${baseURL}/chat/group/${id}/accept/`;
    try {
      await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      );
      toast.success(`Have accepted chat id - ${id}`);
      setAcceptedChat((prev) => [...prev, id]);
      toast;
    } catch (error) {
      console.error(error);
    }
  };

  const subscribeToChatActivity = async (id) => {
    const url = `${socketUrl}/chat/`; // replace with your WebSocket server URL

    const action = "subscribe_to_chat_activity";
    const request_id = generateRandomString();
    const accessToken = token?.access;
    const groupId = id;

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
        console.log(data, "data");

        if (data.messages) {
          const newMessages = data.messages;       

          newMessages.forEach((message) => {
            setChatMessage((prevMessages) => [...prevMessages, message]);
            setNotifications((prevNotification) => [...prevNotification, message])
          });

         
          return;
        }

        if (data.id) {
          console.log("id");
          setChatMessage((prevMessages) => [...prevMessages, data]);
          setNotifications((prevNotification) => [...prevNotification, data]);
        }
      };

      newSocket.onerror = (event) => {
        console.error("WebSocket error occurred", event);
        console.log(newSocket.readyState, "on-error");
      };

      newSocket.onclose = (event) => {
        console.log(newSocket.readyState, "on-close");
        console.log("WebSocket connection closedzzz", event);
      };
    } catch (error) {
      console.error("Error connecting to WebSocket", error);
      console.log("Admin can not subscribe to chat activity");
    }
  };

  const HandleChat = async (id) => {
    setActiveChat(id);

    if (acceptChat.includes(id)) {
      checkNewMessage(id);
      return;
    }

    await AcceptUserChat(id);
    await subscribeToChatActivity(id);
  };

  //Subscribing to group activity
  useEffect(() => {
    const cusRep = JSON.parse(localStorage.getItem("cusRep"));
    const url = `${socketUrl}/chat/`;
    const action = "subscribe_to_group_activity";
    const request_id = generateRandomString();
    const accessToken = cusRep?.access;
    const params = {
      action,
      accessToken,
      request_id,
    };

    try {
      const newSocket = new WebSocket(url);

      newSocket.onopen = () => {
        newSocket.send(JSON.stringify(params));
      };
      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.id && !onlineUserIds.has(data.id)) {
          setOnlineUserIds((prevIds) => new Set(prevIds).add(data.id));
        }
      };

      newSocket.onerror = (event) => {
        console.error("WebSocket error occurred", event);
      };

      newSocket.onclose = (event) => {
        console.log("WebSocket connection closedxx", event);
      };
    } catch (error) {
      console.error("Error connecting to WebSocket", error);
    }

    // eslint-disable-next-line
  }, []);

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    const url = `${baseURL}/chat/group/${activeChat}/message/`;
    try {
      await axios.post(
        url,
        { content: message },
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-grey2 text-grey ">
      <div className="relative">
        <div className="fixed bg-white w-full h-16 shadow-md z-20 ">
          <div className="flex items-center justify-between w-[80%] mx-auto mt-3 ">
            <Link to="/admin-login">
              <img
                src={Logo}
                alt="aquila_logo"
                className="w-[5rem] md:w-[5rem] cursor-pointer  "
              />
            </Link>
            <div className="flex items-center gap-2 justify-center md:gap-3">
              <div className="flex justify-center items-center gap-2">
                <RiCustomerService2Line />
                <p>
                  {customerRep?.email ? customerRep.email : "Damilola Akinsola"}
                </p>
              </div>

              <button
                onClick={HandleLogout}
                className="bg-red px-4 py-1 rounded-md text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex w-[90%] gap-2 mx-auto h-screen pt-24 ">
        <div className="shadow-md bg-white w-[25%] h-[95%] overflow-auto">
          <div className="mx-5 mt-10 ">
            <p className="font-semibold text-2xl">
              Online Users <span className="text-4xl text-[#44CC11]">.</span>
            </p>

            {onlineUserIds &&
              [...onlineUserIds].map((user, i) => (
                <div
                  onClick={() => HandleChat(user)}
                  className={`w-full p-4 mt-5 flex items-center    cursor-pointer rounded-md font-bold ${
                    activeChat === user
                      ? "bg-red text-white"
                      : "bg-grey2 text-grey"
                  }`}
                  key={i}
                >
                  <p>User - {i + 1} </p>
                  {notifications.some(
                    (notification) => notification.group === user
                  ) && <BsChatSquareDotsFill color="green" className="ml-12" />}
                </div>
              ))}
          </div>
        </div>
        <div className=" relative shadow-md bg-white w-[80%] h-[95%]">
          <div className="flex flex-col  ">
            <div className="bg-white absolute rounded-md h-[70%]  mx-8 top-5 w-[90%] overflow-y-scroll no-scrollbar">
              {chatMessages &&
                chatMessages
                  .filter((message) => message.group === activeChat)
                  .map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        message.is_customer ? "ml-auto justify-end" : ""
                      } flex w-full mt-2  mx-5 space-x-3 max-w-xs `}
                    >
                      <div
                        className={`${
                          message.is_customer ? "flex  flex-col" : ""
                        }`}
                      >
                        <div
                          className={`${
                            message.is_customer
                              ? " border border-red text-grey"
                              : " bg-grey2"
                          } rounded-lg p-3`}
                        >
                          <div className="max-w-[11rem] break-words">
                            <p className="text-lg font-semi-bold ">
                              {message?.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <form
              className="absolute flex ml-5 w-[90%] bottom-3 "
              onSubmit={handleMessage}
            >
              <input
                value={message}
                className="flex bg-grey2  items-center h-20 w-full rounded px-3 text-sm outline-none"
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message…"
              />
              <button
                type="submit"
                className="p-1 right-12 rounded-md md:bottom-10 md:p-2 md:right-12  sm:bottom-11"
              >
                <span>
                  <IoSend size={30} color="#5B5B5B" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CusRep;
