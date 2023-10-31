

function KeyFeatures() {
  return (
    <div className="w-[85%] py-8 px-12 text-justify">
      <p className="text-2xl pb-4">Key Features</p>
      <div className="pb-4">
        <p className="text-xl pb-2 ">Vulnerability Scanning</p>
        <p>
          Aquila performs robust vulnerability scanning to identify security
          weaknesses in mobile applications. It thoroughly analyzes the app`&apos;`s
          code, configuration settings, and libraries to detect potential
          vulnerabilities, including insecure data storage, weak encryption,
          insecure network communications, and improper access control. This
          scanning process helps identify vulnerabilities before malicious
          actors exploit them.
        </p>
      </div>
      
      <div className="pb-4"> 
        <p className="text-xl pb-2 ">Threat Protection</p>
        
        <p>
          Aquila provides comprehensive protection against various mobile app
          security threats. It offers built-in security controls and best
          practices to mitigate common vulnerabilities, such as input
          validation, session management, and secure data storage. The software
          also offers encryption mechanisms, secure network communication
          protocols, and authentication mechanisms to safeguard sensitive data
          and prevent unauthorized access.
        </p>
      </div>
      
      <div className="pb-4">
        <p className="text-xl pb-2 ">Static and Dynamic Analysis</p>
        
        <p>
          Aquila combines static and dynamic analysis techniques to identify
          vulnerabilities comprehensively. Static analysis examines the source
          code, configurations, and libraries of the mobile application without
          executing it. Dynamic analysis involves executing the application in a
          controlled environment to capture runtime behaviors and identify
          vulnerabilities that may only manifest during runtime.
        </p>
      </div>
      
      <div className="pb-4">
        <p className="text-xl pb-2 ">Third-Party Library Analysis</p>
        
        <p>
          Many mobile applications rely on third-party libraries, which can
          introduce vulnerabilities if not properly maintained. Aquila analyzes
          these libraries to ensure they are up to date and free from known
          vulnerabilities. It provides reports and recommendations to help
          developers address any identified issues, thereby reducing the risk of
          exploitation through third-party dependencies.
        </p>
      </div>
      
      <div className="pb-4">
        <p className="text-xl pb-2 ">Continuous Monitoring</p>
        
        <p>
          Aquila offers continuous monitoring capabilities to ensure the ongoing
          security of mobile applications. It can detect anomalies, unauthorized
          access attempts, and abnormal behaviors that may indicate a security
          breach. The monitoring feature provides real-time alerts and
          notifications to enable swift response and remediation actions.
        </p>
      </div>

      
      <div className="pb-4">
        <p className="text-xl pb-2 ">Compliance and Reporting:</p>
        
        <p>
          To meet industry regulations and security standards, Aquila generates
          comprehensive reports that highlight the security posture of scanned
          mobile applications. These reports outline identified vulnerabilities,
          recommended remediation steps, and compliance status against
          industry-specific security frameworks. They assist organizations in
          demonstrating compliance and tracking the progress of security
          improvements over time.
        </p>
      </div>
    </div>
  );
}

export default KeyFeatures;
