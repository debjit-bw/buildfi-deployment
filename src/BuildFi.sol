// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// a crowd-investment platform where developers can raise funds for their projects from day 1. it's milestone based and the funds get disbursed on successful milestone completion
// TODO:
// - penalization logic (credibility and payout)
// - add voting deadline to a milestone (if it exceeds without getting closed, penalization)
// - add proposals to project for investors to create vote on
// - a way for attestations to be added

import {Ownable} from "openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IRiscZeroVerifier} from "risc0/IRiscZeroVerifier.sol";
import {IWitness, Proof} from "witness/interfaces/IWitness.sol";
import {ISP} from "sign-protocol/interfaces/ISP.sol";
import {Attestation} from "sign-protocol/models/Attestation.sol";
import {DataLocation} from "sign-protocol/models/DataLocation.sol";

contract BuildFi {
    address public deployer;
    bytes32 public imageId;
    IRiscZeroVerifier public immutable verifier;
    ISP public immutable isp;

    mapping(address => bytes32) public claims;

    struct Developer {
        // identity
        string name;
        bytes32 email;
        string zkKYC_proof_id;
        // financial
        uint256 balance;
        uint256 credibility;
    }

    mapping(address => Developer) public buildfi_developers;

    struct Milestone {
        int16 id;
        bool voting_active;
        uint256 votes_for;
        uint256 votes_against;
        // mapping(address => bool) voters; (NOW DONE THROUGH WITNESS)
        uint256 voting_deadline;
        // add witness here
    }

    struct Project {
        // identity
        uint256 id;
        string name;
        string image;
        string description;
        string project_metadata_json;
        address owner;
        // milestones
        int16 milestone_count;
        int16 last_milestone_completed;
        uint256[] milestone_timestamps;
        uint16[] payout_percentages;
        string milestone_metadata_json;
        mapping(uint16 => Milestone) milestones;
        // financial
        uint256 total_budget;
        uint256 total_raised;
        // participants
        address[] investors;
        mapping(address => uint256) investments;
        // payouts
        address projectToken;
        bool token_set;
        uint256 tokens_commited;
        // timestamps
        uint256 created_at;
        uint256 started_at;
        uint256 funding_ends_at;
        uint256 completed_at;
        // status
        bool abandoned;
        // attestations
        uint64 projectCommitted;
        uint64 projectWrapped;
        // wrapped includes funds have been locked and distributed etc
    }
    mapping(uint256 => Project) public buildfi_projects;

    uint256 public projectCount;

    struct Investor {
        address investor;
        uint256[] project_ids;
        mapping(uint256 => uint256) investments;
    }
    mapping(address => Investor) public buildfi_investors;

    struct SCHEMA_IDS {
        uint64 committed;
        uint64 wrapped;
    }
    SCHEMA_IDS public schema_ids;

    error InvalidClaim(string message);

    constructor(
        bytes32 _imageId,
        IRiscZeroVerifier _verifier,
        address _sign_deployed_addr
    ) {
        deployer = msg.sender;
        imageId = _imageId;
        verifier = IRiscZeroVerifier(_verifier);
        isp = ISP(_sign_deployed_addr);
        projectCount = 1;
    }

    function changeImageId(bytes32 _imageId) public {
        require(msg.sender == deployer, "Not deployer");
        imageId = _imageId;
    }

    function setSchemaIds(uint64 _committed, uint64 _wrapped) public {
        require(msg.sender == deployer, "Not deployer");
        schema_ids.committed = _committed;
        schema_ids.wrapped = _wrapped;
    }

    function verificationCallback(
        address sender,
        bytes32 claimId,
        bytes32 postStateDigest,
        bytes calldata seal
    ) public {
        if (sender == address(0))
            revert InvalidClaim("Invalid recipient address");
        if (claimId == bytes32(0)) revert InvalidClaim("Empty claimId");
        if (
            !verifier.verify(
                seal,
                imageId,
                postStateDigest,
                sha256(abi.encode(sender, claimId))
            )
        ) {
            revert InvalidClaim("Invalid proof");
        }

        claims[sender] = claimId;
    }

    function makeNewAccount(string memory _name, string memory _email) public {
        // ensure the developer doesn't already exist
        require(
            bytes(buildfi_developers[msg.sender].name).length == 0,
            "Developer already exists"
        );

        // hash the email in sha256
        bytes32 email_hash = sha256(bytes(_email));
        require(claims[msg.sender] == email_hash, "Email claim does not match");

        // create a new developer account
        buildfi_developers[msg.sender] = Developer(
            _name,
            sha256(bytes(_email)),
            "0",
            0,
            5
        );
    }

    function createProject(
        string memory _name,
        string memory _image,
        string memory _description,
        string memory _project_metadata_json,
        uint256[] memory _milestone_timestamps,
        uint16[] memory _payout_percentages,
        uint256 _total_budget,
        uint256 funding_ends_at
    ) public {
        uint256 _milestones = _milestone_timestamps.length;
        int16 _milestones16 = int16(uint16(_milestones));

        // ensure the developer exists
        require(
            bytes(buildfi_developers[msg.sender].name).length != 0,
            "Developer does not exist"
        );

        // ensure the project doesn't already exist
        require(
            buildfi_projects[projectCount].id == 0,
            "Project already exists"
        );

        // ensure funding_ends_at is in the future
        require(
            funding_ends_at > block.timestamp,
            "Invalid funding end timestamp"
        );

        // ensure payout percentages are valid
        require(
            (_payout_percentages.length == _milestones) &&
                (_milestones == _milestone_timestamps.length),
            "Lengths of arrays do not match"
        );
        uint256 total_percentage = 0;
        for (uint16 i = 0; i < _milestones; i++) {
            total_percentage += _payout_percentages[i];
        }
        require(total_percentage == 100, "Invalid payout percentages");

        // create a new project
        Project storage project = buildfi_projects[projectCount];
        project.id = projectCount;
        project.name = _name;
        project.image = _image;
        project.description = _description;
        project.project_metadata_json = _project_metadata_json;
        project.owner = msg.sender;
        project.milestone_count = _milestones16;
        project.last_milestone_completed = -1;
        project.milestone_timestamps = _milestone_timestamps;
        project.payout_percentages = _payout_percentages;
        project.total_budget = _total_budget;
        project.total_raised = 0;
        project.created_at = block.timestamp;
        project.funding_ends_at = funding_ends_at;

        // increment project count
        projectCount++;
    }

    function abandon_project(uint256 _projectId) public {
        // ensure the project exists
        require(buildfi_projects[_projectId].id != 0, "Project does not exist");

        // ensure it's the project owner
        require(msg.sender == buildfi_projects[_projectId].owner, "Not owner");

        // ensure the project is still open for funding
        require(
            block.timestamp < buildfi_projects[_projectId].funding_ends_at,
            "Project funding is closed"
        );

        // mark the project as abandoned
        buildfi_projects[_projectId].abandoned = true;
    }

    function reclaim_funds(uint256 _projectId) public {
        // investors can reclaim funds if the project is abandoned

        // ensure the project exists
        require(buildfi_projects[_projectId].id != 0, "Project does not exist");

        // ensure the project is abandoned
        require(
            buildfi_projects[_projectId].abandoned,
            "Project not abandoned"
        );

        // ensure the investor has invested
        require(
            buildfi_projects[_projectId].investments[msg.sender] > 0,
            "Sender has not invested"
        );

        // calculate refund
        uint256 refund = buildfi_projects[_projectId].investments[msg.sender];

        // pay out the refund
        payable(msg.sender).transfer(refund);

        // update investor investment
        buildfi_projects[_projectId].investments[msg.sender] = 0;
    }

    function set_and_transfer_tokens(
        uint256 _projectId,
        address _projectToken
    ) public {
        // ensure the project exists
        require(buildfi_projects[_projectId].id != 0, "Project does not exist");

        // ensure it's the project owner
        require(msg.sender == buildfi_projects[_projectId].owner, "Not owner");

        // ensure the project is still open for funding
        require(
            block.timestamp < buildfi_projects[_projectId].funding_ends_at,
            "Project funding is closed"
        );

        // ensure the project is not already completed
        require(
            buildfi_projects[_projectId].last_milestone_completed <
                buildfi_projects[_projectId].milestone_count - 1,
            "Project already completed"
        );

        // set the project token
        buildfi_projects[_projectId].projectToken = _projectToken;
        buildfi_projects[_projectId].token_set = true;

        ERC20 token = ERC20(_projectToken);
        uint256 decimals = token.decimals();

        // transfer the project token
        token.transferFrom(
            msg.sender,
            address(this),
            buildfi_projects[_projectId].tokens_commited * 10 ** decimals
        );
    }

    function start_project(
        uint256 _projectId,
        bytes memory commitAttestationData
    ) public {
        // ensure the project exists
        require(buildfi_projects[_projectId].id != 0, "Project does not exist");

        // ensure it's the project owner
        require(msg.sender == buildfi_projects[_projectId].owner, "Not owner");

        // ensure it is after funding period
        require(
            block.timestamp > buildfi_projects[_projectId].funding_ends_at,
            "Project funding is closed"
        );

        // ensure the project is not already completed
        require(
            buildfi_projects[_projectId].last_milestone_completed <
                buildfi_projects[_projectId].milestone_count - 1,
            "Project already completed"
        );

        // add attestation to the project
        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encodePacked(address(msg.sender));

        Attestation memory projectCommitted = Attestation({
            schemaId: schema_ids.committed,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: commitAttestationData // SignScan assumes this is from `abi.encode(...)`
        });

        // create a new attestation
        uint64 attestationId = isp.attest(projectCommitted, "", "", "");
        buildfi_projects[_projectId].projectCommitted = attestationId;

        // update project started at
        buildfi_projects[_projectId].started_at = block.timestamp;
    }

    function invest(uint256 _projectId) public payable {
        // ensure the project exists
        require(buildfi_projects[_projectId].id != 0, "Project does not exist");

        // ensure the project is still open for funding
        require(
            block.timestamp < buildfi_projects[_projectId].funding_ends_at,
            "Project funding is closed"
        );

        uint256 _amount = msg.value;

        // update project total raised
        buildfi_projects[_projectId].total_raised += _amount;

        // update project investors if not already there
        if (buildfi_projects[_projectId].investments[msg.sender] == 0) {
            buildfi_projects[_projectId].investors.push(msg.sender);
        }

        // update project investments
        buildfi_projects[_projectId].investments[msg.sender] += _amount;

        // update investor investments
        buildfi_investors[msg.sender].project_ids.push(_projectId);
        buildfi_investors[msg.sender].investments[_projectId] += _amount;
    }

    function start_voting(
        uint256 _projectId,
        int16 _milestoneId,
        uint256 _voting_deadline
    ) public {
        uint16 milestoneId = uint16(_milestoneId);

        // ensure the project exists
        require(buildfi_projects[_projectId].id != 0, "Project does not exist");

        // ensure it's the project owner
        require(msg.sender == buildfi_projects[_projectId].owner, "Not owner");

        // ensure the milestone exists
        require(
            buildfi_projects[_projectId].milestones[milestoneId].id ==
                _milestoneId,
            "Milestone does not exist"
        );

        // ensure the milestone is not already completed
        require(
            _milestoneId >
                buildfi_projects[_projectId].last_milestone_completed,
            "Milestone already completed"
        );

        // ensure the milestone is not already voted on
        require(
            !buildfi_projects[_projectId].milestones[milestoneId].voting_active,
            "Milestone already voted on"
        );

        // ensure the milestone is not already completed
        require(
            _milestoneId ==
                buildfi_projects[_projectId].last_milestone_completed + 1,
            "Milestone not next in line"
        );

        // ensure voting deadline is at least 2 days from now
        require(
            _voting_deadline > block.timestamp + 2 days,
            "Invalid voting deadline"
        );

        // start voting
        buildfi_projects[_projectId]
            .milestones[milestoneId]
            .voting_active = true;
    }

    // function vote(uint256 _projectId, int16 _milestoneId, bool _vote) public {
    //     uint16 milestoneId = uint16(_milestoneId);

    //     // ensure the project exists
    //     require(buildfi_projects[_projectId].id != 0, "Project does not exist");

    //     // ensure the milestone exists
    //     require(
    //         buildfi_projects[_projectId].milestones[milestoneId].id ==
    //             _milestoneId,
    //         "Milestone does not exist"
    //     );

    //     // sender must be an investor
    //     require(
    //         buildfi_projects[_projectId].investments[msg.sender] > 0,
    //         "Sender is not an investor"
    //     );

    //     // sender must not have already voted
    //     // require(
    //     //     !buildfi_projects[_projectId].milestones[milestoneId].voters[
    //     //         msg.sender
    //     //     ],
    //     //     "Sender has already voted"
    //     // );

    //     // ensure voting is active
    //     require(
    //         buildfi_projects[_projectId].milestones[milestoneId].voting_active,
    //         "Voting is not active"
    //     );

    //     // update milestone votes
    //     if (_vote) {
    //         buildfi_projects[_projectId].milestones[milestoneId].votes_for += 1;
    //     } else {
    //         buildfi_projects[_projectId]
    //             .milestones[milestoneId]
    //             .votes_against += 1;
    //     }

    //     // update voter status
    //     // buildfi_projects[_projectId].milestones[milestoneId].voters[
    //     //     msg.sender
    //     // ] = true;
    // }

    function witness_voting(
        uint256 _projectId,
        int16 _milestoneId,
        uint256 _votes_for,
        uint256 _votes_against
        // Proof calldata proof
    ) public {
        uint16 milestoneId = uint16(_milestoneId);

        // ensure the project exists
        require(buildfi_projects[_projectId].id != 0, "Project does not exist");

        // ensure the milestone exists
        require(
            buildfi_projects[_projectId].milestones[milestoneId].id ==
                _milestoneId,
            "Milestone does not exist"
        );

        // sender must be an investor
        require(
            buildfi_projects[_projectId].investments[msg.sender] > 0,
            "Sender is not an investor"
        );

        // ensure voting is active
        require(
            buildfi_projects[_projectId].milestones[milestoneId].voting_active,
            "Voting is not active"
        );

        // ensure the proof is valid
        // bool isValid = IWitness.safeVerifyProof(proof);
        // require(isValid, "Invalid proof");

        // update milestone votes
        buildfi_projects[_projectId]
            .milestones[milestoneId]
            .votes_for = _votes_for;
        buildfi_projects[_projectId]
            .milestones[milestoneId]
            .votes_against = _votes_against;
    }

    function close_voting(uint256 _projectId, int16 _milestoneId) public {
        uint16 milestoneId = uint16(_milestoneId);

        // ensure the project exists
        require(buildfi_projects[_projectId].id != 0, "Project does not exist");

        // ensure the milestone exists
        require(
            buildfi_projects[_projectId].milestones[milestoneId].id ==
                _milestoneId,
            "Milestone does not exist"
        );

        // ensure voting is active
        require(
            buildfi_projects[_projectId].milestones[milestoneId].voting_active,
            "Voting is not active"
        );

        // ensure voting deadline has passed
        require(
            block.timestamp >
                buildfi_projects[_projectId]
                    .milestones[milestoneId]
                    .voting_deadline,
            "Voting deadline has not passed"
        );

        // if this is the last milestone, ensure token is set
        if (_milestoneId == buildfi_projects[_projectId].milestone_count) {
            require(
                buildfi_projects[_projectId].token_set,
                "Token not set for last milestone"
            );
        }

        // mark voting as closed
        buildfi_projects[_projectId]
            .milestones[milestoneId]
            .voting_active = false;

        // ensure voting is successful
        if (
            buildfi_projects[_projectId].milestones[milestoneId].votes_for >
            buildfi_projects[_projectId].milestones[milestoneId].votes_against
        ) {
            // update project last milestone completed
            buildfi_projects[_projectId]
                .last_milestone_completed = _milestoneId;
        }

        // calculate payout
        uint256 payout = (buildfi_projects[_projectId].total_budget *
            buildfi_projects[_projectId].payout_percentages[milestoneId]) / 100;

        // pay out the milestone budget
        payable(msg.sender).transfer(payout);

        // if last milestone also payout tokens to investors
        ERC20 token = ERC20(buildfi_projects[_projectId].projectToken);
        if (_milestoneId == buildfi_projects[_projectId].milestone_count) {
            for (
                uint256 i = 0;
                i < buildfi_projects[_projectId].investors.length;
                i++
            ) {
                uint256 invested = buildfi_projects[_projectId].investments[
                    buildfi_projects[_projectId].investors[i]
                ];
                uint256 investor_payout = (buildfi_projects[_projectId]
                    .tokens_commited *
                    uint256(token.decimals()) *
                    invested) / buildfi_projects[_projectId].total_raised;
                token.transfer(
                    buildfi_projects[_projectId].investors[i],
                    investor_payout
                );
            }
        }
    }

    // Getter functions
    function getProjectInfo(uint256 _projectId)
        public
        view
        returns (uint256 id, string memory name, string memory image, string memory description, address owner, int16 milestone_count, int16 last_milestone_completed, uint256[] memory milestone_timestamps, uint16[] memory payout_percentages, uint256 total_budget, uint256 total_raised, address[] memory investors, address projectToken, bool token_set, uint256 tokens_commited, uint256 created_at, uint256 started_at, uint256 funding_ends_at, uint256 completed_at, bool abandoned, uint64 projectCommitted, uint64 projectWrapped, Milestone[] memory milestones)
    {
        // uint256 id;
        // string name;
        // string image;
        // string description;
        // string project_metadata_json;
        // address owner;

        // int16 milestone_count;
        // int16 last_milestone_completed;
        // uint256[] milestone_timestamps;
        // uint16[] payout_percentages;
        // string milestone_metadata_json;
        // mapping(uint16 => Milestone) milestones;

        // uint256 total_budget;
        // uint256 total_raised;

        // address[] investors;
        // mapping(address => uint256) investments;

        // address projectToken;
        // bool token_set;
        // uint256 tokens_commited;

        // uint256 created_at;
        // uint256 started_at;
        // uint256 funding_ends_at;
        // uint256 completed_at;

        // bool abandoned;

        // uint64 projectCommitted;
        // uint64 projectWrapped;

        Project storage project =  buildfi_projects[_projectId];
        Milestone[] memory _milestones = new Milestone[](uint256(uint16(project.milestone_count)));
        for (int16 i = 0; i < project.milestone_count; i++) {
            _milestones[uint16(i)] = project.milestones[uint16(i)];
        }
        return (
            project.id,
            project.name,
            project.image,
            project.description,
            project.owner,
            project.milestone_count,
            project.last_milestone_completed,
            project.milestone_timestamps,
            project.payout_percentages,
            project.total_budget,
            project.total_raised,
            project.investors,
            project.projectToken,
            project.token_set,
            project.tokens_commited,
            project.created_at,
            project.started_at,
            project.funding_ends_at,
            project.completed_at,
            project.abandoned,
            project.projectCommitted,
            project.projectWrapped,
            _milestones
        );
    }

    function getInvestorInfo(address _investor)
        public
        view
        returns (address investor, uint256[] memory project_ids, uint256[] memory investments)
    {
        Investor storage investor_ = buildfi_investors[_investor];
        uint256[] memory _project_ids = new uint256[](investor_.project_ids.length);
        uint256[] memory _investments = new uint256[](investor_.project_ids.length);
        for (uint256 i = 0; i < investor_.project_ids.length; i++) {
            _project_ids[i] = investor_.project_ids[i];
            _investments[i] = investor_.investments[investor_.project_ids[i]];
        }
        return (investor_.investor, _project_ids, _investments);
    }

    function getDeveloperInfo(address _developer)
        public
        view
        returns (Developer memory)
    {
        return buildfi_developers[_developer];
    }
}
