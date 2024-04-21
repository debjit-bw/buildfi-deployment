import useConnection from "@/utils/useConnection";
import { useState } from "react";
import { createProject } from "@/utils/transitions";
import { showFailureToast, showSuccessToast } from "@/utils/notifications";
const ProjectCreate = () => {
  const { signer } = useConnection();
  const [metadata, setMetadata] = useState("");
  const [name, setName] = useState("");
  const [image, setBanner] = useState("");
  const [description, setDiscription] = useState("");
  const [totalBudget, setTotalBudget]: any = useState(null);
  const [fundingEndDate, setFundingEndDate] = useState("");
  const [numMilestones, setNumMilestones]: any = useState(null);
  const [milestones, setMilestones]: any = useState([]);
  const convertDateToMs = (dateString: any) => {
    const date = new Date(dateString);
    const ms = Number(date.getTime()/1000);
    return ms;
  };

  const milestonesWithIsoDate = milestones.map((milestone: any) => {
    return {
      date: convertDateToMs(milestone.date),
      fundPercentage: milestone.fundPercentage,
    };
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("ff", fundingEndDate);
    const date = convertDateToMs(fundingEndDate);
    console.log("ff", milestonesWithIsoDate);

    // Add your form submission logic here
  };

  const handleMilestoneChange = (index: any, field: any, value: any) => {
    const updatedMilestones: any = [...milestones];
    updatedMilestones[index][field] = value;
    setMilestones(updatedMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { date: "", fundPercentage: "" }]);
  };

  const handlecreateProject = async () => {
    const datesArray: any = [];
    const fundPercentagesArray: any = [];
    milestonesWithIsoDate.forEach((milestone: any) => {
      datesArray.push(milestone.date);
      fundPercentagesArray.push(Number(milestone.fundPercentage));
    });
    console.log("name", name);
    console.log("image", image);
    console.log("description", description);
    console.log("metadata", metadata);
    console.log("endDate", convertDateToMs(fundingEndDate));
    console.log("fundPercentagesArray", fundPercentagesArray);
    console.log("datesArray", datesArray);

    try {
      await createProject(
        name,
        image,
        description,
        metadata,
        datesArray,
        fundPercentagesArray,
        totalBudget,
        convertDateToMs(fundingEndDate),
        signer!
      );
      showSuccessToast("Project Created Successfully");
      console.log("okay");
    } catch (error) {
      showFailureToast(error);
      console.error("Error investing in project:", error);
    }
  };

  // description: string,
  // metadata: string,
  // milestones: number,
  // payoutPercentages: number[],

  return (
    <div className="m-auto w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="space-y-6">
        <h5 className="text-xl font-bold  text-gray-900 dark:text-white">
          Project Details
        </h5>
        <div>
          <label
            htmlFor="name"
            className="block mb-4  text-l font-medium text-gray-900 dark:text-white"
          >
            Name of Project
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block mb-4  text-l font-medium text-gray-900 dark:text-white"
          >
            Upload Banner of Project
          </label>
          <input
            type="text"
            id="name"
            value={image}
            onChange={(e) => setBanner(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block mb-4  text-l font-medium text-gray-900 dark:text-white"
          >
            Description of Project
          </label>
          <textarea
            id="name"
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="metadata"
            className="block mb-4 text-l font-medium text-gray-900 dark:text-white"
          >
            Metadata (Addition Information)
          </label>
          <input
            type="text"
            id="metadata"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="totalBudget"
            className="block mb-4  text-l font-medium text-gray-900 dark:text-white"
          >
            Total Budget in Ethereum
          </label>
          <input
            type="number"
            id="totalBudget"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="fundingEndDate"
            className="block mb-2 text-l font-medium text-gray-900 dark:text-white"
          >
            Funding End Date
          </label>
          <input
            type="date"
            id="fundingEndDate"
            value={fundingEndDate}
            onChange={(e) => setFundingEndDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="numMilestones"
            className="block mb-2 text-l font-medium text-gray-900 dark:text-white"
          >
            Number of Milestones for project
          </label>
          <input
            type="number"
            id="numMilestones"
            value={numMilestones}
            onChange={(e) => {
              setNumMilestones(e.target.value);
              setMilestones(
                Array.from({ length: Number(e.target.value) }, () => ({
                  date: "",
                  fundPercentage: "",
                }))
              );
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        {milestones.map((milestone: any, index: any) => (
          <div key={index} className="mb-4 flex-col">
            {" "}
            <div className="mb-4 flex-col">
              {" "}
              <label
                htmlFor={`milestoneDate${index}`}
                className="block mb-4 text-l font-medium text-gray-900 dark:text-white"
              >
                Milestone {index + 1} Date
              </label>
              <input
                type="date"
                id={`milestoneDate${index}`}
                value={milestone.date}
                onChange={(e) =>
                  handleMilestoneChange(index, "date", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              {" "}
              <label
                htmlFor={`milestoneFundPercentage${index}`}
                className="block mb-2 mt-4 text-l font-medium text-gray-900 dark:text-white"
              >
                Milestone {index + 1} Fund Percentage
              </label>
              <input
                type="text"
                id={`milestoneFundPercentage${index}`}
                value={milestone?.fundPercentage}
                onChange={(e) =>
                  handleMilestoneChange(index, "fundPercentage", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addMilestone}
          className="w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Milestone
        </button>
        <button
          onClick={handlecreateProject}
          className="w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCreate;
