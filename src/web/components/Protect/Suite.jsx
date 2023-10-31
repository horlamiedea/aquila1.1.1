
function Suite() {
  return (
    <div className="md:flex md:flex-col md:m-32">
        <p className="text-center my-4 md:text-center md:text-3xl md:text-grey md:font-semibold md:mb-12">AQUILA’S MOBILE SECURITY SUITE</p>
        <div className="w-1/2 md:w-full mx-auto md:flex  md:justify-center ">
            <div className="bg-red text-white  text-center mb-4 md:w-64 md:h-20 md:flex md:items-center md:justify-center">SCAN</div>
            <div className="bg-red text-white text-center mb-4 md:w-64 md:h-20 md:flex md:items-center md:justify-center opacity-70">REMIDIATE</div>
            <div className="bg-red text-white text-center mb-4 md:w-64 md:h-20 md:flex md:items-center md:justify-center opacity-50">PROTECT</div>
            <div className="bg-red text-white text-center mb-4 md:w-64 md:h-20 md:flex md:items-center md:justify-center opacity-40">MONITOR</div>
        </div>
    </div>
  )
}

export default Suite