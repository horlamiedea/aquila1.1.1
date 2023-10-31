
import protect from "../../../assets/protect/protect.svg";

const Intro = () => {
  return (
    <div className="h-[40rem] lg:h-[45rem] xl:h-[50rem] px-4 sm:px-8 lg:px-20 xl:px-36 ">

    <div className="flex flex-col-reverse md:flex-row md:justify-between items-center h-full">

        {/* Left side text */}
        <div className="w-full md:w-[35%] lg:w-[30%] xl:w-[25%] flex flex-col justify-center items-center mb-8 lg:mb-0">
            <div className="bg-white mt-8 md:mt-0 shadow-2xl rounded-lg p-6 w-full max-w-xs md:max-w-md flex flex-col justify-center ">
                <div className="border-2 border-red"></div>
                <p className="text-grey py-4 font-lato">
                    “Application security is not a nice to have, its a must-have.”
                </p>
                <p className="text-grey font-lato">Paul Kurtz.</p>
            </div>
        </div>

        {/* Right side icons */}
        <div className="w-full md:w-1/2 flex justify-center lg:justify-end ">
            <img src={protect} alt="steps of protect" className="max-w-xs lg:max-w-full" />
        </div>

    </div>
</div>

  );
};

export default Intro;
