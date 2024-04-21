import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import WrapperCards from "../../../components/WrapperCard/WrapperCards";
import Layout from "../../../components/Layout/Layout";
import { useRouter } from "next/router";
// import data from "../../../constant/constant";
import { getAllProjects } from "@/utils/transitions";

interface Project {
  id: number;
  name: string;
  metadata: any;
  owner: any;
  milestone_count: number;
  total_budget: number;
  token_set: any;
  created_at: number;
  funding_ends_at: number;
  abandoned: boolean;
  // Add any other properties you have in your project object
}

const index = () => {
  const router = useRouter();

  const [projects, setProjects]:any = useState<Project[]>([]);
  // console.log(projects);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (id: number) => {
    const project = projects.find((item:any) => item.id === id);
    if (project) {
      router.push(`/projects/${project.id}`);
      console.log("id", project.id);
    }
  };
  return (
    <div className="flex flex-row w-full m-auto z-999 justify-between">
      <Sidebar />
      <WrapperCards data={projects} handleClick={handleClick} />
    </div>
  );
};

export default index;
