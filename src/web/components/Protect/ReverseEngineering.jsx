

function ReverseEngineering() {
  return (
    <div className="bg-red h:[35rem] md:h-[33rem]">
      <p className="py-8 text-center md:text-4xl text-grey2 md:py-6 font-medium font-lato">
        REVERSE ENGINEERING PROTECTION
      </p>
      <div className="md:h-[25rem] md:w-3/4 flex flex-col-reverse justify-center items-center md:flex-row md:items-center lg:justify-between md:mx-auto text-grey2">
        <div className="m-12 md:m-0 md:w-2/4">
          <p className="font-lato text-xl">
            Mobile application shielding prevents attacks by making it extremely
            complex to understand, decipher and penetrate the code of an
            application.
          </p>
          <ul className="list-disc mt-4 ">
            <li>Resource encryption</li>
            <li>Randomization</li>
            <li>Code reflection</li>
            <li>Method call hiding</li>
            <li>Secure strings</li>
            <li>Addition of spoof code</li>
          </ul>
        </div>
        <div className="md:w-2/4 flex justify-end">
          <img src="http://res.cloudinary.com/da7zudna9/image/upload/v1695404469/uonoeqbfj6qyilt53der.png" alt="reverse-engineering" />
        </div>
      </div>
    </div>
  );
}

export default ReverseEngineering;
