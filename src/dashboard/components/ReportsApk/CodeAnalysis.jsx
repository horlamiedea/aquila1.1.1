import { useSelector } from "react-redux";

const CodeAnalysis = () => {
  const { reports } = useSelector((state) => state.appState);
 

  return (
    <div className="p-6">
      {reports &&
        reports?.data?.apk[0]?.CODE_ANALYSIS &&
        Object.entries(reports?.data?.apk[0]?.CODE_ANALYSIS).map(
          ([key, obj]) => (
            <div className="p-4" key={key}>
              <div className=" text-grey">
               
              
                  <p className="font-semibold">{key}</p>
                

                <div className="flex">
                  <div></div>

                  <div className="flex flex-col">
                    <p className="">Severity</p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className={` w-0.5 h-8 ${
                          obj.metadata.severity === "info"
                            ? "bg-blue"
                            : obj.metadata.severity === "warning"
                            ? "bg-gold"
                            : obj.metadata.severity === "high"
                            ? "bg-red"
                            : "bg-green"
                        }`}
                      ></div>
                      <p className="pl-4"> {obj.metadata.cvss}</p>
                    </p>
                  </div>
                  <div className="flex flex-col pl-4">
                    <p>Category</p>

                    <p>{obj.metadata.masvs}</p>
                  </div>
                </div>

                <p className="px-2 font-semibold">Description</p>
                <p>
                  <p>{obj.metadata.description}</p>
                </p>

                <p className="px-2 font-semibold">Place in Code</p>
                {Object.entries(obj.files).map(([key, item]) => (
                  <p
                    className="text-sm"
                    key={key}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <p>
                      {" "}
                      {key} : {item}
                    </p>
                  </p>
                ))}

                <p className="pl-2 pr-4 font-semibold">Recommendation</p>
                <p>
                  <p>{obj.metadata.ref}</p>
                </p>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default CodeAnalysis;
