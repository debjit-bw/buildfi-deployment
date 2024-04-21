import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { getProjectInfo, invest, startProject } from "@/utils/transitions";
import data from "../../../constant/constant";
import useConnection from "@/utils/useConnection";
import Timeline from "../../../components/Timeline/timeline";
import { showSuccessToast } from "@/utils/notifications";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Slug = (props: any) => {
  const router = useRouter();
  const { slug }: any = router.query;
  const { signer } = useConnection();
  // const project = data.find((item) => item.slug === slug);
  const walletInfo = useSelector((state: RootState) => state.walletInfo);
  const id = slug;
  console.log(id);

  const [projectInfo, setProjectInfo] = useState<any>(null);
  console.log(projectInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectInfo = async () => {
      setLoading(true);
      try {
        const info = await getProjectInfo(id);
        setProjectInfo(info);
      } catch (error) {
        setError("Failed to fetch project information");
        console.error("Error fetching project information:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProjectInfo();
    }
  }, [slug]);

  const investApi = async () => {
    try {
      await invest(id, 1000000, signer!);
      showSuccessToast("Successfullyy invested in this project");
    } catch (error) {
      console.error("Error investing in project:", error);
    }
  };

  const handleStartProject = async () => {
    try {
      await startProject(id, walletInfo.address, signer!);
      showSuccessToast("Project is Started ");
    } catch (error) {
      console.error("Error investing in project:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log("sss", projectInfo);

  return (
    <>
      {projectInfo && (
        <div className="max-w-xl mx-auto">
          <div className="mb-4">
            <h1
              className="text-6xl font-bold mb-2"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "80%",
                marginTop: "12px",
                marginBottom:'12px',
                margin:'auto'
              }}
            >
              {projectInfo.name}
            </h1>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="w-1/2 pr-8">
              <img
                src={projectInfo.image}
                alt="Project Image"
                className="w-40 h-auto rounded-lg"
                width={300}
                height={300}
              />
            </div>

            <div
              className="w-1/2"
              style={{
                marginLeft: "6vw",
              }}
            >
              <div
                className="mb-4 flex flex-row  items-center gap-4"
                style={{ gap: "12px" }}
              >
                <h1 className="text-xl font-bold mb-2">Milestone Count:</h1>
                <p className="text-gray-500">{projectInfo.milestone_count}</p>
              </div>
              <div
                className="mb-4 flex flex-row  items-center gap-4"
                style={{ gap: "12px" }}
              >
                <h1 className="text-xl font-bold ">Investors:</h1>
                <p className="text-xl text-gray-500">
                  {projectInfo.investors.length}
                </p>
              </div>
              <div className="mb-4">
                <h1 className="text-xl font-bold mb-2">
                  Owner of this project:
                </h1>
                <p className="text-gray-500">{projectInfo.owner}</p>
              </div>
              <div className="mb-4">
                <h1 className="text-xl font-bold mb-2">KYC Identity</h1>
                <p
                  className=" text-l  font-bold mt-2 "
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  {projectInfo.developer_email}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              justifyContent: "center",
              width: "80%",
              margin: "auto",
            }}
          >
            <h1 className="text-xl font-bold mb-2">Description:</h1>
            <p className="text-gray-500">
          {projectInfo.description}
            </p>
          </div>

          {projectInfo.started_at === 0 &&
            walletInfo.address == projectInfo.owner && (
              <button
                className="bg-blue-500 m-auto flex mt-4 mb-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleStartProject}
              >
                Start Project
              </button>
            )}

          {Number(projectInfo.funding_ends_at * 1000) < new Date().getTime() ? (
            <button
              className="bg-blue-500 m-auto flex mt-4 mb-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={investApi}
            >
              Investment are Closed
            </button>
          ) : (
            <button
              className="bg-blue-500 m-auto flex mt-4 mb-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={investApi}
            >
              Invest in this project
            </button>
          )}
          <Timeline projectInfo={projectInfo} id={slug} />
        </div>
      )}
    </>
  );
};

export default Slug;
