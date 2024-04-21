// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// a crowd-investment platform where developers can raise funds for their projects from day 1. it's milestone based and the funds get disbursed on successful milestone completion
// TODO:
// - penalization logic (credibility and payout)
// - add voting deadline to a milestone (if it exceeds without getting closed, penalization)
// - add proposals to project for investors to create vote on
// - a way for attestations to be added

import {Ownable} from "openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IRiscZeroVerifier} from "risc0/IRiscZeroVerifier.sol";
import {ISP} from "sign-protocol/interfaces/ISP.sol";
import {Attestation} from "sign-protocol/models/Attestation.sol";
import {DataLocation} from "sign-protocol/models/DataLocation.sol";

contract IspTest {
    address public deployer;
    ISP public immutable isp;
    uint64 public attestation;

    constructor(
        address _sign_deployed_addr
    ) {
        deployer = msg.sender;
        isp = ISP(_sign_deployed_addr);
    }

    struct SCHEMA_IDS {
        uint64 committed;
        uint64 wrapped;
    }
    SCHEMA_IDS public schema_ids;

    function setSchemaIds(uint64 _committed, uint64 _wrapped) public {
        require(msg.sender == deployer, "Not deployer");
        schema_ids.committed = _committed;
        schema_ids.wrapped = _wrapped;
    }

    function testAttestation(bytes memory commitAttestationData) public {
        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encodePacked(msg.sender);
        // add attestation to the project
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
        attestation = attestationId;
    }
}
