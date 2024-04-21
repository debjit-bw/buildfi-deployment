// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// a crowd-investment platform where developers can raise funds for their projects from day 1. it's milestone based and the funds get disbursed on successful milestone completion
// TODO:
// - penalization logic (credibility and payout)
// - add voting deadline to a milestone (if it exceeds without getting closed, penalization)
// - add proposals to project for investors to create vote on
// - a way for attestations to be added

// import {IERC20} from "openzeppelin/token/ERC20/IERC20.sol";
// import "openzeppelin/token/ERC20/ERC20.sol";
// import {IRiscZeroVerifier} from "risc0/IRiscZeroVerifier.sol";
import {IERC20} from "openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IRiscZeroVerifier} from "risc0/IRiscZeroVerifier.sol";

contract BuildFi {
    address deployer;
    bytes32 public imageId;
    IRiscZeroVerifier public immutable verifier;

    mapping(address => bytes32) public claims;

    uint256 public projectCount;

    error InvalidClaim(string message);

    constructor(bytes32 _imageId, IRiscZeroVerifier _verifier) {
        deployer = msg.sender;
        imageId = _imageId;
        verifier = IRiscZeroVerifier(_verifier);
        projectCount = 1;
    }

    function changeImageId(bytes32 _imageId) public {
        require(msg.sender == deployer, "Not deployer");
        imageId = _imageId;
    }

    function verificationCallback(address sender, bytes32 claimId, bytes32 postStateDigest, bytes calldata seal) public {
        if (sender == address(0)) revert InvalidClaim("Invalid recipient address");
        if (claimId == bytes32(0)) revert InvalidClaim("Empty claimId");
        if (!verifier.verify(seal, imageId, postStateDigest, sha256(abi.encode(sender, claimId)))) {
            revert InvalidClaim("Invalid proof");
        }

        claims[sender] = claimId;
    }
}
