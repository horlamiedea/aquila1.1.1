import { IoSend } from "react-icons/io5"


const MessageDisplay = () => {
  return (
    <div className=" relative shadow-md bg-white w-[80%] h-[95%]">
        <div className="flex flex-col items-center justify-center">
            <div className="bg-white absolute rounded-md h-[80%] flex justify-center items-center top-5 w-[90%]">
                <p className="text-7xl opacity-40 font-semibold">Start a New conversation</p>
            </div>
        <form className="absolute flex items-center w-[90%] bottom-3 " >
        <input
              className="flex bg-grey2 text-white items-center h-20 w-full rounded px-3 text-sm outline-none"
              type="text"
             
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
  )
}

export default MessageDisplay