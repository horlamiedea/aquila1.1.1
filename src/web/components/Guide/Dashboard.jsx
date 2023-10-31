import React from "react";

function Dashboard() {
  return (
    <div className="w-[85%]  py-8 px-12 text-justify">
      <p className="text-2xl pb-4">Dashboard Guide</p>
      <p className="pb-4">
        Congratulations on creating your project in Aquila, the comprehensive
        vulnerability scanner! This guide will walk you through accessing and
        navigating the Aquila dashboard to manage your projects effectively
      </p>

      <div className="pb-4">
        <p className="text-xl pb-4">Step 1: Creating a Project</p>

        <ol className="list-decimal ml-12">
          <li>
            Login to your Aquila account using your registered email address and
            password. Refer to the Aquila Login Guide for detailed instructions.
          </li>
          <li>Once logged in, locate the option to create a new project.</li>
          <li>
            Provide a suitable name for your project as a parameter. This name
            should be descriptive and easily recognizable.
          </li>
        </ol>
      </div>

      <div>
        <p className="text-xl pb-4">Step 2: Accessing the Dashboard</p>
        <p className="pb-4">
          After creating your project, you will be automatically redirected to
          the Aquila dashboard.
        </p>
        <p className="pb-4">
          The dashboard serves as your central hub for managing all aspects of
          your projects, including scanning, analysis, and reporting.
        </p>
        <p className="pb-4">
          Congratulations! You are now ready to navigate and utilize the Aquila
          dashboard to its full potential. Take advantage of the various
          features and tools available to secure your applications effectively.
        </p>
        <p className="pb-4">
          If you encounter any difficulties or have questions regarding the
          Aquila dashboard, consult the Aquila documentation or reach out to our
          support team for prompt assistance.
        </p>
      </div>
      <div>
        <p className="text-xl pb-4">
          Scanning Guide: Aquila APK and iOS Application Scan
        </p>
        <p className="pb-4">
          In Aquila, you can easily scan your APK and iOS applications for
          vulnerabilities directly from the dashboard. This guide will walk you
          through the steps to initiate a scan and obtain essential information
          about the scan process.
        </p>

        <p className="text-xl pb-4 mt-4">Step 1: Accessing the Scan Page</p>
        <ul className="list-disc ml-12">
          <li>
            Once logged in, locate the option to "Scan APK" or "Scan iOS" on the
            dashboard. Click on the respective button based on the application
            type you want to scan.
          </li>
          <li>
            Login to your Aquila account using your registered email address and
            password. Refer to the Aquila Login Guide for detailed instructions.
          </li>
        </ul>

        <p className="text-xl pb-4 mt-4">
          Step 2: Uploading the Application File
        </p>
        <ul className="list-disc ml-12">
          <li>
            After clicking on the "Scan APK" or "Scan iOS" button, you will be
            directed to a page where you can upload the application file.
          </li>
          <li>Locate the file upload section on the page.</li>
          <li>
            Click on the "Browse" or "Choose File" button to select the APK or
            iOS application file from your local device.
          </li>
          <li>Once you've selected the file, click "Upload" to proceed.</li>
        </ul>

        <p className="text-xl pb-4 mt-4">Step 3: Retrieving Scan Information</p>
        <ul className="list-disc ml-12">
          <li>
            After the file is uploaded, Aquila will process the application for
            scanning and retrieve essential information related to the scan.
          </li>
          <li>
            On the scan page, you will see information such as the SHA (Secure
            Hash Algorithm) value of the uploaded file and the scan type.
          </li>
          <li>
            Make note of these details as they may be useful for future
            reference.
          </li>
        </ul>

        <p className="text-xl pb-4 mt-4">Step 4: Initiating the Scan</p>
        <ul className="list-disc ml-12">
          <li>
            Review the provided information and ensure it corresponds to the
            application you intended to scan.
          </li>
          <li>
            Once you're ready, click on the "Scan" button to initiate the
            vulnerability scanning process.
          </li>
          <li>
            Aquila will start scanning the uploaded APK or iOS application for
            potential vulnerabilities.
          </li>
        </ul>

        <p className="text-xl pb-4 mt-4">
          Step 5: Monitoring the Scan Progress
        </p>
        <ul className="list-disc ml-12">
          <li>
            During the scanning process, you can monitor the progress of the
            scan on the same page.
          </li>
          <li>
            Aquila will analyze the application for vulnerabilities and generate
            a comprehensive report.
          </li>
        </ul>

        <p className="text-xl pb-4 mt-4">Step 6: Viewing the Scan Results</p>
        <ul className="list-disc ml-12">
          <li>
            Once the scan is complete, you will be able to access the scan
            results from the dashboard.
          </li>
          <li>
            Navigate to the appropriate section or tab within the dashboard to
            view the generated report.
          </li>
          <li>
            The report will provide detailed information about the identified
            vulnerabilities and recommendations for mitigation.
          </li>
        </ul>
      </div>
      <p className="py-4">
        Congratulations! You have successfully initiated a vulnerability scan
        for your APK or iOS application using Aquila. Ensure to review the scan
        results thoroughly and take appropriate actions to address any
        vulnerabilities identified.
      </p>

      <p>
        If you encounter any difficulties or have questions regarding the
        scanning process, consult the Aquila documentation or reach out to our
        support team at <a href="mailto:support@aquilasec.io" className="text-blue">support@aquilasec.io</a> for
        prompt assistance
      </p>

     
    </div>
  );
}

export default Dashboard;
