import React, { useEffect } from "react";
import styles from "./layout.module.css";
import useDetectDevice from "../../customhook/useDetectDevice";
import Header from "../Header/Header";
import useConnection from "@/utils/useConnection";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const res = useDetectDevice();

  const { accountData, _connectToMetaMask, _disconnectFromMetaMask } =
    useConnection();

  return (
    <>
      <div className="flex flex-col w-full">
        <Header
          {...accountData}
          onConnect={_connectToMetaMask}
          onDisconnect={_disconnectFromMetaMask}
        />
        <div className="mt-[100px]">{children}</div>
      </div>
    </>
  );
};

export default Layout;
