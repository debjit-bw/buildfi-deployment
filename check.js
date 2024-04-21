const ABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_imageId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "_verifier",
                "type": "address",
                "internalType": "contract IRiscZeroVerifier"
            },
            {
                "name": "_sign_deployed_addr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "abandon_project",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "buildfi_developers",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "email",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "zkKYC_proof_id",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "balance",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "credibility",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "buildfi_investors",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "investor",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "buildfi_projects",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "image",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "project_metadata_json",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "milestone_count",
                "type": "int16",
                "internalType": "int16"
            },
            {
                "name": "last_milestone_completed",
                "type": "int16",
                "internalType": "int16"
            },
            {
                "name": "milestone_metadata_json",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "total_budget",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "total_raised",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "projectToken",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "token_set",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "tokens_commited",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "created_at",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "started_at",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "funding_ends_at",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "completed_at",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "abandoned",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "projectCommitted",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "projectWrapped",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "changeImageId",
        "inputs": [
            {
                "name": "_imageId",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "claims",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "close_voting",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_milestoneId",
                "type": "int16",
                "internalType": "int16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createProject",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_image",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_project_metadata_json",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_milestone_timestamps",
                "type": "uint256[]",
                "internalType": "uint256[]"
            },
            {
                "name": "_payout_percentages",
                "type": "uint16[]",
                "internalType": "uint16[]"
            },
            {
                "name": "_total_budget",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "funding_ends_at",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "deployer",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getDeveloperInfo",
        "inputs": [
            {
                "name": "_developer",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct BuildFi.Developer",
                "components": [
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "email",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "zkKYC_proof_id",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "balance",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "credibility",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getInvestorInfo",
        "inputs": [
            {
                "name": "_investor",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "investor",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "project_ids",
                "type": "uint256[]",
                "internalType": "uint256[]"
            },
            {
                "name": "investments",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getProjectInfo",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "image",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "milestone_count",
                "type": "int16",
                "internalType": "int16"
            },
            {
                "name": "last_milestone_completed",
                "type": "int16",
                "internalType": "int16"
            },
            {
                "name": "milestone_timestamps",
                "type": "uint256[]",
                "internalType": "uint256[]"
            },
            {
                "name": "payout_percentages",
                "type": "uint16[]",
                "internalType": "uint16[]"
            },
            {
                "name": "total_budget",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "total_raised",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "investors",
                "type": "address[]",
                "internalType": "address[]"
            },
            {
                "name": "projectToken",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "token_set",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "tokens_commited",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "created_at",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "started_at",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "funding_ends_at",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "completed_at",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "abandoned",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "projectCommitted",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "projectWrapped",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "milestones",
                "type": "tuple[]",
                "internalType": "struct BuildFi.Milestone[]",
                "components": [
                    {
                        "name": "id",
                        "type": "int16",
                        "internalType": "int16"
                    },
                    {
                        "name": "voting_active",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "votes_for",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "votes_against",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "voting_deadline",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "imageId",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "invest",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "isp",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract ISP"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "makeNewAccount",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_email",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "projectCount",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "reclaim_funds",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "schema_ids",
        "inputs": [],
        "outputs": [
            {
                "name": "committed",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "wrapped",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setSchemaIds",
        "inputs": [
            {
                "name": "_committed",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "_wrapped",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "set_and_transfer_tokens",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_projectToken",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "start_project",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "commitAttestationData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "start_voting",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_milestoneId",
                "type": "int16",
                "internalType": "int16"
            },
            {
                "name": "_voting_deadline",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "verificationCallback",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "claimId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "postStateDigest",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "seal",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "verifier",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IRiscZeroVerifier"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "witness_voting",
        "inputs": [
            {
                "name": "_projectId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_milestoneId",
                "type": "int16",
                "internalType": "int16"
            },
            {
                "name": "_votes_for",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_votes_against",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "error",
        "name": "InvalidClaim",
        "inputs": [
            {
                "name": "message",
                "type": "string",
                "internalType": "string"
            }
        ]
    }
];
const ADDR = "0x00922B24142217e7947D773Faaa2F3c4457c4CfA";

const ISP_ABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_sign_deployed_addr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "attestation",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "deployer",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isp",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract ISP"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "schema_ids",
        "inputs": [],
        "outputs": [
            {
                "name": "committed",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "wrapped",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setSchemaIds",
        "inputs": [
            {
                "name": "_committed",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "_wrapped",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "testAttestation",
        "inputs": [
            {
                "name": "commitAttestationData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    }
];
const ISP_ADDR = "0xb8bb7ff14fda4e11F48a45Ce9d733B3dCBAaCE77"
import { ethers } from "ethers";

(async function getValueAtAddress(
    host,
) {
    const provider = new ethers.JsonRpcProvider(host);
    const signer = new ethers.Wallet(process.env["ETH_WALLET_PRIVATE_KEY"], provider);
    const AbiCoder = new ethers.AbiCoder();

    const address = signer.address;
    console.log("Address: ", address);

    // const buildfi = new ethers.Contract(ADDR, ABI, provider);
    // const res = await buildfi.imageId();
    // console.log("Obtained value at deployed contract is: " + res);
    // const claims = await buildfi.claims("0xed7BF904D369aba6A0244E7b2CfB5f92B31FF11a");
    // console.log("Obtained value at deployed contract is: " + claims, claims === `0x73c09d2c8f161bab31f4ea1276f303abc84f2d7d0ee5396a7ffa9c87ded1cfc0`);
    // return res;

    // const ispTest = new ethers.Contract(ISP_ADDR, ISP_ABI, signer);
    // const res = await ispTest.setSchemaIds(14, 14);
    // console.log("Obtained value at deployed contract is: " + res);
    // const res2 = await ispTest.schema_ids();
    // console.log("Obtained value at deployed contract is: " + res2);
    // const args = AbiCoder.encode(
    //     ["string", "uint256"],
    //     ["hello world", 20]
    // )
    // const res4 = await ispTest.testAttestation(
    //     args
    // )
    // console.log("Obtained value at deployed contract is: " + res4);
    // const res3 = await ispTest.attestation()
    // console.log("Obtained value at deployed contract is: " + res3);

    const buildFi = new ethers.Contract(ADDR, ABI, signer);
    // const res = await buildFi.changeImageId("0xaceac4faee5f55dde55fcc4e922317a3a74017b952b4c305e36eaae412b52bf5");
    // const res = await buildFi.imageId();
    const newwal = {
        claimId: "0x73c09d2c8f161bab31f4ea1276f303abc84f2d7d0ee5396a7ffa9c87ded1cfc0",
        postStateDigest: "0xa70cbe6ac7bed8c3235b44b035f097457fa9ac4e3a6fbb8cf64c08e5028c5a77",
        messageSender: "0xed7bf904d369aba6a0244e7b2cfb5f92b31ff11a",
        seal: [27, 61, 181, 103, 106, 122, 117, 107, 117, 99, 122, 132, 100, 57, 1, 48, 212, 37, 223, 245, 200, 66, 44, 51, 53, 198, 237, 190, 254, 163, 158, 177, 36, 96, 84, 18, 90, 175, 109, 46, 156, 128, 220, 52, 104, 227, 17, 124, 144, 193, 97, 136, 63, 31, 146, 126, 40, 175, 220, 112, 21, 20, 199, 57, 45, 209, 178, 2, 205, 113, 124, 247, 83, 188, 250, 50, 96, 245, 102, 49, 32, 146, 74, 57, 98, 35, 165, 68, 33, 144, 144, 75, 138, 232, 24, 206, 27, 200, 71, 31, 102, 209, 33, 172, 42, 209, 26, 191, 81, 151, 239, 129, 113, 233, 14, 94, 196, 4, 152, 150, 78, 188, 211, 24, 180, 248, 202, 87, 30, 181, 124, 92, 51, 36, 150, 188, 212, 219, 123, 21, 52, 131, 112, 84, 131, 128, 253, 39, 222, 107, 77, 57, 255, 27, 132, 247, 13, 54, 226, 91, 37, 61, 227, 109, 6, 32, 224, 14, 138, 243, 63, 10, 142, 101, 255, 149, 228, 218, 3, 181, 144, 234, 241, 130, 163, 160, 160, 163, 13, 141, 100, 72, 27, 212, 218, 140, 151, 33, 201, 56, 33, 204, 15, 142, 185, 191, 37, 108, 209, 133, 168, 231, 14, 37, 19, 182, 114, 93, 225, 253, 11, 75, 17, 171, 25, 251, 174, 218, 46, 161, 171, 252, 204, 42, 212, 151, 167, 143, 203, 13, 255, 107, 48, 166, 193, 99, 99, 253, 142, 249, 254, 255, 58, 136, 26, 142],
    }

    const kavish = {
        claimId: "0xa29b30c043c03803f696b14b5a1888518aa2a3e982e391d584a9c333dc449c9e",
        postStateDigest: "0x3004225547600875aa1ca8d7dd4a8413795953e40b0a196493fe235e95165c95",
        messageSender: "0x62d70134974e07c574a8cc76be8061d196881109",
        seal: [2, 206, 166, 74, 145, 255, 140, 148, 133, 58, 10, 141, 15, 217, 51, 6, 62, 104, 31, 200, 183, 146, 234, 100, 141, 218, 73, 253, 213, 224, 175, 211, 26, 113, 208, 157, 251, 141, 167, 32, 144, 9, 239, 25, 85, 95, 81, 112, 81, 177, 171, 152, 253, 7, 170, 117, 64, 9, 210, 137, 105, 106, 208, 62, 34, 157, 98, 162, 53, 26, 107, 183, 65, 125, 244, 136, 99, 38, 44, 128, 119, 94, 131, 154, 101, 19, 102, 137, 10, 72, 77, 19, 240, 89, 129, 128, 13, 52, 108, 185, 117, 122, 110, 145, 90, 192, 127, 164, 146, 208, 6, 209, 178, 28, 178, 91, 97, 7, 161, 161, 2, 219, 216, 174, 202, 138, 25, 40, 22, 31, 190, 187, 3, 37, 66, 220, 129, 31, 135, 248, 253, 139, 188, 141, 81, 201, 195, 112, 178, 201, 251, 89, 154, 177, 77, 235, 69, 145, 40, 133, 32, 197, 34, 241, 109, 8, 249, 89, 145, 47, 215, 128, 214, 69, 245, 35, 247, 182, 171, 179, 203, 232, 43, 234, 29, 40, 71, 23, 216, 115, 155, 30, 6, 218, 113, 59, 170, 67, 134, 207, 82, 100, 80, 210, 197, 20, 72, 228, 224, 229, 52, 203, 28, 183, 205, 184, 58, 235, 140, 46, 161, 117, 178, 186, 38, 19, 227, 161, 240, 242, 154, 132, 201, 116, 188, 156, 193, 208, 29, 36, 191, 66, 40, 49, 142, 209, 213, 134, 62, 26, 144, 61, 95, 134, 133, 153],
    }

    const akshay = {
        claimId: "0xf244d77da78a8f624aeccde06ccebb99d94e296224edd4361156381f556c5b9b",
        postStateDigest: "0x86c18e5f7b3bff24b1ed567a26ffde473b84de1f20472a22dd7d85b72d6638c7",
        messageSender: "0xd6f285aff13129f0e27a2079e343c9af3b19a776",
        seal: [18, 141, 237, 111, 54, 229, 66, 244, 45, 172, 236, 183, 139, 222, 33, 76, 224, 229, 79, 142, 126, 175, 80, 108, 241, 142, 143, 172, 146, 89, 58, 8, 45, 72, 11, 82, 204, 94, 183, 42, 146, 181, 47, 254, 57, 209, 78, 125, 149, 116, 247, 150, 146, 172, 67, 110, 64, 40, 35, 219, 229, 138, 115, 129, 47, 36, 62, 202, 83, 88, 136, 72, 247, 26, 177, 194, 163, 152, 239, 78, 114, 89, 178, 39, 144, 93, 68, 45, 23, 127, 101, 248, 73, 157, 212, 155, 41, 154, 36, 237, 55, 72, 62, 44, 162, 194, 89, 49, 162, 34, 227, 241, 17, 159, 222, 74, 68, 242, 203, 72, 60, 63, 181, 235, 104, 145, 119, 129, 32, 201, 250, 90, 198, 157, 168, 38, 5, 145, 31, 168, 8, 51, 222, 234, 78, 18, 34, 145, 72, 166, 104, 26, 129, 163, 203, 185, 69, 214, 54, 97, 0, 172, 186, 137, 50, 79, 152, 237, 98, 66, 63, 4, 234, 148, 38, 227, 147, 77, 160, 222, 167, 220, 34, 121, 167, 198, 184, 208, 77, 112, 179, 225, 9, 104, 29, 202, 210, 118, 245, 234, 219, 99, 107, 140, 43, 200, 188, 59, 198, 14, 1, 74, 9, 246, 180, 237, 74, 65, 208, 145, 94, 127, 95, 57, 18, 73, 224, 40, 44, 163, 3, 82, 10, 125, 77, 245, 185, 14, 204, 150, 89, 180, 118, 235, 123, 99, 194, 110, 135, 74, 204, 244, 112, 204, 127, 75],
    }

    const oldwal = {
        claimId: "0x73c09d2c8f161bab31f4ea1276f303abc84f2d7d0ee5396a7ffa9c87ded1cfc0",
        postStateDigest: "0x9447e6ec3378d343c50155d264f2b27600c6fd008f548dd5edb58db359d047d9",
        messageSender: "0x48d74743caa686e52d77be3cdb90704e60e3b110",
        seal: [15, 99, 120, 156, 103, 232, 22, 43, 12, 83, 20, 199, 147, 228, 62, 229, 8, 172, 145, 227, 71, 41, 98, 47, 48, 173, 127, 121, 146, 140, 103, 155, 46, 163, 211, 191, 127, 242, 1, 62, 121, 0, 107, 77, 162, 91, 235, 93, 68, 168, 42, 3, 163, 186, 87, 39, 62, 106, 136, 160, 110, 205, 238, 95, 19, 60, 56, 65, 53, 80, 152, 25, 82, 62, 144, 46, 57, 138, 173, 232, 200, 253, 251, 144, 232, 126, 226, 196, 146, 203, 165, 43, 62, 79, 204, 204, 1, 252, 2, 14, 99, 211, 46, 189, 204, 201, 216, 19, 224, 123, 219, 88, 86, 23, 54, 192, 146, 101, 76, 53, 229, 9, 14, 66, 217, 187, 138, 46, 2, 183, 159, 200, 176, 185, 17, 247, 160, 137, 221, 41, 49, 168, 42, 220, 145, 116, 40, 119, 186, 84, 84, 139, 49, 201, 48, 59, 159, 58, 188, 109, 35, 38, 27, 14, 209, 0, 230, 130, 182, 186, 134, 139, 151, 197, 55, 13, 123, 179, 149, 140, 157, 250, 54, 139, 61, 12, 101, 42, 98, 130, 253, 254, 31, 59, 225, 227, 64, 175, 74, 252, 183, 28, 195, 69, 255, 70, 163, 93, 23, 180, 242, 23, 92, 152, 118, 99, 247, 94, 127, 93, 207, 140, 72, 107, 25, 163, 147, 239, 130, 130, 240, 235, 180, 37, 23, 132, 6, 112, 88, 5, 118, 9, 121, 111, 168, 156, 43, 182, 181, 113, 217, 163, 140, 159, 28, 32],
    }
    
    // // // Convert each element to hex string 
    // const kycof = oldwal
    // const sealHexString = ethers.hexlify(new Uint8Array(kycof.seal));
    // console.log("sealHexArray: ", sealHexString, typeof sealHexString)
    // const res = await buildFi.verificationCallback(
    //     kycof.messageSender,
    //     kycof.claimId,
    //     kycof.postStateDigest,
    //     sealHexString
    // )
    // const res = await buildFi.projectCount()
    // console.log("Obtained value at deployed contract is: " + res);
    // const res = await buildFi.createProject(
    //     "Mirror.xyz",
    //     "https://assets-global.website-files.com/6364e65656ab107e465325d2/637aed954d38a6dbb814a324_TQmBbnIj5WL1b91F5Bx3PbEt6YPwS1QVmVNGV3l04lI.jpeg",
    //     "Web 3 social media",
    //     "",
    //     [1713550000, 1713650000, 1713750000],
    //     [10, 30, 60],
    //     "10000000000000000000",
    //     1713550000
    // )
    // const res = await buildFi.getProjectInfo(1)
    // const res = await buildFi.makeNewAccount("deb", "debjitbhowal.db@gmail.com")
    // console.log("Obtained value at deployed contract is: " + res[7].map((e) => Number(e)));
    // for (let i = 0; i < res.length; i++) {
    //     console.log(i, res[i])
    // }

    const developer_info = await buildFi.buildfi_developers("0x48D74743caA686e52D77be3Cdb90704e60E3b110");
    console.log("Obtained value at deployed contract is: ", developer_info[1]);
    const claim = await buildFi.claims(String("0x48D74743caA686e52D77be3Cdb90704e60E3b110"));
    console.log("Obtained value at deployed contract is: ", claim);

    // console.log("Obtained value at deployed contract is: " + res);

})("https://arb-sepolia.g.alchemy.com/v2/gdoWsVkAdoopk0ijXAAOtvq-CsXT8PTO")