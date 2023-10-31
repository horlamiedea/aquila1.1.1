

function TamperProtection() {
  return (
    <div className="bg-[url('https://i.imgur.com/sJSmMcV.jpeg')] bg-cover bg-center h-[70rem] md:h-[45rem]">
      <p className="py-8 text-center  md:text-4xl  text-grey2 md:py-6 font-medium font-lato">
      TAMPER PROTECTION & DETECTION
      </p>
      <div className="md:h-[25rem] md:w-3/4 flex flex-col-reverse justify-center items-center md:flex-row md:items-center lg:justify-between md:mx-auto text-grey2">
        <div className="m-12 md:mt-64 md:ml-0 lg:mt-32 md:w-full">
          <p className="font-lato text-xl">
          41% of mobile applications are not strong enough to resist reverse-engineering and tampering. Aquila’s protect feature obfuscates and encrypts your app’s code to prevent it from being tampered and injected with malicious or unwanted behaviors. 
          In complement, it empowers your app with a capability to control its own code integrity and neutralize itself if tampered.
          </p>
          <ul className="list-disc mt-4 ">
          <p className="underline ">Prevention</p>
            <li>Asset encryption</li>
            <li>Debug protectionn</li>
            <li>Environment state check</li>
          </ul>
          <ul className="list-disc mt-4 ">
            <p className="underline"> Detection</p>

            <li>Integrity / Checksum Verification</li>
          </ul>
        </div>
        <div className="md:w-2/4 flex justify-end md:mt-40 lg:mt-0 xl:mt-32">
          <img src="https://res.cloudinary.com/da7zudna9/image/upload/v1695404599/bbdyv0y7d9wc3cgcpmf4.png" alt="tamper protection"  />
        </div>
      </div>
    </div>
  );
}

export default TamperProtection;
