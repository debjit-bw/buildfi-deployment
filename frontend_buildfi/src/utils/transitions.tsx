import { Contract, ethers, JsonRpcProvider } from "ethers";
import { sepolia } from "./config";
import { BUILDFI_ABI } from "../../../abis/BuildFi.abi";
import axios from "axios";

// const sepoliaProvider = new ethers.providers.JsonRpcProvider(
//   "https://arb-sepolia.g.alchemy.com/v2/gdoWsVkAdoopk0ijXAAOtvq-CsXT8PTO"
// );

const sepoliaProvider = new JsonRpcProvider(
  "https://arb-sepolia.g.alchemy.com/v2/gdoWsVkAdoopk0ijXAAOtvq-CsXT8PTO"
);

export async function isKycDone(address: string): Promise<boolean> {
  console.log("in isKycDone");
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  try {
    const result = await buildfi.claims(address);
    if (
      result ===
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    // console.error("Error creating account:", error);
    return false;
  }
}

export async function vote_operator(
  projectId: number,
  milestoneId: number,
  vote: boolean,
  signer: ethers.Signer
) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, signer);
  const vote_through_witness_api =
    "https://us-central1-my-project-5269-1684667148053.cloudfunctions.net/buildfi-vote-casting";
  const vote_intermediate = await axios.post(vote_through_witness_api, {
    address: await signer.getAddress(),
    vote: vote,
    project_id: projectId,
    milestone_id: milestoneId,
  });
  // TODO logic to send data to chain
  const response_json = vote_intermediate.data;
  console.log("vote_intermediate", response_json);

  if (response_json.error === true && response_json.message === "Already voted") {
    return "Already voted";
  } else if (response_json.error === false) {
    const result = await buildfi.witness_voting(projectId, milestoneId, response_json["votes_for"], response_json["votes_against"]);
    console.log("vote result:", result);
    return "Voted successfully";
  }
}

export async function circleOnLens(address: string) {
  const response = await axios.post(
    'https://api-v2.lens.dev/playground',
    {
      'query': 'query Profile($request: ProfilesRequest!) {\n  profiles(request: $request) {\n    items {\n      id\n      handle {\n        fullHandle\n      }\n    }\n  }\n}',
      'variables': {
        'request': {
          'where': {
            'ownedBy': address
          }
        }
      }
    },
    {
      headers: {
        'content-type': 'application/json'
      }
    }
  );
  try {
    const profiles = response.data.data?.profiles?.items;
    console.log(profiles);

    for (const profile of profiles) {
      console.log(profile.id, profile.handle.fullHandle);
    }
    const profileId = profiles[0].id;

    const network_raw = await axios.post(
      'https://api-v2.lens.dev/playground',
      {
        'query': 'query Profile($followersRequest2: FollowersRequest!, $followingRequest2: FollowingRequest!) {\n  followers(request: $followersRequest2) {\n    items {\n      ownedBy {\n        address\n      }\n      handle {\n        fullHandle\n      }\n    }\n  }\n  following(request: $followingRequest2) {\n    items {\n      ownedBy {\n        address\n      }\n      handle {\n        fullHandle\n      }\n    }\n  }\n}',
        'variables': {
          'followersRequest2': {
            'of': '0x01ec4c'
          },
          'followingRequest2': {
            'for': '0x01ec4c'
          }
        }
      },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    );

    const addresses_handles = new Map<string, string>();
    const followers = network_raw.data.data?.followers?.items;
    const following = network_raw.data.data?.following?.items;
    for (const follower of followers) {
      addresses_handles.set(follower.ownedBy.address, follower.handle.fullHandle);
    }
    for (const followee of following) {
      addresses_handles.set(followee.ownedBy.address, followee.handle.fullHandle);
    }
    console.log(addresses_handles);

    return addresses_handles;
  } catch (error) {
    return new Map<string, string>();
  }
}

export function parseProject(project: any) {
  return {
    id: Number(project[0]),
    name: project[1],
    image: project[2],
    description: project[3],
    owner: project[4],
    milestone_count: Number(project[5]),
    last_milestone_completed: Number(project[6]),
    milestone_timestamps: project[7].map((e: BigInt) => Number(e)),
    payout_percentages: project[8].map((e: BigInt) => Number(e)),
    total_budget: Number(project[9]),
    total_raised: Number(project[10]),
    investors: project[11].map((e: string) => e),
    project_token: project[12],
    token_set: project[13],
    tokens_commited: Number(project[14]),
    created_at: Number(project[15]),
    started_at: Number(project[16]),
    funding_ends_at: Number(project[17]),
    completed_at: Number(project[18]),
    abandoned: project[19],
    projectCommitted: Number(project[20]),
    projectWrapped: Number(project[21]),
    milestones: project[22].map((e: any) => ({
      id: Number(e[0]),
      voting_active: e[1],
      votes_for: Number(e[2]),
      votes_against: Number(e[3]),
      voting_deadline: Number(e[4]),
    }))
    // milestone_timestamps: project[6],
    // payout_percentages: project[7],
    // milestone_metadata_json: project[8],
  };
}

export async function getAllProjects() {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);
  const projectCount = await buildfi.projectCount();
  const projects = [];
  for (let i = 1; i < projectCount; i++) {
    const project = await buildfi.getProjectInfo(i);
    // console.log("Project:", project);
    projects.push(parseProject(project));
  }
  return projects;
}

export async function abondon_project(project_id: number) {
  console.log(project_id);
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  const result = await buildfi.abandon_project(project_id);
  console.log("abondon", result);
}

export async function getDeveloperInfo(address: string) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  const info = await buildfi.buildfi_developers(address);
  console.log("Developer info:", info);
  return info;
}

export async function getProjectInfo(projectId: number) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  const project = await buildfi.getProjectInfo(projectId);
  const _project_parsed = parseProject(project);

  console.log("owner:", _project_parsed.owner);
  const developer_info: any = await buildfi.buildfi_developers(_project_parsed.owner);
  console.log("Developer info:", String(developer_info[1]));
  const response = await axios.post("https://us-central1-my-project-5269-1684667148053.cloudfunctions.net/buildfi-email-claim", {
    claim: String(developer_info[1])
  });

  const project_parsed = {
    ..._project_parsed,
    developer_email: response.data.email
  }

  console.log("Project info:", project_parsed);
  return project_parsed;
}

export async function changeImageId(imageId: string) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  const result = await buildfi.changeImageId(imageId);
  console.log("changeImageId result:", result);
}

export async function claim(address: string) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  const claimId = await buildfi.claims(address);
  console.log("Claim ID:", claimId);
}

export async function closeVoting(projectId: number, milestoneId: number, signer: ethers.Signer) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, signer);
  console.log("closeVoting:", projectId, milestoneId);
  const result = await buildfi.close_voting(projectId, milestoneId);
  console.log("close_voting result:", result);
}

export async function createProject(
  name: string,
  image: string,
  description: string,
  metadata: string,
  milestones: number[],
  payoutPercentages: number[],
  totalBudget: number,
  fundingEndsAt: number,
  signer: any
) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, signer);

  const result = await buildfi.createProject(
    name,
    image,
    description,
    metadata,
    milestones,
    payoutPercentages,
    totalBudget,
    fundingEndsAt
  );
  console.log("createProject result:", result);
}

export async function invest(projectId: number, amount: number, signer: ethers.Signer) {
  console.log("invest:", projectId, amount);
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, signer);

  const result = await buildfi.invest(projectId, {
    value: ethers.parseUnits(amount.toString(), "gwei"),
  });
  console.log("invest result:", result);
}

export async function makeNewAccount(
  name: string,
  email: string,
  signer: ethers.Signer
) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, signer);
  console.log("makeNewAccount:", name, email, await signer.getAddress());

  const result = await buildfi.makeNewAccount(name, email);
  console.log("makeNewAccount result:", result);
}

export async function getProjectCount() {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  const count = await buildfi.projectCount();
  console.log("Project count:", count);
}

export async function reclaimFunds(projectId: number) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  const result = await buildfi.reclaim_funds(projectId);
  console.log("reclaim_funds result:", result);
}

export async function setAndTransferTokens(
  projectId: number,
  projectToken: string
) {
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

  const result = await buildfi.set_and_transfer_tokens(projectId, projectToken);
  console.log("set_and_transfer_tokens result:", result);
}

export async function startProject(_projectId: number, developer: string, signer: ethers.Signer) {
  // schema: 30
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, signer);

  const developer_info = await buildfi.buildfi_developers(developer)
  const kyc_identity = await buildfi.claims(String(developer_info[1]))

  const AbiCoder = new ethers.AbiCoder();
  const args = AbiCoder.encode(
    ["address", "uint256", "bytes32"],
    [developer, _projectId, kyc_identity]
  );

  const result = await buildfi.start_project(_projectId, args);
  console.log("start_project result:", result);
}

export async function startVoting(
  projectId: number,
  milestoneId: number,
  signer: ethers.Signer
) {
  console.log("startVoting:", projectId, milestoneId);
  const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, signer);
  // unix timestamp
  const timestamp = Math.ceil(new Date().getTime() / 1000 + 2 * 61 * 60 * 24 * 7);
  const result = await buildfi.start_voting(projectId, milestoneId, timestamp as number);
  console.log("start voting result:", result);
}

// export async function vote(
//   projectId: number,
//   milestoneId: number,
//   vote: boolean,
//   signer: ethers.Signer
// ) {
//   const buildfi = new Contract(sepolia.buildfi, BUILDFI_ABI, sepoliaProvider);

//   const result = await buildfi.vote(projectId, milestoneId, vote);
//   console.log("vote result:", result);
// }
