import { RootState } from "@/store";
import { showSuccessToast } from "@/utils/notifications";
import { closeVoting, startVoting, vote_operator } from "@/utils/transitions";
import useConnection from "@/utils/useConnection";
import { current } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";


const generateMilestone = () => {
  const milestones = [
      "Implemented Redux state management for efficient data flow.",
      "Designed and integrated reusable UI components using React hooks.",
      "Optimized rendering performance with React.memo and useCallback.",
      "Implemented client-side routing with React Router for seamless navigation.",
      "Integrated Material-UI for beautiful and responsive UI design.",
      "Implemented form validation and error handling using Formik and Yup.",
      "Added internationalization support with React Intl for multilingual users.",
      "Implemented authentication and authorization using JWT and OAuth.",
      "Integrated Axios for making HTTP requests to backend APIs.",
      "Implemented real-time updates using WebSockets with Socket.IO.",
      "Optimized SEO with React Helmet for better search engine visibility.",
      "Implemented lazy loading and code splitting for faster initial load times.",
      "Integrated Redux Thunk for handling asynchronous actions.",
      "Implemented drag-and-drop functionality with React DnD for interactive UI.",
      "Added unit and integration tests with Jest and React Testing Library.",
      "Implemented server-side rendering (SSR) with Next.js for improved SEO and performance.",
      "Integrated Storybook for UI component development and testing.",
      "Added error logging and monitoring with Sentry for better error tracking.",
      "Implemented progressive web app (PWA) features for offline support and installation.",
      "Implemented serverless functions with AWS Lambda for backend operations."
  ];

  const milestone = milestones[Math.floor(Math.random() * milestones.length)];
  return milestone;
};

const Timeline = ({ projectInfo, id }: { projectInfo: any; id: number }) => {
  const { signer } = useConnection();

  console.log(projectInfo);

  const walletInfo = useSelector((state: RootState) => state.walletInfo);

  const convertToNormalDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  

  const milestoneData: any[] = [];

  projectInfo.milestones.forEach((milestone: any, index: number) => {
    const isVotingActive = milestone.voting_active;
    const votes_for = milestone.votes_for;
    const votes_against = milestone.votes_against;
    const votingEndTime = milestone.voting_deadline;

    milestoneData.push({
      index: index,
      votingActive: isVotingActive,
      votingUp: votes_for,
      votingDown: votes_against,
      votingEndTime: votingEndTime,
    });
  });

  const handleVoteWrapper = (vote: boolean, index: number) => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      try {
        if (!signer) {
          console.error("Signer not available.");
          return;
        }
        console.log(index);
        const result = await vote_operator(projectInfo.id, index, vote, signer);
        console.log(result);
      } catch (error) {
        console.error("Error occurred while voting:", error);
      }
    };
  };

  const handleStartVote = (index: number) => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      try {
        if (!signer) {
          console.error("Signer not available.");
          return;
        }
        console.log(index);

        const result = await startVoting(projectInfo.id, index, signer);
        showSuccessToast("Voting have been Started");
        console.log(result);
      } catch (error) {
        console.error("Error occurred while voting:", error);
      }
    };
  };
  const handleClosevote = (index: number) => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      try {
        if (!signer) {
          console.error("Signer not available.");
          return;
        }
        console.log(index);

        const result = await closeVoting(projectInfo.id, index, signer);
        showSuccessToast("Voting have been Closed");
        console.log(result);
      } catch (error) {
        console.error("Error occurred while voting:", error);
      }
    };
  };

  const isOwner = () => {
    const data = localStorage.getItem("walletData");
    if (data) {
      try {
        console.log("check", data);
        const walletData = JSON.parse(data);
        console.log(
          "check",
          (walletData.address as string).toLowerCase(),
          (projectInfo.owner as string).toLowerCase(),
          (walletData.address as string).toLowerCase() ===
            (projectInfo.owner as string).toLowerCase()
        );
        return (
          (walletData.address as string).toLowerCase() ===
          (projectInfo.owner as string).toLowerCase()
        );
      } catch (error) {
        console.error("Error parsing wallet data:", error);
        return false;
      }
    }
  };

  const check = (address: any, find: any) => {
    const match = address.map((data: any) => data === find);
    return match;
  };
  // const AddressMatcher = () => {
  //   const addressList = projectInfo?.investors;
  //   const addressMatch = addressList.map((address: any) => address === curaddress);

  //   // Using includes method
  //   const exists = addressMatch.includes(true);

  //   // Using some method
  //   // const exists = addressMatch.some(match => match === true);

  //   return exists;
  // };

  console.log("ss1", Number(projectInfo.last_milestone_completed + 1));

  const milestones = projectInfo.milestone_timestamps.map(
    (timestamp: number, index: number) => {
      console.log("isOwner", isOwner());
      return (
        <li
          key={index}
          className="relative mb-6 "
          style={{
            marginTop:'22px',
            marginBottom:'22px',
            width:'80%',
            height: "fit-content",
          }}
        >
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <svg
                className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3 className="text-lg font-semibold text-gray-300 dark:text-white">
              Milestone:  {index + 1}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {convertToNormalDate(timestamp)}
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {generateMilestone()}
            </p>
            {(check(projectInfo.investors, walletInfo.address) ||
              isOwner()) && (
              <>
                {index === Number(projectInfo.last_milestone_completed + 1) ? (
                  <div className="mt-2">
                    <p>Voting active</p>
                    <p>Bump: {milestoneData[index].votingUp}</p>

                    {isOwner() ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleStartVote(index)}
                      >
                        Start Vote
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleVoteWrapper(true, index)}
                      >
                       Boost
                      </button>
                    )}

                    <p>Bump: {milestoneData[index].votingDown}</p>

                    {isOwner() ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleClosevote(index)}
                      >
                        End Vote
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleVoteWrapper(false, index)}
                      >
                        Bump
                      </button>
                    )}

                    <p>
                      Voting ends on:{" "}
                      {convertToNormalDate(milestoneData[index].votingEndTime)}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p>Voting active</p>
                    <p>Boost: {milestoneData[index].votingUp}</p>

                    <div>Voting will start when previous milestone start</div>
                  </div>
                )}
              </>
            )}
          </div>
        </li>
      );
    }
  );

  return <ol className="items-center md:flex justify-center flex-col mt-3" >{milestones}</ol>;
};

export default Timeline;
