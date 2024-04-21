import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./sidebar.module.css";
import data from "../../constant/constant";
import { circleOnLens } from "@/utils/transitions";
import useConnection from "@/utils/useConnection";

const Sidebar = () => {
  const { accountData } = useConnection();

  const [profiles, setProfiles] = useState<Array<[string, string]>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await circleOnLens("0xDC148b5F7B208463535584882fF37C50491077Cd"!);
        // const response = await circleOnLens(accountData.address!);
        // const response = await circleOnLens(
        //   "0xDC148b5F7B208463535584882fF37C50491077Cd"
        // );

        const profileMap: any = Array.from(response.entries());
        setProfiles(profileMap);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log(profiles.length === 0 ? "Empty" : "Not Empty");
  // }, [profiles]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper1}>
        <div
          className={styles.txt1}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            aria-hidden="true"
            className="nLhohPz5FpffXM9RSdFT _XD2a764x49B1E2F9f8X rZZ58B08lxezTX7iNgGT VIuKUx4c9XwVneT1qxHx PpCOzotByot10b_uhGji eCx_6PNzncAD5yo7Qcic yHlultZNYA9toOP4bD_k _Fwzcmilfk0R9LVuMadQ"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "2rem",
            }}
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <h4
            style={{
              paddingLeft: "1rem",
            }}
          >
            Your Circle on Lens
          </h4>
        </div>

        {profiles.length === 0 ? (
          <div className={styles.txt2}>
            <h2 style={{ fontSize: "2vh" }}>Your Lens Circle is empty</h2>
          </div>
        ) : (
          <ul
            className={styles.sidebarNames}
            style={{
              marginLeft: "1rem",
            }}
          >
            {profiles.map((profile, index) => (
              <li
                key={index}
                className={styles.sidebarNameItem}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  alt="jese avatar"
                  style={{
                    width: "1.5rem",
                    marginRight: "1rem",
                  }}
                ></img>
                <h2>{`${profile[1]}: ${profile[0].slice(
                  0,
                  4
                )}...${profile[0].slice(-4)}`}</h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
