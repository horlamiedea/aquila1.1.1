

// import Register from "../../../assets/Register.mp4";
// import Activation from "../../../assets/Activation.mp4";
// import Login from "../../../assets/Login.mp4";

function UserFlow() {

  return (
    <div className="w-[85%]  py-8 px-12 text-justify">
      <p className="text-2xl pb-4">User Flow</p>
      <p className="pb-4">
        Don`&apos;`t miss out on this limited-time offer! Sign up for Aquila today and
        safeguard your applications from potential vulnerabilities.
      </p>
      <p className="pb-4">
        Before you can use Aquila, you must first fill in information about
        yourself. Part of the sign-up procedure involves receiving a mail
        verification.
      </p>

      <div className="pb-4">
        <p className="text-xl pb-4">Account Registration</p>

        <ol className="list-decimal ml-12">
          <li>
            User accounts can be created by using the link{" "}
            <a href="https://www.aquilasec.io/register" className="text-blue">
              https://www.aquilasec.io/register
            </a>
            to create a new User.
          </li>
          <li>
            Enter the details like Username, business email, company’s name, and
            password.
          </li>
          <li>
            By signing up for Aquila, you agree to abide by our terms of service
            and privacy policy. Please ensure that all the provided information
            is accurate and valid.
          </li>
        </ol>
        <p className="py-4">
          <strong>Tip:</strong> The password provided for the account should be
          between 8-16 characters and should contain at least 1 lowercase, 1
          uppercase, 1 number, and one special character in ?!@#$-_=+.
        </p>
        <div>

{/* <video src={Register} controls={true}></video> */}
        </div>
      </div>

      <div className="pb-4">
        <p className="text-xl pb-4">Activate Account:</p>
        <p className="pb-4">
          Once registered on Aquila, you will receive a confirmation mail within
          10 minutes along with an account activation link. The Activation link
          is valid for 5 hours. To activate your account, follow the below
          steps:
        </p>
        <ol className="list-decimal ml-12">
          <li>
            Check for an email from noreply@aquilasec.io.
            <ol className="list-decimal ml-12">
              <li>Click on the link sent to activate your Aquila account.</li>
              <li>
                Enter the password mentioned in the signup process to authorize
                access for activation.
              </li>
            </ol>
          </li>
        </ol>
        <div>
          {/* <video src={Activation} controls={true}></video> */}
        </div>
      </div>

      <div className="pb-4">
        <p className="text-xl pb-4">Login</p>
        <p className="pb-4">
          Welcome to Aquila, the web-based vulnerability scanner designed to
          secure your applications, the cutting-edge vulnerability scanner
          designed to ensure the security of your APK and iOS applications.
          Before you use Aquila, you must first log in with an active account.
          If you do not remember your credentials or have trouble signing in
          using your credentials, see the "Forgot Password" section to reset
          your password.
        </p>
        <p className="pb-4">
          Before you sign in to Aquila, make sure that you have the following
          required information.
        </p>
        <p className="pb-4">Requirements</p>
        <ol className="list-decimal ml-12">
          <li>The email address used to create an Aquila account.</li>
          <li>The password for the user.</li>
        </ol>

        <p className="text-xl py-4">To sign in to an Aquila account:</p>
        <ol className="list-decimal ml-12">
          <li>
            Open{" "}
            <a href="https://www.aquilasec.io/login" className="text-blue">
              https://www.aquilasec.io/login
            </a>
          </li>
          <li>
            If you have not signed in previously using this browser, the main
            sign-in page appears as follows. Enter the email address associated
            with your account and password, and choose "Sign In."
          </li>
        </ol>
        <div>
          {/* <video src={Login} controls={true}></video> */}
        </div>
      </div>

      <div className="pb-4">
        <p className="text-xl pb-4">Forgot Password</p>
        <p className="pb-4">
          When you first created your Aquila account, you provided an email
          address and password. These are your Aquila account user credentials.
          If you forget or lose your user password, you can reset the password
          from the Console.
        </p>
        <p className="text-xl py-4">To reset your password:</p>
        <ol className="list-decimal ml-12">
          <li>
            Open
            <a
              href=" https://www.aquilasec.io/forget-password
"
            >
              https://www.aquilasec.io/forget-password.
            </a>
          </li>
          <li>
            Provide the email address that is associated with the account and
            choose "Forgot Password."
          </li>
          <li>
            Check the email that is associated with your Aquila account for a
            message from Aquila. The email will come from an address ending in
            @appsealing.com. You will receive a link, click on the link.
          </li>
          <li> You will be required to enter a new password.</li>
        </ol>
        {/* <div></div> */}
      </div>
    </div>
  );
}

export default UserFlow;
