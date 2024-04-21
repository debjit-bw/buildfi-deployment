import { showFailureToast, showSuccessToast } from "@/utils/notifications";
import { getDeveloperInfo, makeNewAccount } from "@/utils/transitions";
import useConnection from "@/utils/useConnection";
import React, { useEffect, useState } from "react";

const SignUpComp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { signer } = useConnection();
  console.log(signer);
  const { accountData } = useConnection();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const result = await makeNewAccount(name, email, signer!);
      console.log("result", result);
      showSuccessToast(result);
    } catch (error) {
      showFailureToast(error);
      console.error("Error creating account:", error);
    }
  };

  // Handle input changes
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const developerInfo = await getDeveloperInfo(accountData.address!);
        console.log("Developer info:", developerInfo[1]);
        if (developerInfo[1]) {
          window.location.href = "/projects";
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately, e.g., display error message to the user
      }
    };

    fetchData();
  }, [accountData.address]);

  return (
    <div className="m-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className=" text-xl font-medium text-gray-900 dark:text-white">
          Create new Account
        </h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="satoshi nakamoto"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="••••••••"
            value={email}
            onChange={handleEmailChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          {/* <a
            href="#"
            className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Lost Password?
          </a> */}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create new Account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <a
            href="/kyc"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Complete your KYC
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpComp;
