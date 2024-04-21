import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import useConnection from "@/utils/useConnection";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../src/store/index";
import Image from "next/image";
import BuildFI from "public/Build.png";

interface HeaderProps {
  onConnect: () => void;
  onDisconnect: () => void;
}
import { useRouter } from "next/router";
import { resetWalletInfo } from "@/store/slice/walletinfo";
import { getDeveloperInfo } from "@/utils/transitions";

const Header = ({ onConnect, onDisconnect }: HeaderProps) => {
  const walletInfo = useSelector((state: RootState) => state.walletInfo);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [DeveloperExists, setDeveloperExists] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    await onConnect();
    setLoading(false);
  };
  const handleDisconnect = () => {
    onDisconnect();
    dispatch(resetWalletInfo());
    localStorage.removeItem("walletData");
  };

  const router = useRouter();
  const handleRedirect = () => {
    router.push("/");
  };
  const handleRedirect2 = () => {
    router.push("./kyc");
  };
  const handleCreateProject = () => {
    router.push("/create");
  };
  useEffect(() => {
    if (router.pathname === "/projects" && walletInfo.address) {
      const fetchData = async () => {
        try {
          const developerInfo = await getDeveloperInfo(walletInfo.address);
          console.log("Developer info:", developerInfo);
          if (developerInfo[1]) {
            // If developer info exists, redirect to projects page
            // router.push("/projects");
            setDeveloperExists(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error appropriately, e.g., display error message to the user
        }
      };

      fetchData();
    }
  }, [router.pathname, walletInfo.address]);

  return (
    <div className={show ? styles.container : styles.ncontainer}>
      <div className={styles.subContainer1}>
        <Image
          src={BuildFI}
          alt={"BuildFi"}
          width={180}
          height={40}
          onClick={handleRedirect}
          className="cursor-pointer"
          style={{ filter: "invert(1)", borderRadius: "8px" }}
        />
        <a href="/projects">Projects</a>
        <a
          href="/kyc"
          className="text-[16px]/[0px] cursor-pointer"
          onClick={handleRedirect2}
        >
          Looking for Funding?{" "}
        </a>
        {router.pathname === "/projects" && DeveloperExists && (
          <button
            className="bg-[#ffffff] hover:bg-[#b7b5b5] text-black font-bold py-2 px-4 rounded"
            onClick={handleCreateProject}
          >
            Create Project
          </button>
        )}
      </div>

      {loading ? (
        <CircularProgress />
      ) : walletInfo.address ? (
        <>
          <button
            className="bg-[#ffffff] hover:bg-[#b7b5b5] text-black font-bold py-2 px-8 rounded"
            onClick={handleDisconnect}
          >
            🟢{" "}
            {walletInfo.address && walletInfo.address.length > 8
              ? `${walletInfo.address.slice(0, 4)}...${walletInfo.address.slice(
                  -4
                )}`
              : walletInfo.address}
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConnect}
          >
            Connect
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
