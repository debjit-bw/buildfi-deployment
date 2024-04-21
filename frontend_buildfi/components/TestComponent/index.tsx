import {
  isKycDone,
  getAllProjects,
  vote_operator,
  circleOnLens,
} from "@/utils/transitions";
import useConnection from "@/utils/useConnection";
import React, { useState } from "react";

const TestComp = () => {
  //   const address = "08F20F4E2906c2273DB308Be734b67B97233daeEd"
  const [email, setEmail] = useState("");
  const { signer } = useConnection();
  console.log(signer);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      //   const isDone = await isKycDone(address);
      //   const isDone = await isKycDone((await signer?.getAddress())!)
      //   console.log("isDone", isDone);

      // const projects = await getAllProjects();
      // console.log("Projects:", projects);

      // const vote = await vote_operator(1, 0, true, signer!);
      // console.log("vote result:", vote);

      // const lens = circleOnLens("0xb42a8c62f3278AFc9343A8FcCD5232CBe8aA5117");
      const lens = await circleOnLens(
        "0xDC148b5F7B208463535584882fF37C50491077Cd"
      );
      console.log("Lens:", lens);
    } catch (error) {
      //   console.error("Error creating account:", error);
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSubmit}
    >
      Submit
    </button>
  );
};

export default TestComp;
